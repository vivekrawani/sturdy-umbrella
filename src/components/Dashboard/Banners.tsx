export const dynamic = 'force-dynamic'
import { getBanner } from "@/db/firebase";
import { Image } from "@chakra-ui/react";
import AddBanner from "./AddBanner";
import DeleteBanner from "./DeleteBanner";
import ChangeOrder from "./ChangeOrder";
import DeleteButton from "./DeleteButton";

export default async function Banners() {
  const banners = await getBanner();
  const n = banners.length;
  return (
    <div className="bg-white rounded-md shadow-md shadow-slate-900 p-4">
      <h2 className="text-5xl font-bold">Banners</h2>
      <div className="flex gap-4 flex-wrap overflow-y-scroll p-3">
        {
          banners.map((b: string, index: any) => (
            <div className="flex flex-col items-center gap-2 border-sky-200 border-2 px-2 pb-2"
              key={b}>
              <span className=" font-extrabold">{index + 1}</span>
              <Image src={b} height={"200px"} width={"auto"} alt={b} />
              <DeleteButton index={index} />
            </div>)
          )}
      </div>
      <div>
        <DeleteBanner n={n} />
        <ChangeOrder />
        <AddBanner />

      </div>
      <div>{JSON.stringify(new Date())}</div>
    </div>
  )
}
