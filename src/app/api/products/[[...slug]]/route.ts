import {
  addProduct,
  getAllDocsFrom,
  getDocWithIdFromCollection,
  getProductCollection,
  updateDoc,
} from "@/db/firebase";

import { NextRequest, NextResponse } from "next/server";
type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(req: NextRequest, { params }: Context) {
  const { slug } = params;
  let res = NextResponse;  
  if (slug?.length === 1) {   
    const res = await getAllDocsFrom(slug[0]);    
    return NextResponse.json({ res }, { status: 200 });
  } else if (slug?.length === 2) {   
    const res = await getDocWithIdFromCollection(slug[1], slug[0]);
    return NextResponse.json({ res }, { status: 200 });
  } else {
    return Response.json({ message: "Not allowed" }, { status: 405 });
  }
}

export async function POST(req: NextRequest, { params }: Context) {
  const { slug } = params;
  if (slug?.length === 1) {
    return NextResponse.json("emmaed");
  }
  try {
    const data = await req.formData();
    const res = await addProduct(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Context) {
  const { slug } = params;
  try {
    const collection = slug[0];
    const productId = slug[1];
    const data = await request.formData();

    // const res = await updateDoc(collection, productId, data);
    return Response.json({ message: "ok", data });
  } catch (error) {
    console.log(error);
  }

  return Response.json({ message: "ok" });
}

// export async function DELETE(request: NextRequest, context: Context) {
//   const productId = context.params.productId;
//   try {
//     const headers = request.headers;
//     const originalUrl = headers.get("referer");
//     const words = getStringBetween(originalUrl);
//     const l = words.length;
//     const collection = words[l - 2];

//     const res = await deleteProduct(collection, productId);
//     return Response.json({ message: "ok", res });
//   } catch (error) {
//     console.log(error);
//   }

//   return Response.json({ message: "ok" });
// }

// import { NextRequest, NextResponse } from "next/server";
// import { getStringBetween } from "@/lib/utils";
// import { addProduct, getAllProduct } from "@/db/firebase";

// export async function GET(request: NextRequest, response: NextResponse) {
//   const res = await getAllProduct()

//   return Response.json({ res });
// }
// export async function POST(request: NextRequest, params  :any) {
//   try {

//     const data = await request.formData();

//     const res = await addProduct(data);
//     return Response.json({ message: "ok", res });
//   } catch (error) {
//     // console.log(error);
//     return Response.json(params);
//   }

//__=====================================================================================

/*
  export const dynamic = 'force-dynamic';
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

*/
