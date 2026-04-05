"use client";

import { useRef, useEffect, useState } from "react";
import Draggable from "react-draggable";
import { AboutWindowState } from "../types/window";

type Props = {
    index: number;
    windowState: AboutWindowState;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
};

// Pixel cat frames (walking animation) drawn in CSS/unicode
const CAT_FRAMES = ["ฅ^•ﻌ•^ฅ", "ฅ^•ﻌ•^ฅ"] as const;

const SPARKLES = ["✦", "✧", "⋆", "✦", "✧"];

function PixelSparkles() {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(f => (f + 1) % SPARKLES.length);
        }, 400);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="about-sparkles" aria-hidden>
            <span className="sparkle" style={{ animationDelay: "0s" }}>{SPARKLES[frame % SPARKLES.length]}</span>
            <span className="sparkle" style={{ animationDelay: "0.15s" }}>{SPARKLES[(frame + 1) % SPARKLES.length]}</span>
            <span className="sparkle" style={{ animationDelay: "0.3s" }}>{SPARKLES[(frame + 2) % SPARKLES.length]}</span>
        </span>
    );
}

function PixelCat() {
    const [pos, setPos] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const width = 360;

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(p => {
                const next = flipped ? p - 2 : p + 2;
                if (next >= width - 60) setFlipped(true);
                if (next <= 0) setFlipped(false);
                return next;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [flipped]);

    return (
        <div className="about-cat-track" aria-hidden>
            <img
                src="https://media.tenor.com/RyF8iVDEf3cAAAAi/16bit-80s.gif"
                alt="cat"
                className="about-cat"
                style={{
                    left: pos,
                    transform: flipped ? "scaleX(-1)" : "scaleX(1)",
                    width: 60,
                    height: "auto",
                }}
            />
        </div>
    );
}

export default function AboutWindow({ windowState, onMove, onFocus, onMinimize }: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".project-titlebar"
            defaultPosition={{ x: windowState.x, y: windowState.y }}
            onStop={(e, data) => onMove(data.x, data.y)}
        >
            <div
                ref={nodeRef}
                className="project-window"
                style={{ zIndex: windowState.z }}
                onMouseDownCapture={onFocus}
            >
                {/* Title Bar */}
                <div className="project-titlebar">
                    <span>C:\about.exe</span>
                    <div className="project-controls">
                        <div
                            className="project-button"
                            onMouseDown={e => e.stopPropagation()}
                            onClick={onMinimize}
                        >_</div>
                        <div className="project-button">□</div>
                    </div>
                </div>

                {/* Body */}
                <div className="project-body about-body">
                    <div className="about-header">
                        <img
                            src="/assets/me_intro.png"
                            alt="Maleyha"
                            className="about-avatar"
                        />
                        <div>
                            <div className="about-name">
                                Maleyha Fatima
                                <PixelSparkles />
                            </div>
                            <div className="about-title">Software Developer</div>
                        </div>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// bio</div>
                        <p>
                            I am a Software Engineering student focused on building reliable, well-structured systems and intuitive user experiences. I enjoy creating applications that are not only functional, but thoughtfully designed with clarity, performance, and maintainability in mind.
                        </p>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// how i think</div>
                        <p>
                            I approach problems with a strong focus on structure and scalability. I enjoy breaking down complex requirements, identifying edge cases, and designing solutions that remain robust under real-world conditions. My interests are primarily in backend development and system design, with growing experience in real-time applications and data-driven features.
                        </p>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// what i bring</div>
                        <p>
                            I bring a balance of technical skill, adaptability, and attention to detail. I am comfortable working across the stack and enjoy collaborating in team environments where clear communication and thoughtful design decisions matter. I am always looking to expand my skill set and contribute to building software that is both impactful and dependable.
                        </p>
                    </div>

                    {/* Walking pixel cat */}
                    <PixelCat />
                </div>
            </div>
        </Draggable>
    );
}