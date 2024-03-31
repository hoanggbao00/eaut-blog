import { editOne } from "@/prisma/notification";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const id = params.id;
  const body = await req.json();

  try {
    const res = await editOne(id, body);

    if (res) return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 404 },
    );
  }
};
