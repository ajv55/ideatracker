import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";



export async function GET() {

    const session = await getServerSession(authOptions);

    const ideas = await prisma.idea.findMany({
        where: {userId: session?.user?.id, status: 'IN_PROGRESS'    }
    })

   

    return NextResponse.json(ideas, {status: 201})
}