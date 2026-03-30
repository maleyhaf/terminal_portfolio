"use client";

import { useRef } from "react";
import Draggable from "react-draggable";
import { ExperienceWindowState } from "../types/window";

type Props = {
  index: number;
  windowState: ExperienceWindowState;
  onMove: (x: number, y: number) => void;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
};

const monoIcons = ["nextjs", "bash", "flask", "github", "linux", "gradle"];

export default function ExperienceWindow({ windowState, onMove, onClose, onFocus, onMinimize }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const job = windowState.job;

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
          <span>C:\Experience\{job.exe}</span>
          <div className="project-controls">
            <div
              className="project-button"
              onMouseDown={e => e.stopPropagation()}
              onClick={onMinimize}
            >_</div>
            <div className="project-button">□</div>
            <div
              className="project-button"
              onMouseDown={e => e.stopPropagation()}
              onClick={onClose}
            >×</div>
          </div>
        </div>

        {/* Body */}
        <div className="project-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div className="experience-entry">

            <div className="experience-header">
              {job.logo && (
                <img
                  src={job.logo}
                  alt={job.company}
                  className="project-image"
                  width={200}
                />
              )}
              <div className="experience-meta">
                <div className="experience-title">{job.title}</div>
                <div className="experience-company">{job.company}</div>
                <div className="experience-date">{job.dateRange}</div>
              </div>
            </div>

            <ul className="experience-description">
              {job.description.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>

            {job.tech && (
              <div className="project-skill-icons" style={{ marginTop: "8px" }}>
                {job.tech.map((skill, j) => (
                  <i
                    key={j}
                    className={`devicon-${skill}-plain ${monoIcons.includes(skill) ? "" : "colored"}`}
                    title={skill}
                    style={{ fontSize: "24px" }}
                  />
                ))}
              </div>
            )}

            {job.companyUrl && (
              <button
                className="project-demo-button"
                onClick={() => window.open(job.companyUrl, "_blank")}
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