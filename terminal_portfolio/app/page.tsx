"use client";

import { useEffect, useState, useRef } from "react";
import commands from "../data/commands";
import projects, { Project } from "../data/projects";
import experience, { Experience } from "../data/experience";
import { WindowState } from "../types/window";
import { ProjectWindowState } from "../types/window";
import { ContactWindowState } from "../types/window";
import { AboutWindowState } from "../types/window";
import ProjectWindow from "../components/ProjectWindow";
import ContactWindow from "../components/ContactWindow";
import AboutWindow from "../components/AboutWindow";
import ExperienceWindow from "../components/ExperienceWindow";
import { ExperienceWindowState } from "../types/window";
import Taskbar from "../components/Taskbar";

import style from "styled-jsx/style";
import { i } from "framer-motion/client";



/* ---------- Types ---------- */
type OutputType = "text" | "skills" | "projects" | "experience";

type HistoryItem = {
  command: string;
  o_type: OutputType;
  output: string[];
};

type TypingProps = {
  text: string;
  startType: boolean;
  charDelay?: number;
  cursorDelayAfterDone?: number;
  onTypingComplete?: () => void;
};


/* ---------- Typing Effect ---------- */

function TypingWithCursor({
  text,
  startType,
  charDelay = 70,
  cursorDelayAfterDone = 800,
  onTypingComplete,
}: TypingProps) {
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!startType) return;

    completedRef.current = false;
    setCount(0);
    setShowCursor(true);

    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);

          if (!completedRef.current) {
            completedRef.current = true;
            setTimeout(() => {
              setShowCursor(false);
              onTypingComplete?.();
            }, cursorDelayAfterDone);
          }

          return c;
        }
        return c + 1;
      });
    }, charDelay);

    return () => clearInterval(interval);
  }, [startType, text, charDelay, cursorDelayAfterDone, onTypingComplete]);

  return (
    <span className="whitespace-nowrap">
      {text.slice(0, count)}
      {showCursor && <span className="cursor" />}
    </span>
  );
}

/* ---------- Clickable commands ---------- */
// clickable commands to have people be more engaged and not need to type out every command
function ClickableCommand({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className="terminal-clickable-command"
    >
      {text}
    </span>
  );
}



/* ---------- Home ---------- */

