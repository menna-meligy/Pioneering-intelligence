"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ProModal  = () => {
    return (
        <div>
           <Dialog open>
                <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                                Upgrade WebSync
                            </DialogTitle>
                        </DialogHeader>
                </DialogContent>
           </Dialog>
        </div>
    )
}