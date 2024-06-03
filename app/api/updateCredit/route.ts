import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";


export async function POST(req: NextRequest) {

    const body = await req.json()
    let {userId, newCredits} = body
    console.log(userId, newCredits)

    if(newCredits === 0) {
        newCredits = null
    } 

    // const updatedUser = await prisma.user.update({
    //     where: { id: userId },
    //     data: { credit: newCredits as number },
    //   });

    NextResponse.json(body, {status: 201});
}