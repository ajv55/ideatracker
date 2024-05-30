import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import prisma from "@/app/lib/prisma";
import { error } from "console";


export async function POST(request: NextRequest) {
    const body = await request.json();
    const {name, email, password } = body?.formData;
    console.log(name)

    if(!name || !email || !password) {
        return NextResponse.json({error: 'Missing fields', status: 400})
    };

    const exist = await prisma.user.findUnique({
        where: {email: email}
    })

    if(exist) {
        return NextResponse.json({error: 'Email already exist', status: 401})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashedPassword
        }
    })

    return NextResponse.json({user, status: 201})
}