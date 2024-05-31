import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){

    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('ideaId');
    console.log('id:', id);

    try {
        
        const res = await prisma.idea.delete({
            where: {
                id: id as string
            }
        })

        return NextResponse.json(res, {status: 201})

    } catch (error) {
        console.error('Errro deleting idea');
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}