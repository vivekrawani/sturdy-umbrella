"use server";
import { changeOrder, getBanner } from "@/db/firebase";
import { deleteBanner } from "@/db/firebase"
import { Position } from "@/lib/constants";
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

export const changeOrderAction = async (index: number, position: Position) => {
    try {
        await changeOrder(index, position);
        return {
            success: true,
            message: "Position Changed!"
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong!"
        }
    }

}
