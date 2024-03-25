import { getBanner } from "@/db/firebase";
import { Image } from "@chakra-ui/react";
import AddBanner from "./AddBanner";

export default async function Banners() {
 const banners =  await getBanner();
  return (
    <div className="bg-white rounded-md shadow-md shadow-slate-900 p-4">
      <h2 className="text-5xl font-bold">Banners</h2>
      <div className="flex gap-4 flex-wrap p-3">
        {
          banners.map((b : string) => <Image key={b} src={b} height={"200px"} width={"140px"} alt={b} />)
        }
      </div>
      <div>
      <AddBanner/>
        
      </div>
    </div>
  )
}
