"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";

interface VideoBackgroundProps {
    videoSrc: string;
    loopVideoSrc?: string;
    backgroundMusicSrc?: string;
    poster?: string;
    className?: string;
    onVideoEnd?: () => void;
}

export interface VideoBackgroundRef {
    play: () => void;
    pause: () => void;
}

export const VideoBackground = forwardRef<VideoBackgroundRef, VideoBackgroundProps>(
    function VideoBackground({ videoSrc, loopVideoSrc, backgroundMusicSrc, poster, className = "", onVideoEnd }, ref) {
        const videoRef = useRef<HTMLVideoElement>(null);
        const audioRef = useRef<HTMLAudioElement>(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [hasPlayed, setHasPlayed] = useState(false);
        const [videoEnded, setVideoEnded] = useState(false);
        const [currentVideoSrc, setCurrentVideoSrc] = useState(videoSrc);

        useImperativeHandle(ref, () => ({
            play: () => {
                const video = videoRef.current;
                console.log("Video play called, video:", video, "isLoaded:", isLoaded, "videoEnded:", videoEnded);

                // Don't play if video has already ended
                if (videoEnded) {
                    console.log("Video has already ended, not playing again");
                    return;
                }

                if (video) {
                    // Force video to be ready for playback
                    video.load();

                    // Try to play video immediately
                    const videoPromise = video.play();
                    if (videoPromise !== undefined) {
                        videoPromise
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
                                        if (!videoEnded) { // Check again before retry
                                            console.log(`Retry attempt ${index + 1} after ${delay}ms`);
                                            video.play().then(() => {
                                                setHasPlayed(true);
                                                console.log(`Video started playing on retry ${index + 1}`);
                                            }).catch((retryError) => {
                                                console.warn(`Retry ${index + 1} failed:`, retryError);
                                            });
                                        }
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
                const audio = audioRef.current;
                if (video) {
                    video.pause();
                }
                if (audio) {
                    audio.pause();
                }
            }
        }));

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            const handleLoadedData = () => {
                setIsLoaded(true);
                console.log("Video loaded successfully");
                // Only try to play if video hasn't ended and hasn't played yet
                if (!videoEnded && !hasPlayed) {
                    video.play().catch((error) => {
                        console.warn("Auto-play failed:", error);
                    });
                }
            };

            const handleUserInteraction = () => {
                if (!videoEnded && !hasPlayed) {
                    console.log("User interaction detected - attempting to play video");
                    video.play().catch((error) => {
                        console.warn("User interaction play failed:", error);
                    });
                }
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
                // Only try to play if video hasn't ended and hasn't played yet
                if (!videoEnded && !hasPlayed) {
                    video.play().catch((error) => {
                        console.warn("Can play auto-play failed:", error);
                    });
                }
            };

            const handleVideoEnd = () => {
                console.log("Video ended, switching to loop video and starting background music");
                console.log("backgroundMusicSrc:", backgroundMusicSrc);
                console.log("audioRef.current:", audioRef.current);
                setVideoEnded(true);

                // Call the onVideoEnd callback if provided
                if (onVideoEnd) {
                    onVideoEnd();
                }

                // Switch to loop video if provided
                const video = videoRef.current;
                if (video) {
                    if (loopVideoSrc) {
                        console.log("Switching to loop video:", loopVideoSrc);
                        setCurrentVideoSrc(loopVideoSrc);
                        
                        // Remove old event listeners first
                        video.removeEventListener("loadeddata", handleLoadedData);
                        video.removeEventListener("canplay", handleCanPlay);
                        video.removeEventListener("error", handleError);
                        video.removeEventListener("play", handlePlay);
                        video.removeEventListener("ended", handleVideoEnd);
                        
                        // Clear existing sources and add new one
                        video.innerHTML = '';
                        const source = document.createElement('source');
                        source.src = loopVideoSrc;
                        source.type = 'video/mp4';
                        video.appendChild(source);
                        
                        // Add fallback text
                        video.appendChild(document.createTextNode('Your browser does not support the video tag.'));
                        
                        // Update poster to the correct one
                        video.poster = poster || '';
                        
                        video.load();
                        
                        // Add new event listeners for the loop video
                        const handleLoopVideoLoaded = () => {
                            console.log("Loop video loaded successfully");
                            setIsLoaded(true);
                        };
                        
                        const handleLoopVideoCanPlay = () => {
                            console.log("Loop video can play");
                            setIsLoaded(true);
                        };
                        
                        const handleLoopVideoError = (e: Event) => {
                            console.warn("Loop video error:", e);
                        };
                        
                        video.addEventListener('loadeddata', handleLoopVideoLoaded);
                        video.addEventListener('canplay', handleLoopVideoCanPlay);
                        video.addEventListener('error', handleLoopVideoError);
                        
                        console.log("Loop video loaded and ready to play");
                    }

                    // Mute the video and let it loop silently
                    video.muted = true;
                    video.loop = true;
                    video.currentTime = 0;

                    // Force video to be visible and play
                    setIsLoaded(true);
                    
                    // Wait a bit for the video to load before playing
                    setTimeout(() => {
                        video.play().then(() => {
                            console.log("Loop video started playing successfully");
                        }).catch((error) => {
                            console.warn("Loop video play failed:", error);
                        });
                    }, 500);

                    console.log("Video muted and set to loop silently");
                }

                // Start background music immediately
                const audio = audioRef.current;
                if (audio && backgroundMusicSrc) {
                    console.log("Attempting to play background music...");
                    console.log("Audio element src:", audio.src);
                    console.log("Audio element readyState:", audio.readyState);
                    console.log("Audio element paused:", audio.paused);
                    console.log("Audio element currentTime:", audio.currentTime);

                    // Set volume to make sure it's audible
                    audio.volume = 0.7;

                    // Try to play immediately
                    audio.play().then(() => {
                        console.log("Background music started playing successfully");
                        console.log("Audio element playing:", !audio.paused);
                        console.log("Audio element currentTime after play:", audio.currentTime);
                    }).catch((error) => {
                        console.warn("Background music play failed:", error);
                        // Try to play again after a short delay
                        setTimeout(() => {
                            console.log("Retrying background music play...");
                            audio.play().then(() => {
                                console.log("Background music retry successful");
                            }).catch((retryError) => {
                                console.warn("Background music retry failed:", retryError);
                            });
                        }, 1000);
                    });
                } else {
                    console.warn("Cannot play background music - audio element or source missing");
                    console.log("audio element:", audio);
                    console.log("backgroundMusicSrc:", backgroundMusicSrc);
                }
            };

            // Add user interaction listeners to the document
            document.addEventListener("click", handleUserInteraction);
            document.addEventListener("touchstart", handleUserInteraction);
            document.addEventListener("keydown", handleUserInteraction);

            video.addEventListener("loadeddata", handleLoadedData);
            video.addEventListener("canplay", handleCanPlay);
            video.addEventListener("error", handleError);
            video.addEventListener("play", handlePlay);
            video.addEventListener("ended", handleVideoEnd);

            return () => {
                document.removeEventListener("click", handleUserInteraction);
                document.removeEventListener("touchstart", handleUserInteraction);
                document.removeEventListener("keydown", handleUserInteraction);

                video.removeEventListener("loadeddata", handleLoadedData);
                video.removeEventListener("canplay", handleCanPlay);
                video.removeEventListener("error", handleError);
                video.removeEventListener("play", handlePlay);
                video.removeEventListener("ended", handleVideoEnd);
            };
        }, [backgroundMusicSrc, hasPlayed, videoEnded, onVideoEnd, loopVideoSrc, poster]);

        return (
            <div className={`fixed inset-0 w-screen h-screen overflow-hidden ${className}`}>
                <video
                    ref={videoRef}
                    className={`transition-opacity duration-1000 ${isLoaded ? (videoEnded ? "opacity-30" : "opacity-100") : "opacity-0"
                        }`}
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
                    <source src={currentVideoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Background Music Audio */}
                {backgroundMusicSrc && (
                    <audio
                        ref={audioRef}
                        loop
                        preload="auto"
                        style={{ display: 'none' }}
                        onLoadedData={() => console.log("Background music loaded successfully")}
                        onCanPlay={() => console.log("Background music can play")}
                        onError={(e) => console.warn("Background music error:", e)}
                    >
                        <source src={backgroundMusicSrc} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}

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
                        <div>Video: {isLoaded ? 'Loaded' : 'Loading...'} | Played: {hasPlayed ? 'Yes' : 'No'}</div>
                        <div>Video Ended: {videoEnded ? 'Yes' : 'No'}</div>
                        <div>Audio Source: {backgroundMusicSrc ? 'Set' : 'Not Set'}</div>
                        <div>Audio Element: {audioRef.current ? 'Ready' : 'Not Ready'}</div>
                    </div>
                )}

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20" />
            </div>
        );
    }
);
