import { NextRequest, NextResponse } from "next/server";
import {fetchSubcategories} from "@/db/firebase";
type Context = {
    params : {
        slug : string[];
    }
}
export const GET = async(req : NextRequest, ctx : Context)=>{
    const sub = ctx.params.slug[0];
    try {
        
        const data = await fetchSubcategories(sub);
        console.log(sub, data);
        return NextResponse.json(data);
    } catch (error) {
       console.log(error); 
    }
    return NextResponse.json({sub}, {status : 404})
}