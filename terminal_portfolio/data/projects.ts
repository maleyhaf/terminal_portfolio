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
    exe: "fish-analyzer.exe",
    title: "Fish Jump Analyzer",
    description:
      "Statistical analysis of Kryptolebias marmoratus jump data using R.",
    tech: ["R", "t-tests", "Data Visualization"],
    githubUrl: "https://github.com/your-link",
  },
  {
    exe: "task-manager.exe",
    title: "Full Stack Task Manager",
    description:
      "A CRUD-based task manager with backend testing and CI pipeline.",
    tech: ["Spring Boot", "React", "CI/CD"],
    demoUrl: "https://your-demo-link.com",
  },
];

export default projects;