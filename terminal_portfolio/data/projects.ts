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
    companyUrl?: string;
};

const projects: Project[] = [



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
        exe: "punkcats.exe",
        title: "Punk Cats",
        description: "2D pixel platformer in the browser — street cat, urban levels, eventually a glock",
        overview:
            "Terraria-style 2D pixel platformer built with Phaser 3 and Vite. Play as a customizable street cat navigating gritty urban environments, collecting yarn balls for XP, eating fish to heal, brawling with rival cats, and unlocking weapons as you progress through the city.",
        details: [
            "Built with Phaser 3 + Vite, running entirely in the browser",
            "Tiled JSON tilemap system with multi-tileset support and per-layer height offset correction for mixed tile sizes",
            "Parallax scrolling background using TileSprite with per-layer scroll speeds tied to camera position",
            "OOP architecture with planned Entity, Player, EnemyCat, Item, and Weapon class hierarchy",
            "Ground and platform collision via custom tile properties, player spawn from Tiled object layer",
        ],
        tech: ["Phaser 3", "JavaScript", "Vite", "Tiled", "OOP"],
        iconSkills: ["javascript", "html5", "css3"],
        image: "/assets/punk_cats_intro.png",
        githubUrl: "https://github.com/maleyhaf/punk_cats",
    },

    {
        exe: "behavioros.exe",
        title: "BehaviorOS Adaptive ML Game Engine",
        description: "Real-time behavior modeling engine that dynamically adapts gameplay using player-driven signals",
        overview:
            "An event-driven, real-time adaptive game engine that models player decision-making patterns and continuously updates gameplay parameters through a lightweight reinforcement-style system.",
        details: [
            "Engineered real-time game loop with React, TypeScript, and Canvas for low-latency state updates",
            "Built player modeling pipeline extracting features like impulsivity, risk tolerance, patience, consistency, and performance",
            "Implemented adaptive decision engine using rule-based + reinforcement-style updates to dynamically tune difficulty",
            "Designed continuous difficulty scaling combining time-based pressure with performance-weighted modulation",
            "Developed event-stream processing system capturing reaction times, accuracy, and behavioral trends",
            "Applied smoothing (interpolation) to prevent abrupt state transitions and ensure stable adaptive feedback loops",
            "Generated post-session analytics reports summarizing behavioral patterns and system responses",
        ],
        tech: ["React", "TypeScript", "Vite", "Canvas API", "Machine Learning", "Adaptive Systems", "Real-Time Data Processing"],
        iconSkills: ["react", "typescript", "javascript", "html5", "css3"],
        image: "/assets/behavioros_project.png",
        demoUrl: "https://behavior-os.vercel.app/",
        githubUrl: "https://github.com/maleyhaf/BehaviorOS",
    },

    {
        exe: "dayflow.exe",
        title: "DayFlow",
        description: "Personal planner and calendar app with Google Calendar sync and drag and drop scheduling",
        overview:
            "A full-featured weekly and monthly planner built with React and TypeScript. Drag and drop events across time slots with live 15-minute snapping, edit everything inline in a single modal, organize by category, and sync two ways with Google Calendar through the Anthropic MCP connector.",
        details: [
            "Built week and month calendar views from scratch with no date libraries, all custom date math",
            "Implemented HTML5 drag and drop with a custom ghost chip that tracks the cursor and shows live snapped time during drag",
            "Wired Google Calendar two-way sync via Anthropic API with Google Calendar MCP server",
            "Managed all app state with useReducer and localStorage persistence, no external state library",
            "Built a full CSS custom property theming system with 4 presets, custom hex input, and dark mode",
        ],
        tech: ["React", "TypeScript", "CSS Modules", "Google Calendar API", "Anthropic MCP"],
        iconSkills: ["react", "typescript", "css3", "html5"],
        image: "/assets/dayflow_project.png",
        demoUrl: "https://dayflow-fawn.vercel.app/",
        githubUrl: "https://github.com/maleyhaf/dayflow",
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
        exe: "thisportfolio.exe",
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
        githubUrl: "https://github.com/maleyhaf/terminal_portfolio",
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
        githubUrl: "https://github.com/maleyhaf/KeepUp",
    },

];

export default projects;
