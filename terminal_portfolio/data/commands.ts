type Command = {
  text: string;
  o_type: "text" | "skills" | "projects";
  output: string[];
};

const commands: readonly Command[] = [
  {
    text: "run maleyha's_portfolio.exe",
    o_type: "text",
    output: [
      "Preparing portfolio...",
      "System ready.",
      "\u00A0",
      "Welcome to my terminal portfolio!",
      "This is a simulation of a Windows command prompt.",
      "Type help to see a list of available commands or give clicking help a try.",
      "P.S. This portfolio is best viewed on desktop.",
      "\u00A0",
      "Hint: try running 'run all' to see everything at once.",
    ],
  },
  {
    text: "help",
    o_type: "text",
    output: [
      "Available commands:",
      "about - Displays information about me.",
      "education - Displays my education.",
      "projects - Displays my projects.",
      "skills - Displays my skills.",
      "    skills -f - My frontend skills.",
      "    skills -b - My backend skills.",
      "    skills -t - My tools.",
      "contact - Displays my contact information.",
      "clear - Cleans the terminal.",
      "run all - Executes all main commands in sequence.",
    ],
  },
  {
    text: "about",
    o_type: "text",
    output: [
      "Opening about.exe...",
    ],
  },
  {
    text: "education",
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
    text: "skills",
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
    text: "skills -f",
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
    text: "skills -b",
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
    text: "skills -t",
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
    text: "contact",
    o_type: "projects",
    output: [
      "Opening contact.exe...",
    ],
  },

  {
    text: "clear",
    o_type: "text",
    output: [],
  },

  {
    text: "run all",
    o_type: "text",
    output: [
      "Executing all commands...",
      "\u00A0",
    ],
  },

  {
    text: "projects",
    o_type: "projects",
    output: [
      "Directory of C:\Projects",
      "\u00A0",
      "fish-analyzer.exe",
      "task-manager.exe",
      "\u00A0",
      "Use: run <filename>.exe"
    ],
  }

];

export default commands;