import React from 'react';
import { useProModal } from '@/hooks/use-pro-modal';
import { Badge } from "@/components/ui/badge";
import { Check, Code, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from 'lucide-react';
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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

export const ProModal = () => {
    const { isOpen, onClose } = useProModal();

    if (!isOpen) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                minWidth: '300px',
                zIndex: 1001,
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to WebSync
                        <Badge variant="premium" className="uppercase text-sm py-1">
                            Pro
                        </Badge>
                    </div>
                    <div className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool) => (
                            <Card key={tool.label}
                                  className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button
                        size="lg"
                        variant="premium"
                        className="w-full"
                        onClick={onClose}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </div>
            </div>
        </div>
    );
};
