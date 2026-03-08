import { useRef } from "react";
import Draggable from "react-draggable";
import { Project } from "../data/projects";
import { WindowState } from "../types/window";

type Props = {
    index: number;
    windowState: WindowState;
    onMove: (x: number, y: number) => void;
    onClose: () => void;
    onFocus: () => void;
    onMinimize: () => void;
};

export default function ProjectWindow({ index, windowState, onMove, onClose, onFocus, onMinimize }: Props) {
    const monoIcons = ["nextjs", "bash", "flask", "github", "linux", "gradle"];
    const nodeRef = useRef<HTMLDivElement>(null);

    if (windowState.type !== "project") return null;
    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".project-titlebar"
            defaultPosition={{ x: windowState.x, y: windowState.y }}
            onStop={(e, data) => {
                onMove(data.x, data.y);
            }}
        >
            <div
                ref={nodeRef}
                className="project-window"
                style={{
                    zIndex: windowState.z,
                    position: "fixed",
                    top: 0,
                }}
                onMouseDownCapture={onFocus}
            >

                {/* Title Bar */}
                <div className="project-titlebar" onMouseDown={onFocus}>
                    <span>C:\Projects\{windowState.project.exe}</span>

                    <div className="project-controls">
                        <div className="project-button" onClick={onMinimize}>_</div>
                        <div className="project-button">□</div>
                        <div
                            className="project-button"
                            onClick={onClose}
                        >
                            ×
                        </div>
                    </div>
                </div>

                {/* Window Body */}
                <div className="project-body">

                    <div style={{ marginBottom: "8px", fontWeight: "bold" }}>
                        {windowState.project.title}
                    </div>

                    {/* Pixel Image */}
                    {windowState.project.image && (
                        <img
                            src={windowState.project.image}
                            alt={windowState.project.title}
                            className="project-image"
                            width={200}
                        />
                    )}

                    <div style={{ marginBottom: "10px" }}>
                        {windowState.project.description}
                    </div>

                    {/* Extended Overview */}
                    {windowState.project.overview && (
                        <div style={{ marginBottom: "10px" }}>
                            {windowState.project.overview}
                        </div>
                    )}

                    {/* Bullet Details */}
                    {windowState.project.details && (
                        <ul style={{ marginBottom: "12px" }}>
                            {windowState.project.details.map((d, i) => (
                                <li key={i}>{d}</li>
                            ))}
                        </ul>
                    )}


                    {/* Tech Tags + Devicon Skill Icons */}
                    {(windowState.project.tech || windowState.project.iconSkills) && (
                        <>
                            <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                                Technologies:
                            </div>

                            {/* Tech string tags */}
                            {windowState.project.tech && (
                                <div className="project-tech-tags" style={{ marginBottom: "10px" }}>
                                    {windowState.project.tech.map((t, i) => (
                                        <span key={i} className="project-tech-tag">{t}</span>
                                    ))}
                                </div>
                            )}

                            {/* Devicon icons */}
                            {windowState.project.iconSkills && (
                                <div className="project-skill-icons">
                                    {windowState.project.iconSkills.map((skill, i) => (
                                        <i
                                            key={i}
                                            className={`devicon-${skill}-plain ${monoIcons.includes(skill) ? "" : "colored"}`}
                                            title={skill}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* Buttons */}
                    <div style={{ marginTop: "10px" }}>
                        {windowState.project.demoUrl && (
                            <button
                                className="project-demo-button"
                                onClick={() => window.open(windowState.project.demoUrl, "_blank")}
                            >
                                View Live Demo
                            </button>
                        )}

                        {windowState.project.githubUrl && (
                            <button
                                className="project-demo-button"
                                onClick={() => window.open(windowState.project.githubUrl, "_blank")}
                                style={{ marginLeft: "8px" }}
                            >
                                GitHub Repo
                            </button>
                        )}
                        {windowState.project.companyUrl && (
                            <button
                                className="project-demo-button"
                                onClick={() => window.open(windowState.project.companyUrl, "_blank")}
                                style={{ marginLeft: "8px" }}
                            >
                                Company Website
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </Draggable>
    );
}