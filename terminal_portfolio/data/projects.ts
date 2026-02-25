// data/projects.ts

export type Project = {
  exe: string;
  title: string;
  description: string;
  tech: string[];
  demoUrl?: string;
  githubUrl?: string;
};

const projects: Project[] = [
  {
    exe: "cognitive-systems.exe",
    title: "Cognitive Systems Work Term",
    description:
      "Embedded Systems Research Developer – built AUTUMN testing framework for Wi-Fi sensing algorithms.",
    tech: [
      "Python",
      "Software Architecture",
      "Data Pipelines",
      "Algorithm Analysis",
      "Technical Communication",
      "Agile Development",
    ],
    demoUrl: "https://www.cognitivesystems.com/",
  },

  {
    exe: "mathaid.exe",
    title: "MathAId Intelligent Tutoring System",
    description:
      "ML-enhanced adaptive tutoring platform for Grades 9–12 algebra learning.",
    tech: [
      "Flask",
      "Machine Learning",
      "JavaScript",
      "Data Modelling",
      "Authentication",
      "Learning Analytics",
    ],
    githubUrl: "https://github.com/maleyhaf/mathAId",
  },

  {
    exe: "billiards.exe",
    title: "Billiards Game",
    description:
      "Physics-based full-stack billiards simulation with C backend and SQLite persistence.",
    tech: [
      "C Programming",
      "Python",
      "JavaScript",
      "SQLite",
      "Physics Simulation",
      "Full-Stack Development",
    ],
  },

  {
    exe: "tictactoe.exe",
    title: "Tic Tac Toe",
    description:
      "Java-based turn-driven game demonstrating OOP and event handling.",
    tech: [
      "Java",
      "Object-Oriented Programming",
      "Event Handling",
    ],
    githubUrl: "https://github.com/maleyhaf/tictactoe_mf",
  },

  {
    exe: "xish.exe",
    title: "xish — IPC Shell",
    description:
      "Unix-style shell in C with pipelines, signals, job control, and IPC.",
    tech: [
      "C Programming",
      "Unix System Calls",
      "Interprocess Communication",
      "Signal Handling",
      "Shell Internals",
      "POSIX APIs",
      "Memory Management",
      "Testing & Debugging",
    ],
    githubUrl: "https://github.com/maleyhaf/xish_shell",
  },

  {
    exe: "record-manager.exe",
    title: "Record-Based Database Manager",
    description:
      "C-based modular database system with dynamic locking strategies.",
    tech: [
      "C Programming",
      "Dynamic Libraries",
      "File Locking",
      "Concurrency Control",
      "Cross-Platform Development",
      "Systems Design",
      "Error Handling",
    ],
    githubUrl: "https://github.com/maleyhaf/record_management_modules",
  },

  {
    exe: "chat-system.exe",
    title: "Multi-Way Chat System",
    description:
      "Asynchronous multi-client chat system using Bash and UNIX IPC.",
    tech: [
      "Bash Scripting",
      "UNIX IPC",
      "Process Management",
      "Signal Handling",
      "Asynchronous I/O",
      "Systems Programming",
    ],
    githubUrl: "https://github.com/maleyhaf/multi_way_chat",
  },

  {
    exe: "terminal-portfolio.exe",
    title: "Interactive Terminal Portfolio",
    description:
      "Windows-inspired CLI portfolio built with Next.js and React.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "UI/UX Design",
      "Frontend Animation",
      "Accessibility",
      "CSS & Styling",
    ],
    demoUrl: "https://maleyhas-portfolio.vercel.app/",
  },

  {
    exe: "keepup.exe",
    title: "KeepUp",
    description:
      "Gamified running app with real-time pacing, GPS tracking, and audio feedback.",
    tech: [
      "Flutter",
      "Dart",
      "GPS & Geolocation",
      "Game Mechanics",
      "Audio Systems",
      "Local Storage",
      "Testing & Debugging",
      "UI/UX Design",
    ],
    githubUrl: "https://maleyhas-portfolio.vercel.app/",
  },
];

export default projects;