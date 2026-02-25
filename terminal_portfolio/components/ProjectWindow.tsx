import { useRef } from "react";
import Draggable from "react-draggable";
import { Project } from "../data/projects";

type Props = {
    project: Project;
    onClose: () => void;
};

export default function ProjectWindow({ project, onClose }: Props) {
    const monoIcons = ["nextjs", "bash", "flask", "github", "linux", "gradle"];
    const nodeRef = useRef<HTMLDivElement>(null);

    return (
        <div className="project-overlay">

            <Draggable nodeRef={nodeRef} handle=".project-titlebar">
                <div ref={nodeRef} className="project-window">

                    {/* Title Bar */}
                    <div className="project-titlebar">
                        <span>{project.exe}</span>

                        <div className="project-controls">
                            <div className="project-button">_</div>
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
                            {project.title}
                        </div>

                        {/* Pixel Image */}
                        {project.image && (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-image"
                                width={200}
                            />
                        )}

                        <div style={{ marginBottom: "10px" }}>
                            {project.description}
                        </div>

                        {/* Extended Overview */}
                        {project.overview && (
                            <div style={{ marginBottom: "10px" }}>
                                {project.overview}
                            </div>
                        )}

                        {/* Bullet Details */}
                        {project.details && (
                            <ul style={{ marginBottom: "12px" }}>
                                {project.details.map((d, i) => (
                                    <li key={i}>{d}</li>
                                ))}
                            </ul>
                        )}

                        {/* Devicon Skill Icons */}
                        {project.iconSkills && (
                            <>
                                <div style={{ fontWeight: "bold" }}>
                                    Technologies:
                                </div>

                                <div className="project-skill-icons">
                                    {project.iconSkills.map((skill, i) => (
                                        <i
                                            key={i}
                                            className={`devicon-${skill}-plain ${monoIcons.includes(skill) ? "" : "colored"
                                                }`}
                                            title={skill}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Buttons */}
                        <div style={{ marginTop: "10px" }}>
                            {project.demoUrl && (
                                <button
                                    className="project-demo-button"
                                    onClick={() => window.open(project.demoUrl, "_blank")}
                                >
                                    View Live Demo
                                </button>
                            )}

                            {project.githubUrl && (
                                <button
                                    className="project-demo-button"
                                    onClick={() => window.open(project.githubUrl, "_blank")}
                                    style={{ marginLeft: "8px" }}
                                >
                                    GitHub Repo
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            </Draggable>
        </div>
    );
}