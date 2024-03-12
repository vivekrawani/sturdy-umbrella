"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

export default function Banners() {
  const [banners, setBanners] = useState<string[]>([]);
  useEffect(() => {
    axios.get("/api/banner").then((res) => {
      setBanners(res.data);
    }).catch(e => {
      console.log("Error ")
    })
  }, [])
  return (
    <div className="bg-white rounded-md shadow-md shadow-slate-900 p-4">
      <h2 className="text-5xl font-bold">Banners</h2>
      <div className="flex gap-4 flex-wrap p-3">
        {
          banners.map((b) => <Image key={b} src={b} height={"200px"} width={"140px"} alt={b} />)
        }
      </div>
      <div>
        <h2>Add a new Banner</h2>
        
      </div>
    </div>
  )
}
