"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Share2, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function ShareInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        // Check if app is already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        }

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Listen for app installed event
        window.addEventListener("appinstalled", () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            window.removeEventListener("appinstalled", () => { });
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Perkin — Cinematic Portfolio",
                    text: "Check out my cinematic portfolio and creative work",
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
                handleCopyLink();
            }
        } else {
            handleCopyLink();
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.log("Error copying:", err);
        }
    };

    // Don't show if already installed
    if (isInstalled) return null;

    return (
        <>
            {/* Floating Install Button */}
            {deferredPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <Button
                        onClick={() => setShowDialog(true)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                        size="sm"
                    >
                        <Download size={16} className="mr-2" />
                        Install App
                    </Button>
                </motion.div>
            )}

            {/* Share/Install Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Share & Install</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <Button
                                onClick={handleShare}
                                className="w-full justify-start"
                                variant="outline"
                            >
                                <Share2 size={16} className="mr-2" />
                                Share this page
                            </Button>

                            <Button
                                onClick={handleCopyLink}
                                className="w-full justify-start"
                                variant="outline"
                            >
                                {copySuccess ? (
                                    <Check size={16} className="mr-2 text-green-500" />
                                ) : (
                                    <Copy size={16} className="mr-2" />
                                )}
                                {copySuccess ? "Copied!" : "Copy link"}
                            </Button>

                            {deferredPrompt && (
                                <Button
                                    onClick={handleInstall}
                                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                                >
                                    <Download size={16} className="mr-2" />
                                    Install App
                                </Button>
                            )}
                        </div>

                        <div className="text-xs text-muted-foreground text-center">
                            Install the app for a better experience with offline access
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
