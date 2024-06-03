import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/app/lib/prisma";


export async function PUT(req: NextRequest) {

    const body = await req.json()
    let {userId, ideaNewCredits} = body
    console.log(userId, ideaNewCredits) 

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ideaCredit: ideaNewCredits.toString() as string },
      });

    NextResponse.json(updatedUser, {status: 201});
}