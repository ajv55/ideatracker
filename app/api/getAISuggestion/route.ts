import prisma from "@/app/lib/prisma";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server"
import OpenAI from 'openai';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: NextRequest, res: NextApiResponse){

    const body = await req.json();

    const session = await getServerSession(authOptions)
    
    const {title, description, id } = body;

    console.log(title, description);

    try {
        const response = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{role: 'system', content: 'You are here to help the user expand on ideas but only giving them suggestion. Nothing not of the ordinary, no yapping. Give them solid suggestions.'}, {role: 'user', content: `Here is an idea with the title: ${title} and description: ${description}. Provide a suggestion or further expansion on this idea.`}],
          max_tokens: 150,
        });
    
        const suggestion = response?.choices[0]?.message?.content;

        console.log(suggestion)

        await prisma.suggestionLog.create({
          data: {
            response: suggestion,
            ideaId: id as string,
            id: id as string,
            userId: session?.user.id!
            
          }
        })
    
        return NextResponse.json( suggestion, {status: 201});

      } catch (error) {
        console.error('Error generating AI suggestion:', error);
        NextResponse.json({ error: 'Failed to generate AI suggestion' }, {status: 501});
      }
}