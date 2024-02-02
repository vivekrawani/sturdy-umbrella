import { getCollections_ } from "@/db/firebase";

export async function GET() {
    const col = await getCollections_();
    return Response.json(col)
}