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
                console.log("Video play called, video:", video, "isLoaded:", isLoaded);
                if (video) {
                    // Force video to be ready for playback
                    video.load();
                    
                    // Try to play immediately
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise
                            .then(() => {
                                setHasPlayed(true);
                                console.log("Video started playing successfully");
                            })
                            .catch((error) => {
                                console.warn("Video play failed:", error);
                                // Try multiple retry attempts
                                const retryAttempts = [500, 1000, 2000, 3000];
                                retryAttempts.forEach((delay, index) => {
                                    setTimeout(() => {
                                        console.log(`Retry attempt ${index + 1} after ${delay}ms`);
                                        video.play().then(() => {
                                            setHasPlayed(true);
                                            console.log(`Video started playing on retry ${index + 1}`);
                                        }).catch((retryError) => {
                                            console.warn(`Retry ${index + 1} failed:`, retryError);
                                        });
                                    }, delay);
                                });
                            });
                    }
                } else {
                    console.warn("Video element not found");
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
                // Try to play automatically when loaded
                video.play().catch((error) => {
                    console.warn("Auto-play failed:", error);
                });
            };

            const handleUserInteraction = () => {
                console.log("User interaction detected - attempting to play video");
                video.play().catch((error) => {
                    console.warn("User interaction play failed:", error);
                });
            };

            const handleError = () => {
                console.warn("Video failed to load, falling back to poster image");
                setIsLoaded(false);
            };

            const handlePlay = () => {
                setHasPlayed(true);
                console.log("Video is now playing");
            };

            const handleCanPlay = () => {
                console.log("Video can play");
                // Try to play when video is ready
                video.play().catch((error) => {
                    console.warn("Can play auto-play failed:", error);
                });
            };

            // Add user interaction listeners to the document
            document.addEventListener("click", handleUserInteraction);
            document.addEventListener("touchstart", handleUserInteraction);
            document.addEventListener("keydown", handleUserInteraction);

            video.addEventListener("loadeddata", handleLoadedData);
            video.addEventListener("canplay", handleCanPlay);
            video.addEventListener("error", handleError);
            video.addEventListener("play", handlePlay);

            return () => {
                document.removeEventListener("click", handleUserInteraction);
                document.removeEventListener("touchstart", handleUserInteraction);
                document.removeEventListener("keydown", handleUserInteraction);
                
                video.removeEventListener("loadeddata", handleLoadedData);
                video.removeEventListener("canplay", handleCanPlay);
                video.removeEventListener("error", handleError);
                video.removeEventListener("play", handlePlay);
            };
        }, []);

        return (
            <div className={`fixed inset-0 w-screen h-screen overflow-hidden ${className}`}>
                <video
                    ref={videoRef}
                    className={`transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    muted
                    loop
                    playsInline
                    poster={poster}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        zIndex: -1,
                        pointerEvents: 'none'
                    }}
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Fallback poster image */}
                {poster && !isLoaded && (
                    <div
                        className="bg-cover bg-center bg-no-repeat"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            backgroundImage: `url(${poster})`,
                            zIndex: -1
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
