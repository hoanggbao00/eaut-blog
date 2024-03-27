import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(
  request: ReadableStream,
): Promise<NextResponse> {

  try {
  const blob = await put('thumbnail', request, {
    access: 'public',
  })
    if (!blob) return NextResponse.json({ message: "Failed" }, { status: 401 });

    return NextResponse.json(blob);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
