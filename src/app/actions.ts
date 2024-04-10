"use server";
import { deleteBanner } from "@/db/firebase"
export const deleteBannerAction = async (index: number) => {
    console.log("Serve action !");
    try {
        
        await deleteBanner(index);
        return "Banner Deleted ! "
    } catch (error) {
        return "Spmetthing went wrong!"
    }
    
    // return "message";
}