import { addBanner } from "@/db/firebase";
import { NextRequest } from "next/server";

export async function GET(req : NextRequest) {
    const res = await addBanner();
    return Response.json(res);
}