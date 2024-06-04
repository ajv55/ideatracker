import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';



export async function POST(req: NextRequest) {
    const body = await req.json();
    const { price, credits } = body;

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2024-04-10',
      });

    console.log('body: ', body)

    // Define prices based on the number of credits
    const creditPricing: any = {
        5: 500,  // $5 for 5 credits
        10: 1000, // $10 for 10 credits
        20: 1700, // $17 for 20 credits
        50: 4000  // $40 for 50 credits
      };
  
      // Get the amount from the pricing table
      const amount = creditPricing[credits];
      console.log(amount)
  
      if (!amount) {
        return NextResponse.json({ error: 'Invalid credit amount' }, {status: 401});
      }


      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${credits} Credits`,
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: process.env.URL + '/dashboard',
        cancel_url: process.env.URL ,
      });

      NextResponse.json({id: session }, {status: 201});
  
}
