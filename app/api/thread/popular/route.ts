import { getPopular } from "@/prisma/thread";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPopular();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Some thing went wrong" },
      { status: 500 },
    );
  }
}
