import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('milestoneId')

    return NextResponse.json({id})
}