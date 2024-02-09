"use client";

import axios from "axios"
import {useState} from "react";
import {Zap} from "lucide-react"

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
interface subscriptionButtonProps {
    isPro : boolean;
}

export const SubscriptionButton = ({isPro = false } : subscriptionButtonProps) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading , isLoading] = useState(false);

    const onClick = async () =>{
        try{
            isLoading(true);

            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        }catch(error){
            // console.log("BILLING ERROR :" , error);
            toast.error("something went wrong");
        }finally{
            isLoading(false);

        }
    }
return (
<Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
    {isPro ? "Manage subscribtion" : "Upgrade"}
    {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
</Button>

);

}