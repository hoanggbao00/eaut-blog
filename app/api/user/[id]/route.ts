import { editOne } from "@/prisma/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  const body = await req.json();

  try {
    const data = await editOne(id, body);
    return NextResponse.json(data, { status: 200, statusText: "OK" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 404 });
  }
};