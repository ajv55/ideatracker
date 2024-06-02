import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    const searchParams = await req.nextUrl.searchParams
    const id = searchParams.get('id');

    const suggestions = await prisma.suggestionLog.findMany({
        where: {ideaId: id!}
    })


    return NextResponse.json(suggestions, {status: 201})

}