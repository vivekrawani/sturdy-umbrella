import { NextRequest, NextResponse } from "next/server";
import { getStringBetween } from "@/lib/utils";
import { addProduct, getAllProduct } from "@/db/firebase";

export async function GET(request: NextRequest, response: NextResponse) {
  const res = await getAllProduct()

  return Response.json({ res });
}
export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const originalUrl = headers.get("referer");
    const words = getStringBetween(originalUrl);
    const l = words.length;
    const collection = words[l - 2];
   

    const data = await request.formData();

    const res = await addProduct(data);
    return Response.json({ message: "ok", res });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 500, message: error });
  }

  
}
