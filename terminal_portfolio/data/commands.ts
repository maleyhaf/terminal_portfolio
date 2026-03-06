type Command = {
  text: string;
  o_type: "text" | "skills" | "projects" | "experience";
  output: string[];
};

const commands: readonly Command[] = [
  {
    text: "maleyha's_portfolio.exe",
    o_type: "text",
    output: [
      "Preparing portfolio...",
      "System ready.",
      "\u00A0",
      "Welcome to my terminal portfolio!",
      "This is a simulation of a Windows 95 Desktop.",
      "Type help to see a list of available commands or give clicking help a try.",
      "P.S. This portfolio is best viewed on desktop.",
      "\u00A0",
      "Hint: try running 'start.bat' to see everything at once.",
    ],
  },
  {
    text: "help",
    o_type: "text",
    output: [
      "Available commands:",
      "\u00A0",
      "about.exe - Displays information about me.",
      "type education.txt - Displays my education.",
      "dir C:\Experience /w - Displays my experience.",
      "dir C:\Projects /w - Displays my projects.",
      "type skills.txt - Displays my skills.",
      "    type skills_f.txt - My frontend skills.",
      "    type skills_b.txt - My backend skills.",
      "    type skills_t.txt - My tools.",
      "contact.exe - Displays my contact information.",
      "cls - Cleans the terminal.",
      "start.bat - Executes all main commands in sequence.",
    ],
  },
  {
    text: "about.exe",
    o_type: "text",
    output: [
      "Opening about.exe...",
    ],
  },
  {
    text: "type education.txt",
    o_type: "text",
    output: [
      "University of Guelph",
      "BComp Software Engineering Honors",
      "2022 - 2027 (Expected)",
      "4th Year Student",
      "GPA: 74/100",
    ],
  },
  {
    text: "type skills.txt",
    o_type: "skills",
    output: [
      // Languages
      "python",
      "c",
      "java",
      "javascript",
      "html5",
      "css3",
      "sqlite",
      "dart",
      "json",
      "bash",

      // Frameworks
      "react",
      "nextjs",
      "flutter",
      "flask",

      // Tools & Libraries
      "git",
      "github",
      "docker",
      "linux",
      "vscode",
      "androidstudio",
      "cmake",
      "gradle",
      "azuredevops",
      "jira"
    ],
  },
  {
    text: "type skills_f.txt",
    o_type: "skills",
    output: [
      // Frontend Skills
      "javascript",
      "typescript",
      "html5",
      "css3",
      "react",
      "nextjs",
      "flutter",
    ],
  },
  {
    text: "type skills_b.txt",
    o_type: "skills",
    output: [
      // Backend Skills
      "python",
      "c",
      "java",
      "sqlite",
      "bash",
      "dart",
      "flutter",
      "flask",
      "linux",
    ],
  },
  {
    text: "type skills_t.txt",
    o_type: "skills",
    output: [
      // Tools & Libraries
      "git",
      "github",
      "docker",
      "vscode",
      "androidstudio",
      "cmake",
      "gradle",
      "azuredevops",
      "jira"
    ],
  },

  {
    text: "contact.exe",
    o_type: "projects",
    output: [
      "Opening contact.exe...",
    ],
  },

  {
    text: "cls",
    o_type: "text",
    output: [],
  },

  {
    text: "start.bat",
    o_type: "text",
    output: [
      "Executing all commands...",
      "\u00A0",
    ],
  },

  {
    text: "dir C:\Projects /w",
    o_type: "projects",
    output: [
      "Directory of C:\Projects",
      "\u00A0",
      "fish-analyzer.exe",
      "task-manager.exe",
      "\u00A0",
      "Use: run <filename>.exe"
    ],
  },

  {
    text: "dir C:\Experience /w",
    o_type: "experience",
    output: [
      "Directory of C:\Experience",
      "\u00A0",
      "experience.txt",
      "\u00A0",
      "Use: type <filename>"
    ]
  }

];

export default commands;