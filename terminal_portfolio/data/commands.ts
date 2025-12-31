type Command = {
  text: string;
  o_type: "text" | "skills";
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
      "Type help to see a list of available commands.",
      "P.S. This portfolio is best viewed on desktop.",
    ],
  },
  {
    text: "help",
    o_type: "text",
    output: [
      "Available commands:",
      "about - Displays information about me.",
      "education - Displays my education.",
      "skills - Displays my skills.",
      "    -f - My frontend skills.",
      "    -b - My backend skills.",
      "    -t - My tools.",
      "contact - Displays my contact information.",
    ],
  },
  {
    text: "about",
    o_type: "text",
    output: [
      "Name: Maleyha Fatima",
      "Role: Software Developer",
      "Interests: Backend, Full Stack, AI/ML",
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
    o_type: "text",
    output: [
      "Email: maleyhaf@gmail.com",
      "LinkedIn: https://www.linkedin.com/in/maleyha-fatima-4821bb279/",
      "GitHub: https://github.com/maleyhaf",
    ],
  },

];

export default commands;