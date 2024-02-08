import { addDoc, getAllCollections, getCollections_, updateDoc } from "@/db/firebase";

export async function GET() {
  
    // const res = await updateDoc('test_db', "JfNMQVo0WXEkmr5oWMCc")
    // const col = await getCollections_();
    // const res = await getAllCollections();
    return Response.json({message : "ok"})
}