import { deleteOne, editOne, getOne } from "@/prisma/thread";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  try {
    const data = await getOne(slug);
    return NextResponse.json(data, { status: 200, statusText: "OK" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 404 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  const body = await req.json()
  try {
    const data = await editOne(slug, body);
    return NextResponse.json(data, { status: 200, statusText: "OK" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 404 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  try {
    const data = await deleteOne(slug);
    return NextResponse.json(data, { status: 200, statusText: "OK" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 404 });
  }
};
