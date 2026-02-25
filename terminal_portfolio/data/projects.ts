// data/projects.ts

export type Project = {
    exe: string;
    title: string;
    description: string;
    overview?: string;
    details?: string[];
    tech: string[];
    iconSkills?: string[];
    image?: string;
    demoUrl?: string;
    githubUrl?: string;
};

const projects: Project[] = [

    {
        exe: "cognitive.exe",
        title: "Cognitive Systems Work Term",
        description: "Embedded Systems Research Developer — AUTUMN Testing Tool",
        overview:
            "Developed AUTUMN, a Python-based testing framework for evaluating Wi-Fi sensing algorithms at Cognitive Systems Corp.",
        details: [
            "Designed and developed AUTUMN testing framework in Python",
            "Analyzed and optimized large-scale data pipelines",
            "Evaluated proprietary Wi-Fi motion-sensing algorithms",
            "Produced maintainable technical documentation",
            "Applied agile milestone tracking practices",
        ],
        tech: [
            "Python",
            "Software Architecture",
            "Data Pipelines",
            "Algorithm Analysis",
            "Agile Development"
        ],
        iconSkills: ["python", "c","linux", "git"],
        image: "/assets/Cognitive_logo.jpg",
        demoUrl: "https://www.cognitivesystems.com/",
    },

    {
        exe: "mathaid.exe",
        title: "MathAId Intelligent Tutoring System",
        description: "Adaptive algebra tutoring platform with ML-driven personalization",
        overview:
            "Full-stack intelligent tutoring system with mastery tracking and ML-powered adaptive questioning.",
        details: [
            "Built Flask REST API supporting authentication and quizzes",
            "Implemented logistic regression for adaptive difficulty",
            "Tracked per-skill mastery and learning streaks",
            "Designed dashboards and discussion forums",
        ],
        tech: ["Flask", "Machine Learning", "JavaScript", "Authentication"],
        iconSkills: ["python", "flask", "javascript", "html5", "css3"],
        image: "/assets/mathaid_project.png",
        githubUrl: "https://github.com/maleyhaf/mathAId",
    },

    {
        exe: "billiards.exe",
        title: "Billiards Game",
        description: "Physics-based full-stack billiards game",
        overview:
            "Full-stack billiards simulation with realistic physics modeling and persistent session storage.",
        details: [
            "Implemented physics simulation in C",
            "Developed backend game systems in Python",
            "Created interactive frontend controls with JavaScript",
            "Stored session data in SQLite",
        ],
        tech: ["C Programming", "Python", "JavaScript", "SQLite"],
        iconSkills: ["c", "python", "javascript", "sqlite"],
        image: "/assets/billiards_project.jpg",
    },

    {
        exe: "tictactoe.exe",
        title: "Tic Tac Toe",
        description: "Classic Tic Tac Toe game in Java",
        overview:
            "Object-oriented implementation featuring turn management and win detection.",
        details: [
            "Implemented turn-based logic and win detection",
            "Applied object-oriented programming principles",
            "Handled event-driven input updates",
        ],
        tech: ["Java", "Object-Oriented Programming"],
        iconSkills: ["java"],
        image: "/assets/tictactoe_project.jpg",
        githubUrl: "https://github.com/maleyhaf/tictactoe_mf",
    },

    {
        exe: "xish.exe",
        title: "xish — IPC Shell",
        description: "Unix-style shell in C focused on IPC, piping, and signal handling",
        overview:
            "Systems-level shell implementing process control, pipelines, globbing, and job management.",
        details: [
            "Implemented fork, exec, and wait process control",
            "Built arbitrary-length pipelines using dup2",
            "Integrated POSIX globbing",
            "Handled SIGINT and zombie cleanup",
            "Validated memory safety with Valgrind",
        ],
        tech: ["C Programming", "Unix System Calls", "POSIX APIs"],
        iconSkills: ["c", "linux", "bash"],
        image: "/assets/xish_project.png",
        githubUrl: "https://github.com/maleyhaf/xish_shell"
    },

    {
        exe: "recordmgr.exe",
        title: "Record-Based Database Manager",
        description: "C-based record manager with dynamic locking strategies",
        overview:
            "Portable record manager supporting interchangeable whole-file and region-based locking modules.",
        details: [
            "Implemented dynamic loading via dlopen and dlsym",
            "Built flock-based whole-file locking",
            "Implemented fcntl record-based locking",
            "Designed modular cross-platform API",
        ],
        tech: ["C Programming", "Dynamic Libraries", "File Locking"],
        iconSkills: ["c", "linux"],
        image: "/assets/record_manager_project.jpg",
        githubUrl: "https://github.com/maleyhaf/record_management_modules",
    },

    {
        exe: "chat.exe",
        title: "Multi-Way Chat System",
        description: "Asynchronous multi-client chat system using Bash and UNIX IPC",
        overview:
            "Server-client chat architecture built with named pipes (FIFOs).",
        details: [
            "Implemented centralized FIFO-based server",
            "Supported broadcast and direct messaging",
            "Handled coordinated shutdown via signals",
            "Ensured full resource cleanup",
        ],
        tech: ["Bash Scripting", "UNIX IPC", "Process Management"],
        iconSkills: ["bash", "linux"],
        image: "/assets/multi_chat_system_project.jpg",
        githubUrl: "https://github.com/maleyhaf/multi_way_chat",
    },

    {
        exe: "terminal.exe",
        title: "Interactive Terminal Portfolio",
        description: "Command-line style portfolio built with Next.js and React",
        overview:
            "Retro terminal-inspired interactive portfolio with typed commands and animated outputs.",
        details: [
            "Implemented command history and live input handling",
            "Built reusable typing animation component",
            "Integrated Devicon skill icons",
            "Managed state with React hooks",
        ],
        tech: ["Next.js", "React", "TypeScript"],
        iconSkills: ["nextjs", "react", "typescript"],
        image: "/assets/terminal_portfolio_preview.png",
        demoUrl: "https://maleyhas-portfolio.vercel.app/",
    },

    {
        exe: "keepup.exe",
        title: "KeepUp",
        description: "Gamified running app with real-time pacing and survival mechanics",
        overview:
            "Flutter-based mobile app combining GPS tracking with game-style feedback.",
        details: [
            "Built real-time GPS tracking system",
            "Engineered pace smoothing logic",
            "Implemented dynamic audio feedback",
            "Designed profile and run history screens",
        ],
        tech: ["Flutter", "Dart", "GPS & Geolocation", "Game Mechanics"],
        iconSkills: ["flutter", "dart"],
        image: "/assets/keepup_project.png",
        githubUrl: "https://github.com/maleyhaf",
    },

];

export default projects;