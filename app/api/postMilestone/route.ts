import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

    const body = await req.json();
    console.log(body);
    const {title, description, id} = body.newMilestone;

    if(!title || !description) {
        return NextResponse.json({error: 'Missing fields'}, {status: 401})
    }

    const milestone = await prisma.milestone.create({
        data: {
            ideaId: id as string,
            title,
            description
        }
    })

    return NextResponse.json(milestone, {status: 201})
}