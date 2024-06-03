import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function GET() {

    const session = await getServerSession(authOptions)

    const user = await prisma.user.findUnique({
        where: {id: session?.user.id}
    })

    const credit = user?.ideaCredit


    return NextResponse.json({credit: credit}, {status: 201})
}