import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {

    const body = await req.json()
    console.log(body)
    const {newCredits, userId} = body;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { credit: newCredits as number },
      });

    return NextResponse.json(updatedUser, {status: 201})
}