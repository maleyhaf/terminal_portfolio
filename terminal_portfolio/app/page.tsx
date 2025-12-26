"use client";

import { useEffect, useState, useRef} from "react";
import { motion } from "framer-motion";

import commands from "../data/commands";

/* Typing effect */
type TypingProps = {
  text: string;
  startType: boolean;
  charDelay?: number;
  cursorDelayAfterDone?: number;
  onTypingComplete?: () => void;
};

function TypingWithCursor({
  text,
  startType,
  charDelay = 70,
  cursorDelayAfterDone = 800,
  onTypingComplete,
}: TypingProps) {
  const [count, setCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const completedRef = useRef(false); // 🔑

  useEffect(() => {
    if (!startType) return;

    completedRef.current = false; // reset for this run
    setCount(0);
    setShowCursor(true);

    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);

          if (!completedRef.current) {
            completedRef.current = true; // lock
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
  }, [startType, text]);

  return (
    <span className="whitespace-nowrap">
      {text.slice(0, count)}
      {showCursor && <span className="cursor" />}
    </span>
  );
}

/* Home page */
export default function Home() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [linesVisible, setLinesVisible] = useState<number[]>(commands.map(() => 0));
  const [startTyping, setStartTyping] = useState(false);

  const [typedCommands, setTypedCommands] = useState<boolean[]>(
    commands.map(() => false)
  );

  useEffect(() => setStartTyping(true), []);

  const handleTypingComplete = (index: number) => {
    setTypedCommands((prev) =>
      prev.map((v, i) => (i === index ? true : v))
    );

    const totalLines = commands[index].output.length;
    let shown = 0;

    const interval = setInterval(() => {
      shown++;
      setLinesVisible((prev) =>
        prev.map((v, i) => (i === index ? shown : v))
      );

      if (shown >= totalLines) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentCommand((prev) => prev + 1);
        }, 600);
      }
    }, 400);
  };


  return (
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
        <div className="terminal-body">
          {commands.map((cmd, idx) => (
            <div key={idx}>
              {/* Command */}
              {idx <= currentCommand && (
                <p>
                  <span className="terminal-prompt">C:\&gt;</span>
                  <span className="terminal-command">
                    <TypingWithCursor
                      text={cmd.text}
                      startType={idx === currentCommand && !typedCommands[idx]} charDelay={70}
                      cursorDelayAfterDone={600}
                      onTypingComplete={() => handleTypingComplete(idx)}
                    />
                  </span>
                </p>
              )}

              {/* Output */}
              {linesVisible[idx] > 0 && (
                <div className="terminal-output mt-2 space-y-1">
                  {cmd.output.slice(0, linesVisible[idx]).map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Cursor after all commands */}
          {currentCommand >= commands.length && (
            <p className="terminal-cursor mt-2">
              <span className="terminal-prompt">$</span>
              <span className="cursor" />
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
