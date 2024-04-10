"use server";
import { getBanner } from "@/db/firebase";
import { deleteBanner } from "@/db/firebase"
export const deleteBannerAction = async (index: number) => {
    try {

        await deleteBanner(index);
        return {
            success: true,
            message: "Banner Deleted!"
        };
    } catch (error) {
        return {
            message: "Somthing went wrong!",
            success: false
        };
    }

    // return "message";
}

export const getBannersAction = async () => {
    const data = await getBanner();
    return data;
}

