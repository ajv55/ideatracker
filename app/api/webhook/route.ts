import Stripe from 'stripe';
import prisma from '@/app/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/authOptions';
import axios from 'axios';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: '2024-04-10'});
const webhookSecret: string = process.env.STRIPE_WEBHOOK_KEY!;

const webhookHandler = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    const userID = session?.user?.id

    try {
        const buf = await req.text();
        const sig = req.headers.get('stripe-signature');

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (!(err instanceof Error)) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);
        
            return NextResponse.json(
                {
                error: {
                    message: `Webhook Error: ${errorMessage}`,
                },
                },
                { status: 400 }
            );
        }

        // Log the event type
        console.log(`🔔 Event received: ${event.type}`);

        const subscription = event.data.object as Stripe.Subscription;

        console.log('sub: ', subscription)

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            const customerEmail = session.customer_details?.email;

            // Mapping between amount and credits
            const creditMapping: { [key: number]: number } = {
                500: 5,
                1000: 10,
                1700: 20,
                4000: 50
            };

            const creditsToAdd = creditMapping[session?.amount_total!];

            if (creditsToAdd && customerEmail) {
                const user = await prisma.user.findUnique({
                    where: { email: customerEmail },
                });

                const toNumber = Number(user?.ideaCredit) + Number(creditsToAdd);
                console.log(toNumber);
                const toString = toNumber.toString();

                if (user) {
                    await prisma.user.update({
                        where: { email: customerEmail },
                        data: { ideaCredit: toString },
                    });
                    console.log(`User ${user.email} credited with ${creditsToAdd} credits.`);
                }
            }
        }


        
          return NextResponse.json({ received: true });
    } catch {
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }

}

export { webhookHandler as POST };