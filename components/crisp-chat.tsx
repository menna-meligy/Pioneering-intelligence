"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("d4555264-9577-4e65-890a-358063310ea1");
    } , []);
    return null;
}

