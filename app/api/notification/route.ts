import { createOne, getAll } from "@/prisma/notification";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const isStarted = Boolean(searchParams.get("isStarted")) || false;
  const isExpired = Boolean(searchParams.get("isExpired")) || false;
  
  const take = Number(searchParams.get("take") || 5);
  const skip = Number(searchParams.get("skip") || 0);
  

  try {
    const notifications = await getAll(isExpired as boolean, isStarted as boolean, take, skip);
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 404 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  try {
    const res = await createOne(body);

    if(res) return NextResponse.json({payload: res});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 404 },
    );
  }
}

