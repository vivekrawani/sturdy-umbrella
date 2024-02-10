// import { searchProduct } from "@/db/firebase";
import { NextRequest } from "next/server";

export async function GET(request : NextRequest) {   
  const headers = request.headers
  const name = headers.get('data')
  // const res = await searchProduct(name);

  
  return Response.json({message : "ok"});
}
