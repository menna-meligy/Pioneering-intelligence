"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessagesSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "@/components/free-counter";
import ChatApp from "./chat";
import { useState } from "react";
// import ConversationPage from "@/app/(dashboard)/(routes)/conversation/page";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
const routes = [
  {
    label: "dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
const toolKitRoutes = routes.filter(
  (route) => route.label !== "Settings" && route.label !== "dashboard"
);

interface sidebarProps {
  isPro: boolean;
  apiLimitCount: number;
}
export const Sidebar = ({
  isPro = false,
  apiLimitCount = 0,
}: //saving chats here temprorarly

sidebarProps) => {
  const pathName = usePathname;
  const [chatId, setChatId] = useState<string | null>(null);

  // Function to set the chatId
  const handleSetChatId = (id: string) => {
    setChatId(id);
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex-items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="logo" src="/logo.png" />
            <h3
              className={cn("text-2xl font-bold mx-10", montserrat.className)}
            >
              {" "}
              WebSync{" "}
            </h3>
          </div>
        </Link>

        <div className="space-y-1">
          <select
            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 transition bg-transparent border-b-2 border-white/30 mt-3 mb-3"
            onChange={(e) => {
              const selectedRoute = e.target.value;
              // Navigate to the selected route
              window.location.href = selectedRoute;
            }}
            style={{ backgroundColor: "transparent", color: "white" }} // Set transparent background and white text for all options
          >
            <option value="" style={{ color: "white" }}>
              Tool Kit
            </option>
            {/* Mapping over the modified routes array */}
            {toolKitRoutes.map((route) => (
              <option
                key={route.href}
                value={route.href}
                style={{
                  color: "black",
                  backgroundColor: "transparent",
                }}
              >
                {route.label}
              </option>
            ))}
          </select>
        </div>

        <ChatApp setChatId={handleSetChatId} />
        {/* <div className="space-y-1">
                    {routes.map((route) => 
                    <Link 
                    href={route.href} 
                    key={route.href} 
                    passHref
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
                </div> */}
        {/* <ConversationPage chatId={chatId} /> */}
        {/* <ConversationPage chatId={chatId} /> */}
      </div>

      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

// export default Sidebar;
