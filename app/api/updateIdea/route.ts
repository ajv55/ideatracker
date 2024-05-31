import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest){

    const body = await req.json();
    const {id} = body;
    const {title, description, tags, category, status}  = body.formData;
    console.log('formData: ', body.formData);

    const updateIdea = await prisma.idea.update({
        where: {id: id},
        data: {
            title,
            description,
            tags,
            category,
            status
        }
    })


    return NextResponse.json(updateIdea, {status: 201})
}