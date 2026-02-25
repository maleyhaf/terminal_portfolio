import { Project } from "../data/projects";

type Props = {
    project: Project;
    onClose: () => void;
};

export default function ProjectWindow({ project, onClose }: Props) {
    return (
        <div className="project-overlay">
            <div className="project-window">

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

                    <div style={{ marginBottom: "10px" }}>
                        <strong>{project.title}</strong>
                    </div>

                    <div style={{ marginBottom: "12px" }}>
                        {project.description}
                    </div>

                    <div style={{ marginBottom: "6px", fontWeight: "bold" }}>
                        Tech Stack:
                    </div>

                    <ul style={{ marginTop: 0, marginBottom: "12px" }}>
                        {project.tech.map((t, i) => (
                            <li key={i}>{t}</li>
                        ))}
                    </ul>

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
    );
}