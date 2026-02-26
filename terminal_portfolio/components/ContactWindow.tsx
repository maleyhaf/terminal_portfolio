"use client";

import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { WindowState } from "../types/window";
import { div } from "framer-motion/m";

type Props = {
    index: number;
    windowState: WindowState;
    onMove: (x: number, y: number) => void;
    onClose: () => void;
    onFocus: () => void;
    onMinimize: () => void;
};

export default function ContactWindow({
    index,
    windowState,
    onMove,
    onClose,
    onFocus,
    onMinimize,
}: Props) {
    const nodeRef = useRef<HTMLDivElement>(null);

    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const [form, setForm] = useState({
        from: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            setStatus(data.success ? "sent" : "error");
        } catch {
            setStatus("error");
        }
    };

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
                    top: 0,
                    width: 520, // Smaller width for contact window
                }}
                onMouseDownCapture={onFocus}
            >
                {/* Title Bar */}
                <div className="project-titlebar" onMouseDown={onFocus}>
                    <span>contact.exe</span>

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

                    {/* Fake Email Header */}
                    <div className="email-header">
                        <div>
                            <strong>To:</strong> maleyhaf@gmail.com
                        </div>

                        <div>
                            <strong>From:</strong>
                            <input
                                type="email"
                                name="from"
                                value={form.from}
                                onChange={handleChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div>
                            <strong>Subject:</strong>
                            <input
                                type="text"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                placeholder="Let's build something cool"
                                required
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            rows={8}
                            required
                            className="email-textarea"
                        />

                        <div style={{ marginTop: "10px" }}>
                            <button type="submit" className="project-demo-button" disabled={status === "sending"}>
                                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : status === "error" ? "Failed — try again" : "Send"}
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="email-divider" />

                    {/* Direct Contact Section */}
                    <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                        Direct Contact:
                    </div>

                    <div className="contact-links">
                        <div
                            className="contact-link"
                            onClick={() =>
                                window.open(
                                    "http://linkedin.com/in/maleyha-fatima-4821bb279/",
                                    "_blank"
                                )
                            }
                        >
                            🔗 LinkedIn
                        </div>

                        <div
                            className="contact-link"
                            onClick={() =>
                                window.open(
                                    "https://github.com/maleyhaf",
                                    "_blank"
                                )
                            }
                        >
                            💻 GitHub
                        </div>

                        <div
                            className="contact-link"
                            onClick={() =>
                                window.location.href =
                                "mailto:maleyhaf@gmail.com"
                            }
                        >
                            📧 Email
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}