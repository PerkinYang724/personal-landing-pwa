"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FilmGrain } from "./FilmGrain";
import { VideoBackground, VideoBackgroundRef } from "./VideoBackground";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
    const [showMainInterface, setShowMainInterface] = useState(false);
    const { t } = useLanguage();
    const videoRef = useRef<VideoBackgroundRef>(null);


    const handleEnterMainInterface = () => {
        setShowMainInterface(true);
        // Immediately try to play video when button is clicked
        setTimeout(() => {
            console.log("Button clicked - attempting to play video immediately...");
            videoRef.current?.play();
        }, 100);
    };

    // Auto-play video when main interface is shown
    useEffect(() => {
        if (showMainInterface) {
            // Try multiple times with different delays
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
        }
    }, [showMainInterface]);

    return (
        <section className="relative min-h-screen flex items-center justify-center text-center">
            <FilmGrain />
            <div className="absolute inset-0 bg-gradient-cinematic opacity-10 z-0 vignette"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    {!showMainInterface ? (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-8"
                        >
                            {/* First Animation: "Hi, I am Perkin" */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white mb-4 drop-shadow-lg">
                                    {t("hero.greeting")} <span className="text-white">{t("hero.name")}</span>
                                </div>

                                {/* Tagline with special animation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                                    className="text-lg md:text-xl text-white font-medium tracking-wide mb-6 drop-shadow-lg"
                                >
                                    {t("hero.tagline")}
                                </motion.div>
                            </motion.div>

                            {/* Second Animation: Rest of the paragraph (after 2 seconds) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 2 }}
                                className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed space-y-4 drop-shadow-lg"
                            >
                                {t("hero.bio1") && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 2.2 }}
                                        className="font-medium text-white drop-shadow-lg"
                                    >
                                        {t("hero.bio1")}
                                    </motion.p>
                                )}
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 2.4 }}
                                >
                                    {t("hero.bio2")}
                                </motion.p>
                            </motion.div>

                            {/* Third Animation: Enter button (after paragraph) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, delay: 3.5, ease: "easeOut" }}
                                className="flex justify-center"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <Button
                                        onClick={handleEnterMainInterface}
                                        size="lg"
                                        className="bg-white/90 hover:bg-white text-black px-8 py-6 text-lg font-semibold group shadow-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                    >
                                        {t("hero.enter")}
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Video Background for Main Interface */}
                            <VideoBackground
                                ref={videoRef}
                                videoSrc="/videos/hero-background.mp4"
                                poster="/images/hero-poster.jpg"
                                className="z-[-1]"
                            />

                            <motion.div
                                key="main"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative z-10 min-h-screen flex flex-col justify-center items-center"
                            >
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
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

        </section>
    );
}