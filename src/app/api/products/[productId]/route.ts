import { deleteProduct, getDocWithId } from "@/db/firebase";
import { NextRequest, NextResponse } from "next/server";
import { getStringBetween } from "@/lib/utils";
type Context = {
  params: {
    productId: string;
  };
};

interface FormInput {
  name: string;
  description: string;
  file?: FileList;
  inStock: number;
  price: number;
  discountedPrice: number;
  isFeatured: boolean;
}
export type { FormInput };
import { updateDoc } from "@/db/firebase";
export async function GET(request: NextRequest, context: Context) {
  const res = await getDocWithId(context.params.productId);
  return Response.json(res[0]);
}

export async function PATCH(request: NextRequest, context: Context) {
  const data = {
    age: 61,
  };
  try {
    const headers = request.headers;
    const originalUrl = headers.get("referer");
    const words = getStringBetween(originalUrl);
    const l = words.length;
    const collection = words[l - 2];
    // console.log("url", collection, context.params.productId);

    const data = await request.formData();

    const res = await updateDoc(collection, context.params.productId, data);
    return Response.json({ message: "ok", res });
  } catch (error) {
    console.log(error);
  }

  return Response.json({ message: "ok" });
}

export async function DELETE(request: NextRequest, context: Context) {
  const productId = context.params.productId;
  try {
    const headers = request.headers;
    const originalUrl = headers.get("referer");
    const words = getStringBetween(originalUrl);
    const l = words.length;
    const collection = words[l - 2];

    const res = await deleteProduct(collection, productId)
    return Response.json({ message: "ok", res });
  } catch (error) {
    console.log(error);
  }

  return Response.json({ message: "ok" });
}
