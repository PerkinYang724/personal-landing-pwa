"use client";

import { useEffect, useRef, useState } from "react";

interface VideoBackgroundProps {
    videoSrc: string;
    poster?: string;
    className?: string;
}

export function VideoBackground({ videoSrc, poster, className = "" }: VideoBackgroundProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedData = () => {
            setIsLoaded(true);
        };

        const handleError = () => {
            console.warn("Video failed to load, falling back to poster image");
            setIsLoaded(false);
        };

        video.addEventListener("loadeddata", handleLoadedData);
        video.addEventListener("error", handleError);

        // Start playing when component mounts
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn("Video autoplay failed:", error);
            });
        }

        return () => {
            video.removeEventListener("loadeddata", handleLoadedData);
            video.removeEventListener("error", handleError);
        };
    }, []);

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                }`}
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            {/* Fallback poster image */}
            {poster && !isLoaded && (
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${poster})` }}
                />
            )}
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
        </div>
    );
}
