import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const searchParams = await req.nextUrl.searchParams
    const id = searchParams.get('id');

    console.log('id:', id)
    
    const milestones = await prisma.milestone.findMany({
        where: {ideaId: id as string}
    })

    return NextResponse.json(milestones, {status: 201})
}