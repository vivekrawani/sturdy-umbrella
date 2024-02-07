export const dynamic = 'force-dynamic' //
import { getData } from "@/db/firebase";

export async function GET() {
  
    const res = await getData()
    // const col = await getCollections_();
    
    return Response.json(res)
}