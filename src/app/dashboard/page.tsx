"use client";
import { useAppSelector } from "@/lib/hooks"
import { Image } from "@chakra-ui/react";
export default function Dashboard() {
  const user = useAppSelector(state => state.authReducer.user)
  return (
    <div className="flex justify-center mt-5">

      <h1 className="font-bold text-3xl text-emerald-800 "> Welcome {user?.displayName}</h1>
    </div>
  )
}
