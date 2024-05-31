import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { startOfDay, endOfDay } from "date-fns";


export async function GET() {

    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);


    try {
        const userIdeas = await prisma.idea.findMany({
            where: {
                AND: [
                    { createdAt: { gte: startOfToday } }, // Greater than or equal to the start of today
                    { createdAt: { lte: endOfToday } }   // Less than or equal to the end of today
                ]
            }
        });

        return NextResponse.json( userIdeas, {status: 201});
    } catch (error) {
        console.error("Error fetching user ideas:", error);
        return NextResponse.error();
    }
}