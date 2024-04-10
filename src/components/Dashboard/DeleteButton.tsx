"use client";
import { deleteBannerAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteButton({ index }: { index: number }) {
    const router = useRouter();
    const handleClick = () => {
        deleteBannerAction(index);
        router.push("/dashboard");

    }
    return (
        <div className="text-xl text-red-600 hover:cursor-pointer  hover:scale-150  duration-150 ease-in-out"
            onClick={handleClick}>
            <MdDeleteForever />
        </div>
    )
}
