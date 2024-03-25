import { getBanner, addImageToBannerCollection } from "@/db/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = await getBanner();
  return Response.json(res);
}
export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const res = await addImageToBannerCollection(file);
  return NextResponse.json({ res });
}
