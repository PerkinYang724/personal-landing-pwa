"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Briefcase } from "lucide-react";
import { FilmGrain } from "./FilmGrain";
import { QRBlock } from "./QRBlock";
import { VideoBackground, VideoBackgroundRef } from "./VideoBackground";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
    const [showMainInterface, setShowMainInterface] = useState(false);
    const [showBioAfterVideo, setShowBioAfterVideo] = useState(false);
    const { t } = useLanguage();
    const videoRef = useRef<VideoBackgroundRef>(null);

    const stats = [
        { value: "300+", label: t("stats.videos") },
        { value: "400K+", label: t("stats.views") },
        { value: "20+", label: t("stats.projects") },
    ];

    const scrollToWork = () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToStartup = () => {
        document.getElementById("startup")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleEnterMainInterface = () => {
        setShowMainInterface(true);
        // Immediately try to play video when button is clicked
        setTimeout(() => {
            console.log("Button clicked - attempting to play video immediately...");
            videoRef.current?.play();
        }, 100);
    };

    const handleVideoEnd = () => {
        console.log("Video ended - showing bio text animation");
        setShowBioAfterVideo(true);
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


                            {/* Third Animation: Enter button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
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
                                loopVideoSrc="/videos/gen back.mp4"
                                backgroundMusicSrc="/audio/background music.mp3"
                                poster="/images/hero-poster.svg"
                                className="z-[-1]"
                                onVideoEnd={handleVideoEnd}
                            />

                            <motion.div
                                key="main"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="space-y-8 relative z-10 min-h-screen flex flex-col justify-center"
                            >
                                {/* Main Heading */}
                                <div className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="text-center"
                                    >
                                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-4 drop-shadow-lg">
                                            <span className="text-white">{t("hero.welcome")}</span>
                                        </h1>
                                        <div className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-white mb-4 drop-shadow-lg">
                                            {t("hero.greeting")} <span className="text-white">{t("hero.name")}</span>
                                        </div>

                                        {/* Tagline in main interface */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                            className="text-lg md:text-xl text-white font-medium tracking-wide mb-6 drop-shadow-lg"
                                        >
                                            {t("hero.tagline")}
                                        </motion.div>
                                    </motion.div>

                                    {/* Bio text animation after video ends */}
                                    <AnimatePresence>
                                        {showBioAfterVideo && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                transition={{
                                                    duration: 1.2,
                                                    ease: "easeOut",
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 15
                                                }}
                                                className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed space-y-4 drop-shadow-lg mb-8"
                                            >
                                                {t("hero.bio1") && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.2 }}
                                                        className="font-medium text-white drop-shadow-lg"
                                                    >
                                                        {t("hero.bio1")}
                                                    </motion.p>
                                                )}
                                                <motion.p
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.8, delay: 0.4 }}
                                                >
                                                    {t("hero.bio2")}
                                                </motion.p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Button
                                            onClick={scrollToStartup}
                                            size="lg"
                                            className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg font-semibold group shadow-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <Briefcase className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                            {t("hero.startup")}
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Button
                                            onClick={scrollToWork}
                                            size="lg"
                                            className="bg-white/90 hover:bg-white text-black px-8 py-6 text-lg font-semibold group shadow-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                        >
                                            {t("hero.explore")}
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-white/50 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold group shadow-2xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                                            {t("hero.watch")}
                                        </Button>
                                    </motion.div>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1.4 }}
                                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 pb-8"
                                >
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 1.6 + (index * 0.1),
                                                ease: "easeOut"
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            className="text-center space-y-2 p-4 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                                        >
                                            <div className="text-3xl md:text-4xl font-bold text-accent">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm text-muted-foreground uppercase tracking-wide">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* QR Code Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 1 }}
                                    className="pt-8 pb-16"
                                >
                                    <QRBlock />
                                </motion.div>

                                {/* Scroll Indicator */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 2 }}
                                    className="flex flex-col items-center space-y-2 text-muted-foreground"
                                >
                                    <div className="text-sm">Scroll to explore more</div>
                                    <motion.div
                                        animate={{ y: [0, 8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center"
                                    >
                                        <div className="w-1 h-3 bg-accent rounded-full mt-2"></div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}