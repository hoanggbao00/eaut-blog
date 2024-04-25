import prisma from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";

  try {
    const data = await prisma.thread.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        cat: {
          select: {
            title: true,
            color: true,
            slug: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
