import { NextRequest, NextResponse } from "next/server";
import {fetchSubcategories} from "@/db/firebase";
type Context = {
    params : {
        slug : string[];
    }
}
export const GET = async(req : NextRequest, ctx : Context)=>{
    const sub = ctx.params.slug[0];
    const data = await fetchSubcategories(sub);
    return NextResponse.json(data);
}