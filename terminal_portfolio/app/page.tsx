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

  // this is a bit hacky but it allows us to render commands in the output that can be clicked to run them without needing to type them out
  // it splits the line into words, checks if any match a command, and if so renders them as clickable commands. It also removes punctuation from the end of words to allow for things like "skills." to still be recognized as the "skills" command.
  const renderLineWithCommands = (line: string) => {
    const sortedCommands = [...commands].sort(
      (a, b) => b.text.length - a.text.length
    );

    for (const cmd of sortedCommands) {
      const regex = new RegExp(`\\b${cmd.text}\\b`, "i");
      const match = line.match(regex);

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
    if (lower === "clear") {
      setHistory([]);
      return;
    }

    // special "run all" command to run all commands in sequence, mainly for demonstration and testing purposes but also for users who just want to see everything without typing it all out
    if (lower === "run all") {
      const commandsToRun = commands.filter(
        (cmd) =>
          cmd.text !== "run all" &&
          cmd.text !== "clear" &&
          cmd.text !== commands[0].text && // skip intro command
          cmd.text !== "help" && // skip help command since it just shows the list of commands and doesn't have any unique output of its own
          cmd.text !== "skills -f" &&
          cmd.text !== "skills -b" &&
          cmd.text !== "skills -t" // skip the sub-commands for skills since they are already included in the main "skills" command 
      );

      // run the "run all" command first to show the "Executing all commands..." message
      setHistory((prev) => [
        ...prev,
        {
          command: trimmed,
          o_type: "text",
          output: ["Executing all commands...", "\u00A0"],
        },
      ]);

      // then add the rest of the commands with a slight delay to allow the "Executing all commands..." message to be seen before flooding the terminal with all outputs
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          ...commandsToRun.map((cmd) => ({
            command: cmd.text,
            o_type: cmd.o_type,
            output: cmd.output,
          })),
        ]);
      }, 400);

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



  // handles enter key press in the input to run the command
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    runCommand(input);
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