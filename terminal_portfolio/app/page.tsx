"use client";

import { useEffect, useState, useRef } from "react";
import commands from "../data/commands";
import style from "styled-jsx/style";

/* ---------- Types ---------- */
type OutputType = "text" | "skills";

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

/* ---------- Home ---------- */

export default function Home() {
  const [terminalReady, setTerminalReady] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");

  // for auto scrolling to bottom on new output
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: input ? "auto" : "smooth",
      block: "end",
    });
  }, [history, input, terminalReady]);



  /* ---------- Command handling ---------- */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const trimmed = input.trim();
    if (!trimmed) return;

    const match = commands.find(
      (cmd) => cmd.text.toLowerCase() === trimmed.toLowerCase()
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

    setInput("");
  };

  return (
    <>

      <main className="terminal-root">
        <div className="terminal-window">
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
          <div ref={terminalBodyRef} className="terminal-body">
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
                  ) : (
                    item.output.map((line, j) => (
                      <div key={j}>{line || "\u00A0"}</div>
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
    </>
  );
}