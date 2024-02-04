import { getDocWithId } from "@/db/firebase";
import { sendResponse } from "next/dist/server/image-optimizer";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

export async function GET(
  request: NextRequest,
  response: NextResponse,
  context: Context
) {
//   const data = await getDocWithId("");
//     console.log("here", data);
console.log(context);

    
  return Response.json({ message: "ok" });
}