export default function Home() {
  const [terminalZ, setTerminalZ] = useState(1); // separate z-index state for terminal to ensure it can be brought to front when clicked
  const [terminalReady, setTerminalReady] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");

  // active windows state
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zIndexCounter = useRef(1); // to manage z-index of windows, so that clicked window comes to front

  // for letting users type by clicking on terminal body to focus input
  const inputRef = useRef<HTMLInputElement>(null);


  // for auto scrolling to bottom on new output
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // mobile responsiveness
  //const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: input ? "auto" : "smooth",
      block: "end",
    });
  }, [history, input, terminalReady]);

  // open about window on initial load
  useEffect(() => {
    openAbout();
    // if on mobile , minimise the about window on load to avoid covering the whole screen
    if (window.innerWidth <= 768) {
      minimizeWindow("about");
    }
  }, []);

  // WINDOW MANAGEMENT
  const openWindow = (win: Omit<ProjectWindowState, "z" | "minimized"> | Omit<ContactWindowState, "z" | "minimized"> | Omit<AboutWindowState, "z" | "minimized"> | Omit<ExperienceWindowState, "z" | "minimized">) => {
    zIndexCounter.current += 1;
    const newZ = zIndexCounter.current;

    setWindows(prev => {
      // if already open but minimized, just restore it
      const existing = prev.find(w => w.id === win.id);
      if (existing) {
        if (existing.minimized) {
          return prev.map(w => w.id === win.id ? { ...w, minimized: false, z: newZ } : w);
        }
        return prev;
      }

      const staggerAmount = 30;
      const offset = prev.length * staggerAmount;

      return [
        ...prev,
        {
          ...win,
          x: win.x + offset,
          y: win.y + offset,
          z: newZ,
          minimized: false,
        } as WindowState,
      ];
    });
  };

  // minimize function:
  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
  };

  // to safely get window position with mobile responsiveness taken into account
  const getPos = (offsetX: number, offsetY: number) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
    const isMobile = window.innerWidth <= 768;
    return {
      x: isMobile ? 12 : window.innerWidth / 2 + offsetX,
      y: isMobile ? 50 : window.innerHeight / 2 + offsetY,
    };
  };

  // openAbout
  const openAbout = () => {
    const { x, y } = getPos(-230, -200);
    openWindow({ type: "about", id: "about", x, y });
  };

  // for project windows
  const openProject = (project: Project) => {
    const { x, y } = getPos(-300, -250);
    openWindow({ type: "project", id: project.exe, project, x, y });
  };

  // for contact window
  const openContact = () => {
    const { x, y } = getPos(-260, -180);
    openWindow({ type: "contact", id: "contact", x, y });
  };

  // for experience windows
  const openExperience = (job: Experience) => {
    const { x, y } = getPos(-290, -200);
    openWindow({ type: "experience", id: job.exe, job, x, y });
  };

  // focus function to bring window to front on click
  const focusWindow = (id: string) => {
    zIndexCounter.current += 1;
    const newZ = zIndexCounter.current;

    setWindows(prev =>
      prev.map(w =>
        w.id === id ? { ...w, z: newZ } : w
      )
    );
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };


  /* ---------- Command handling ---------- */

  // this is a bit hacky but it allows us to render commands in the output that can be clicked to run them without needing to type them out
  // it splits the line into words, checks if any match a command, and if so renders them as clickable commands. It also removes punctuation from the end of words to allow for things like "skills." to still be recognized as the "skills" command.
  const renderLineWithCommands = (line: string) => {
    const sortedCommands = [...commands].sort(
      (a, b) => b.text.length - a.text.length
    );

    for (const cmd of sortedCommands) {
      //const regex = new RegExp(`\\b${cmd.text}\\b`, "i");
      const match = line.match(cmd.text);


      if (match) {
        const start = match.index ?? 0;
        const end = start + match[0].length;

        return [
          line.slice(0, start),
          <ClickableCommand
            key={cmd.text}
            text={line.slice(start, end)}
            onClick={() => runCommand(cmd.text)}
          />,
          line.slice(end),
        ];
      }
    }

    // if no command found, just return plain text
    return line;
  };


  // runs a command by finding it in the commands list and adding it to the history. If it's not found, it adds a default "not recognized" message to the history
  const runCommand = (commandText: string) => {
    const trimmed = commandText.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();

    // special "clear" command to clear the terminal history
    if (lower === "cls") {
      setHistory([{
        command: commands[0].text,
        o_type: commands[0].o_type,
        output: commands[0].output,
      }]);
      return;
    }

    // special "run all" command to run all commands in sequence, mainly for demonstration and testing purposes but also for users who just want to see everything without typing it all out
    if (lower === "start.bat") {
      const commandsToRun = commands.filter(
        (cmd) =>
          cmd.text !== "start.bat" &&
          cmd.text !== "cls" &&
          cmd.text !== commands[0].text &&
          cmd.text !== "help" &&
          cmd.text !== "contact.exe" && // exclude from batch text output
          cmd.text !== "about.exe" && // exclude from batch text output
          cmd.text !== "type skills_f.txt" &&
          cmd.text !== "type skills_b.txt" &&
          cmd.text !== "type skills_t.txt"
      );

      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          o_type: "text",
          output: ["Executing all commands...", "\u00A0"],
        },
      ]);

      setTimeout(() => {
        openAbout(); // openning about window as part of the "run all" command 
        openContact(); // openning contact window as part of the "run all" command to show how windows can be opened from commands and to give users a taste of the interactive features of the portfolio

        setHistory((prev) => [
          ...prev,
          {
            command: "about.exe",
            o_type: "text",
            output: ["Opening about.exe..."],
          },
          {
            command: "contact.exe",
            o_type: "text",
            output: ["Opening contact.exe..."],
          },
          ...commandsToRun.map((cmd) => ({
            command: cmd.text,
            o_type: cmd.o_type,
            output: cmd.output,
          })),
        ]);
      }, 400);

      return;
    }

    // check for the about command to open the about window
    if (lower === "about.exe") {
      openAbout();

      setHistory(prev => [
        ...prev,
        {
          command: trimmed,
          o_type: "text",
          output: ["Opening about.exe..."],
        },
      ]);

      return;
    }

    // check for the contact command to open the contact window
    if (lower === "contact.exe") {
      openContact();

      setHistory(prev => [
        ...prev,
        {
          command: trimmed,
          o_type: "text",
          output: ["Opening contact.exe..."],
        },
      ]);

      return;
    }

    // Check for projct exe or job exe
    if (lower.endsWith(".exe")) {
      const exeName = lower.startsWith("experience\\") ? lower.slice(11) : lower.startsWith("projects\\") ? lower.slice(9) : lower;
      const project = projects.find(p => p.exe.toLowerCase() === exeName);
      const job = experience.find(j => j.exe.toLowerCase() === exeName);
      console.log(exeName, projects.map(p => p.exe.toLowerCase()))
      if (project) {
        openProject(project);
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            o_type: "text",
            output: [`Running ${project.exe}...`],
          },
        ]);
        return;
      }
      if (job) {
        openExperience(job);
        setHistory((prev) => [
          ...prev,
          {
            command: trimmed,
            o_type: "text",
            output: [`Running ${job.exe}...`],
          },
        ]);
        return;
      }

      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          o_type: "text",
          output: [`Bad command or file name`], // classic DOS error message
        },
      ]);

      return;
    }

    // default behavior: find the command and add it to history, or show not recognized message if not found
    // find the command in the commands list (case-insensitive)
    const match = commands.find(
      (cmd) => cmd.text.toLowerCase() === lower
    );

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        o_type: match ? match.o_type : "text",
        output: match
          ? match.output
          : [`'${trimmed}' is not recognized as a command.`],
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    runCommand(input);
    setInput("");
  };

  return (
    <>

      <main
        className="terminal-root"
        onMouseDown={() => {
          zIndexCounter.current += 1;
          setTerminalZ(zIndexCounter.current);
        }}
      >
        <div
          className="terminal-window"
          style={{ zIndex: terminalZ }}
          onClick={() => inputRef.current?.focus()}

        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <span className="terminal-title">C:\Portfolio\terminal.exe</span>
            <div className="window-controls">
              <div className="window-button">_</div>
              <div className="window-button">□</div>
              <div className="window-button">×</div>
            </div>
          </div>

          {/* Terminal body */}
          <div ref={terminalBodyRef} className="terminal-body" >
            {/* Intro command */}
            {!terminalReady && (
              <p>
                <span className="terminal-prompt">C:\&gt;</span>
                <span className="terminal-command">
                  <TypingWithCursor
                    text={commands[0].text}
                    startType
                    cursorDelayAfterDone={600}
                    onTypingComplete={() => {
                      setHistory([
                        {
                          command: commands[0].text,
                          o_type: commands[0].o_type,
                          output: commands[0].output,
                        },
                      ]);
                      setTerminalReady(true);
                    }}
                  />

                </span>
              </p>
            )}

            {/* History */}
            {history.map((item, i) => (
              <div key={i}>
                <p>
                  <span className="terminal-prompt">C:\&gt;</span>
                  <span className="terminal-command">{item.command}</span>
                </p>

                <div className="terminal-output mt-2 space-y-1">
                  {item.o_type === "skills" ? (
                    <div className="flex gap-6 flex-wrap">
                      {item.output.map((skill, j) => {

                        // Some icons look better in monochrome
                        const isMonoIcon = ["nextjs", "bash", "flask", "github", "linux", "gradle"].includes(skill);

                        return (
                          <i
                            key={j}
                            className={`devicon-${skill}-plain ${isMonoIcon ? "" : "colored"
                              } pixel-icon`}
                            title={skill}
                          />
                        );
                      })}
                    </div>
                  ) : item.o_type === "projects" ? (
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem" }}>
                      <div style={{ marginBottom: "4px" }}> Volume in drive C is PORTFOLIO</div>
                      <div style={{ marginBottom: "8px" }}> Directory of C:\Projects</div>
                      <div className="terminal-projects-grid">
                        {projects.map((project, j) => (
                          <ClickableCommand
                            key={j}
                            text={`[${project.exe}]`}
                            onClick={() => runCommand(`Projects\\${project.exe}`)}
                          />
                        ))}
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        {projects.length} File(s)
                      </div>
                    </div>
                  ) : item.o_type === "experience" ? (
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem" }}>
                      <div style={{ marginBottom: "4px" }}> Volume in drive C is PORTFOLIO</div>
                      <div style={{ marginBottom: "8px" }}> Directory of C:\Experience</div>
                      <div className="terminal-projects-grid">
                        {experience.map((job, j) => (
                          <ClickableCommand
                            key={j}
                            text={`[${job.exe}]`}
                            onClick={() => runCommand(`Experience\\${job.exe}`)}
                          />
                        ))}
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        {experience.length} File(s)
                      </div>
                    </div>
                  ) : (
                    item.output.map((line, j) => (
                      <div key={j}>
                        {line ? renderLineWithCommands(line) : "\u00A0"}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

            {/* Live input */}
            {terminalReady && (
              <p className="flex items-center relative">
                <span className="terminal-prompt">C:\&gt;</span>
                <input
                  ref={inputRef}
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  aria-label="Terminal command input"
                />
                <span
                  className="cursor absolute bottom-0"
                  style={{ left: `${input.length + 5.4}ch` }}
                />
              </p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      {windows.map((win, index) => {
        if (win.minimized) return null; // hide minimized windows

        if (win.type === "project") {
          return (
            <ProjectWindow
              key={win.id}
              index={index}
              windowState={win}
              onMove={(x, y) => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, x, y } : w))}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            />
          );
        }
        if (win.type === "contact") {
          return (
            <ContactWindow
              key={win.id}
              index={index}
              windowState={win}
              onMove={(x, y) => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, x, y } : w))}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            />
          );
        }
        if (win.type === "about") {
          return (
            <AboutWindow
              key={win.id}
              index={index}
              windowState={win}
              onMove={(x, y) => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, x, y } : w))}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            />
          );
        }
        if (win.type === "experience") {
          return (
            <ExperienceWindow
              key={win.id}
              index={index}
              windowState={win as ExperienceWindowState}
              onMove={(x, y) => setWindows(prev => prev.map(w => w.id === win.id ? { ...w, x, y } : w))}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
            />
          );
        }
        return null;
      })}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onClickItem={(id) => {
          const win = windows.find(w => w.id === id);
          if (!win) return;
          if (win.minimized) {
            setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: false, z: ++zIndexCounter.current } : w));
          } else {
            minimizeWindow(id);
          }
        }}
        onAbout={openAbout}
      />
    </>
  );
}