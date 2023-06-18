import { PrismaClient, User } from "@prisma/client"
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search: string = searchParams.get('search')!;

  const users: User[] = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      }
    }
  });
  return NextResponse.json(users)
}