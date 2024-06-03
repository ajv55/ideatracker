import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/app/lib/prisma"

export async function GET() {

    const session = await getServerSession(authOptions)

    const allIdeas = await prisma.idea.findMany({
        where: {userId: session?.user?.id}
    })

    return NextResponse.json(allIdeas, {status: 201})
}