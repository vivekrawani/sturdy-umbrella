import { getDocWithId } from "@/db/firebase";
import { NextRequest, NextResponse } from "next/server";
type Context = {
    params: {
        productId: string
    }
}

export async function GET(
  request: NextRequest,
  context:any,
) {
     const res = await getDocWithId(context.params.productId);
  return NextResponse.json(res[0])
}
