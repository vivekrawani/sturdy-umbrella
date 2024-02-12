import { getData,getOrderWithId } from "@/db/firebase";
type Context = {
    params : {
        orderId : string
    }
}
export async function GET(req : Request, context : Context) {    
    const res = await getOrderWithId(context.params.orderId) 
    return Response.json(res)
}