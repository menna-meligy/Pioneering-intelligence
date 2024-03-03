"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";


import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {FreeCounter} from "@/components/free-counter";
import ChatApp from "../app/chat/create-chat";

const montserrat = Montserrat({weight:"600" , subsets:["latin"]})
const routes = [
    {
        label : "dashboard",
        icon : LayoutDashboard,
        href: "/dashboard",
        color : "text-sky-500",
    },
    {
        label : "Conversation",
        icon : MessagesSquare,
        href: "/conversation",
        color : "text-violet-500",
    },
    // {
    //     label : "Image Generation",
    //     icon : ImageIcon,
    //     href: "/image",
    //     color : "text-pink-700",
    // },
    // {
    //     label : "Video Generation",
    //     icon : VideoIcon,
    //     href: "/video",
    //     color : "text-orange-700",
    // },
    // {
    //     label : "Music Generation",
    //     icon : Music,
    //     href: "/music",
    //     color : "text-emerald-500",
    // },
    {
        label : "Code Generation",
        icon : Code,
        href: "/code",
        color : "text-green-700",
    },
    {
        label : "Settings",
        icon : Settings,
        href: "/settings",
    },
]

interface sidebarProps {
    isPro: boolean;
    apiLimitCount : number;
};
export const Sidebar = ({
    isPro = false,
    apiLimitCount = 0,
    //saving chats here temprorarly
    
} :sidebarProps) => {
    const pathName = usePathname;
    return (  
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex-items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">   
                        <Image 
                        fill 
                        alt="logo" 
                        src="/logo.png"
                        />
                    <h3 className={cn( "text-2xl font-bold mx-10" , montserrat.className)}> WebSync </h3>
                    </div>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => 
                    <Link 
                    href={route.href} 
                    key={route.href} 
                    className={cn(
                        "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition",
                        pathName() === route.href ? "text-white bg-white/10" : "text-zinc-400"
                    )}
                    >
                        
                   <div className="flex items-center flex-1">
                    <route.icon className={cn("h-5 w0-5 mr-3" ,route.color )}/>
                    {route.label}
                    </div> 

                    </Link>)}
                </div>
            </div>
            <ChatApp/>
            
            <FreeCounter
            apiLimitCount={apiLimitCount}
            isPro = {isPro}
            />
        </div>
    );
};
 
// export default Sidebar;
