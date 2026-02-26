"use client";

import { useEffect, useState } from "react";
import { WindowState } from "../types/window";

type Props = {
  windows: WindowState[];
  onClickItem: (id: string) => void;
  onAbout: () => void;
};

export default function Taskbar({ windows, onClickItem, onAbout }: Props) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Always show terminal in taskbar
  const taskbarItems: { id: string; label: string }[] = [
    { id: "terminal", label: "C:\\terminal.exe" },
    ...windows.map(w => ({
      id: w.id,
      label: w.type === "project" ? w.project.exe : w.type === "contact" ? "contact.exe" : "about.exe",
    })),
  ];

  return (
    <div className="taskbar">
      {/* Start button */}
      <button className="taskbar-start" onClick={onAbout}>
        <span className="taskbar-start-icon">⊞</span>
        <span>Start</span>
      </button>

      <div className="taskbar-divider" />

      {/* Window buttons */}
      <div className="taskbar-items">
        {taskbarItems.map(item => {
          const win = windows.find(w => w.id === item.id);
          const isMinimized = win?.minimized ?? false;
          const isTerminal = item.id === "terminal";

          return (
            <button
              key={item.id}
              className={`taskbar-item ${!isMinimized ? "taskbar-item-active" : ""}`}
              onClick={() => isTerminal ? null : onClickItem(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Clock */}
      <div className="taskbar-clock">
        {time}
      </div>
    </div>
  );
}