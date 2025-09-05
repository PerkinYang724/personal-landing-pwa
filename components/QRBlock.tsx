"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import Image from "next/image";
import { Smartphone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QRBlock() {
    const [qrCode, setQrCode] = useState<string>("");
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = window.location.href;
                const qr = await QRCode.toDataURL(url, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: "#A1785A",
                        light: "#0B0B0C",
                    },
                });
                setQrCode(qr);
            } catch (err) {
                console.error("Error generating QR code:", err);
            }
        };

        generateQR();
    }, []);

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.log("Error copying URL:", err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 max-w-sm mx-auto"
        >
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Smartphone size={16} />
                    <span>Open on your phone</span>
                </div>

                {qrCode && (
                    <div className="flex justify-center">
                        <Image
                            src={qrCode}
                            alt="QR Code to open on mobile"
                            width={128}
                            height={128}
                            className="w-32 h-32 rounded-lg border border-border"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                        Scan with your camera to open this page on your phone
                    </p>

                    <Button
                        onClick={handleCopyUrl}
                        variant="outline"
                        size="sm"
                        className="w-full"
                    >
                        {copySuccess ? (
                            <Check size={14} className="mr-2 text-green-500" />
                        ) : (
                            <Copy size={14} className="mr-2" />
                        )}
                        {copySuccess ? "Copied!" : "Copy Link"}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
