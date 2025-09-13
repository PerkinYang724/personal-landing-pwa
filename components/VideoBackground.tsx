"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

interface VideoBackgroundProps {
    videoSrc: string;
    poster?: string;
    className?: string;
}

export interface VideoBackgroundRef {
    play: () => void;
    pause: () => void;
}

export const VideoBackground = forwardRef<VideoBackgroundRef, VideoBackgroundProps>(
    function VideoBackground({ videoSrc, poster, className = "" }, ref) {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [hasPlayed, setHasPlayed] = useState(false);

        useImperativeHandle(ref, () => ({
            play: () => {
                const video = videoRef.current;
                if (video && isLoaded) {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setHasPlayed(true);
                                console.log("Video started playing");
                            })
                            .catch((error) => {
                                console.warn("Video play failed:", error);
                            });
                    }
                }
            },
            pause: () => {
                const video = videoRef.current;
                if (video) {
                    video.pause();
                }
            }
        }));

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            const handleLoadedData = () => {
                setIsLoaded(true);
                console.log("Video loaded successfully");
            };

            const handleError = () => {
                console.warn("Video failed to load, falling back to poster image");
                setIsLoaded(false);
            };

            const handlePlay = () => {
                setHasPlayed(true);
            };

            video.addEventListener("loadeddata", handleLoadedData);
            video.addEventListener("error", handleError);
            video.addEventListener("play", handlePlay);

            return () => {
                video.removeEventListener("loadeddata", handleLoadedData);
                video.removeEventListener("error", handleError);
                video.removeEventListener("play", handlePlay);
            };
        }, []);

        return (
            <div className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}>
                <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    loop
                    playsInline
                    poster={poster}
                    style={{
                        minWidth: '100vw',
                        minHeight: '100vh',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Fallback poster image */}
                {poster && !isLoaded && (
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ 
                            backgroundImage: `url(${poster})`,
                            minWidth: '100vw',
                            minHeight: '100vh',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                )}

                {/* Debug info */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute top-4 left-4 text-white text-xs bg-black/50 p-2 rounded">
                        Video: {isLoaded ? 'Loaded' : 'Loading...'} | Played: {hasPlayed ? 'Yes' : 'No'}
                    </div>
                )}

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>
        );
    }
);
