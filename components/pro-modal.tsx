"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Code, ImageIcon, MessageSquare , Music, VideoIcon } from 'lucide-react';
import { Card } from "./ui/card";



const tools = [
    {
      label : "conversation",
      icon  : MessageSquare,
      color : " text-violet-500",
      bgColor : "bg-violar-500/10",
    },
    {
      label : "Music Generation",
      icon  : Music,
      color : " text-emerald-500",
      bgColor : "bg-emerald-500/10",
    },
    {
      label : "Image Generation",
      icon  : ImageIcon,
      color : " text-pink-700",
      bgColor : "bg-pink-700/10",
    },
    {
      label : "Video Generation",
      icon  : VideoIcon,
      color : " text-orange-700",
      bgColor : "bg-orange-700/10",
    },
    {
      label : "Image Generation",
      icon  : Code,
      color : " text-green-700",
      bgColor : "bg-green-700/10",
    },
    ]

export const ProModal  = () => {
    const proModel = useProModal();

    return (
        <div>
           <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
                <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                                <div className="flex items-center gap-x-2 font-bold py-1">
                                Upgrade to WebSync

                                <Badge variant="premium" className="uppercase text-sm py-1">
                                    Pro
                                </Badge>
                                </div>
                            </DialogTitle>
                            <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                                    {/* {tools.map(tool) => (
                                        <Card key={tools.label}
                                        >

                                        </Card>
                                    )} */}
                            </DialogDescription>
                        </DialogHeader>
                </DialogContent>
           </Dialog>
        </div>
    )
}