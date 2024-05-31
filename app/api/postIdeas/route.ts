import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { error } from "console";


export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions)


    const body = await req.json();
    const {title, description, tags, category } = body
    console.log(category)

    if(!title || !description || !category) {
        return NextResponse.json({error: 'Missing feilds', status: 401})
    }

    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id}
    })

    if(!user) {
        const error = {error: 'No user found'}
        return NextResponse.json( error ,{status: 501})
    }

    const createIdea = await prisma.idea.create({
        data:{
            userId: user?.id as string,
            title,
            tags,
            description,
            category
        }
    })

    return NextResponse.json( createIdea, {status: 201})
} 