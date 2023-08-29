import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser()
    const { name, src, instructions, seed, description, categoryId } = body

    if(!user || !user.id || !user.firstName ) {
      return new NextResponse("Unauthorized", { status: 401})
    }

    if(!src || !name || !instructions || !seed || !description || !categoryId) {
      return new NextResponse("Missing Fields", { status: 400})
    }

    //TODO: Check subscription

    const person = await prismadb.person.create({
      data: {
        categoryId,
        src,
        name,
        userName: user.firstName,
        userId: user.id,
        description,
        seed,
        instructions
      }
    });

    return NextResponse.json(person)

  } catch (error) {
    console.log('person post error')
    return new NextResponse("Internal Error", { status: 500 })
  } 
}