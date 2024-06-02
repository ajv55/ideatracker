import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest){

    const body = await req.json();
    const {id} = body;
    const {title, description, matchedMilestone }  = body;
    console.log('body: ', body);

    const updateIdea = await prisma.milestone.update({
        where: {id: id},
        data: {
            title,
            description,
        }
    })


    return NextResponse.json(updateIdea, {status: 201})
}