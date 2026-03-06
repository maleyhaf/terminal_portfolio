export type Experience = {
    exe: string; // command to open this experience, e.g. "experience.exe"
    company: string;
    title: string;
    dateRange: string;
    description: string[];
    tech: string[];
    logo?: string; // path to logo in /public
    companyUrl?: string;
};

const experience: Experience[] = [
    {
        exe: "work_term1.exe",
        company: "Cognitive Systems Corp.",
        title: "Embedded Systems Research Developer",
        dateRange: "Sep 2024 — Dec 2024",
        description: [
            "Designed and developed AUTUMN testing framework in Python",
            "Analyzed and optimized large-scale data pipelines",
            "Evaluated proprietary Wi-Fi motion-sensing algorithms",
            "Produced maintainable technical documentation",
            "Applied agile milestone tracking practices",
        ],
        tech: ["python", "c", "git", "agile"],
        logo: "/assets/Cognitive_logo.jpg",
        companyUrl: "https://www.cognitivesystems.com/",
    },

];

export default experience;