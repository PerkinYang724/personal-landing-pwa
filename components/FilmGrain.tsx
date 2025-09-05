"use client";

import { useEffect, useRef } from "react";

export function FilmGrain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const drawGrain = () => {
            if (!ctx) return;

            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const noise = Math.random() * 255;
                data[i] = noise;     // Red
                data[i + 1] = noise; // Green
                data[i + 2] = noise; // Blue
                data[i + 3] = 15;    // Alpha (very subtle)
            }

            ctx.putImageData(imageData, 0, 0);
        };

        resizeCanvas();
        drawGrain();

        const handleResize = () => {
            resizeCanvas();
            drawGrain();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30 mix-blend-overlay"
            style={{ zIndex: 1 }}
        />
    );
}
