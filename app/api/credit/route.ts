import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest) {

    const body = await req.json()
    console.log(body)
    const {toStringCredit, userId} = body;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { ideaCredit: toStringCredit as string},
      });

    return NextResponse.json(updatedUser, {status: 201})
}