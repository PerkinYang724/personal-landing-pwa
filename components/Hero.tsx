"use client";

import { motion } from "framer-motion";
import { FilmGrain } from "./FilmGrain";
import { VideoBackground, VideoBackgroundRef } from "./VideoBackground";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
    const { t } = useLanguage();
    const videoRef = useRef<VideoBackgroundRef>(null);

    // Auto-play video when component mounts
    useEffect(() => {
        // Try multiple times with different delays to ensure video plays
        const timers = [
            setTimeout(() => {
                console.log("Attempting to play video (1st try)...");
                videoRef.current?.play();
            }, 500),
            setTimeout(() => {
                console.log("Attempting to play video (2nd try)...");
                videoRef.current?.play();
            }, 1500),
            setTimeout(() => {
                console.log("Attempting to play video (3rd try)...");
                videoRef.current?.play();
            }, 3000)
        ];

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center">
            <FilmGrain />
            <div className="absolute inset-0 bg-gradient-cinematic opacity-10 z-0 vignette"></div>

            {/* Video Background */}
            <VideoBackground
                ref={videoRef}
                videoSrc="/videos/hero-background.mp4"
                poster="/images/hero-poster.jpg"
                className="z-[-1]"
            />

            <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
                {/* Only the Welcome Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight drop-shadow-lg">
                        <span className="text-white">{t("hero.welcome")}</span>
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}