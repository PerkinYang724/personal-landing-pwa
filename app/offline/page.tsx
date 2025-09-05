"use client";

import { WifiOff, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-cinematic">
            <div className="text-center space-y-8 max-w-md mx-auto px-4">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="p-4 bg-card/50 rounded-full border border-border">
                            <WifiOff size={48} className="text-muted-foreground" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-display font-bold text-gradient">
                        You&apos;re Offline
                    </h1>

                    <p className="text-muted-foreground text-lg">
                        Don&apos;t worry! You can still browse the pages you&apos;ve already visited.
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Check your internet connection and try again, or explore the content
                        that&apos;s already saved on your device.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Try Again
                        </Button>

                        <Button asChild variant="outline">
                            <Link href="/">
                                <Home size={16} className="mr-2" />
                                Go Home
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="pt-8 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                        This page works offline thanks to the PWA technology.
                        Once you&apos;re back online, you&apos;ll have access to all the latest content.
                    </p>
                </div>
            </div>
        </div>
    );
}
