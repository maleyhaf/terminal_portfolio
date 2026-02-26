"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { AboutWindowState } from "../types/window";

type Props = {
    index: number;
    windowState: AboutWindowState;
    onMove: (x: number, y: number) => void;
    onFocus: () => void;
    onMinimize: () => void;
};

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
                style={{ zIndex: windowState.z, width: 460 }}
                onMouseDownCapture={onFocus}
            >
                {/* Title Bar */}
                <div className="project-titlebar">
                    <span>about.exe</span>
                    <div className="project-controls">
                        <div className="project-button" onClick={onMinimize}>_</div>
                        <div className="project-button">□</div>
                        <div className="project-button">×</div>
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
                            <div className="about-name">Maleyha Fatima</div>
                            <div className="about-title">Software Developer</div>
                        </div>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// bio</div>
                        <p>
                            I enjoy building things that feel solid, intuitive, and thoughtfully engineered. I care deeply about structure and clarity, and I like working in codebases where design decisions matter and everything has a clear purpose.

                        </p>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// how i think</div>
                        <p>
                            As a forth-year Software Engineering student, I’m especially drawn to backend development and complex systems. I enjoy breaking down complicated problems, working through edge cases, and building efficient, reliable solutions where small details can have a big impact.
                        </p>
                    </div>

                    <div className="about-section">
                        <div className="about-section-title">// what i bring</div>
                        <p>
                            I’m always open to learning new technologies and expanding my technical skill set. The fast pace of the tech world excites me — each new language, tool, or concept feels like another step toward becoming a stronger, more adaptable developer who values growth, creativity, and collaboration.
                        </p>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}