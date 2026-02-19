export const portfolioData = {
  personal: {
    name: "Alex Developer",
    title: "Full Stack Software Engineer",
    email: "alex@example.com",
    location: "San Francisco, CA",
    summary:
      "Experienced full-stack engineer with 6+ years building scalable web applications. Passionate about developer tooling, open-source, and AI-powered products.",
    website: "https://alexdev.example.com",
    github: "https://github.com/alexdev",
    linkedin: "https://linkedin.com/in/alexdev",
  },

  skills: [
    { name: "TypeScript", category: "Language", level: "Expert" },
    { name: "JavaScript", category: "Language", level: "Expert" },
    { name: "Python", category: "Language", level: "Advanced" },
    { name: "Go", category: "Language", level: "Intermediate" },
    { name: "React", category: "Frontend", level: "Expert" },
    { name: "Next.js", category: "Frontend", level: "Advanced" },
    { name: "Node.js", category: "Backend", level: "Expert" },
    { name: "PostgreSQL", category: "Database", level: "Advanced" },
    { name: "Redis", category: "Database", level: "Advanced" },
    { name: "Docker", category: "DevOps", level: "Advanced" },
    { name: "Kubernetes", category: "DevOps", level: "Intermediate" },
    { name: "AWS", category: "Cloud", level: "Advanced" },
    { name: "GraphQL", category: "API", level: "Advanced" },
    { name: "REST API Design", category: "API", level: "Expert" },
  ],

  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Software Engineer",
      startDate: "2022-03",
      endDate: null,
      location: "San Francisco, CA (Remote)",
      description:
        "Lead engineer for developer platform team. Built internal tooling used by 200+ engineers.",
      highlights: [
        "Reduced CI/CD pipeline time by 40% by parallelizing build steps",
        "Designed and implemented a plugin system adopted across 15 product teams",
        "Mentored 4 junior engineers through 1:1s and code reviews",
      ],
    },
    {
      company: "StartupXYZ",
      role: "Software Engineer",
      startDate: "2019-06",
      endDate: "2022-02",
      location: "New York, NY",
      description:
        "Full-stack engineer for B2B SaaS product serving 5,000+ customers.",
      highlights: [
        "Rewrote legacy PHP monolith to Node.js microservices, reducing p99 latency from 2s to 200ms",
        "Built real-time collaboration features using WebSockets",
        "Shipped mobile-responsive redesign that increased mobile conversions by 30%",
      ],
    },
    {
      company: "Freelance",
      role: "Web Developer",
      startDate: "2017-09",
      endDate: "2019-05",
      location: "Remote",
      description: "Built custom web applications for small businesses.",
      highlights: [
        "Delivered 12 client projects across e-commerce, portfolio, and booking domains",
        "Maintained 100% on-time delivery record",
      ],
    },
  ],

  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      graduationYear: 2017,
      gpa: "3.8/4.0",
      honors: "Magna Cum Laude",
    },
  ],

  projects: [
    {
      name: "OpenMCP",
      description:
        "Open-source library for building Model Context Protocol servers in TypeScript with zero boilerplate.",
      url: "https://github.com/alexdev/openmcp",
      technologies: ["TypeScript", "Node.js", "MCP"],
      stars: 1200,
      highlights: [
        "1,200+ GitHub stars",
        "Published on npm with 50k+ monthly downloads",
        "Featured in MCP community newsletter",
      ],
    },
    {
      name: "DevDash",
      description:
        "Unified developer dashboard aggregating PRs, issues, deploys, and alerts across multiple services.",
      url: "https://github.com/alexdev/devdash",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
      stars: 340,
      highlights: [
        "Integrated with GitHub, GitLab, PagerDuty, and Datadog",
        "Used daily by 50+ engineers at 3 companies",
      ],
    },
    {
      name: "SQLMigrator",
      description:
        "CLI tool for safe, reversible database migrations with automatic rollback on failure.",
      url: "https://github.com/alexdev/sqlmigrator",
      technologies: ["Go", "PostgreSQL", "MySQL"],
      stars: 180,
      highlights: [
        "Supports PostgreSQL and MySQL",
        "Zero-downtime migration strategy with shadow table approach",
      ],
    },
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      year: 2023,
    },
    {
      name: "Certified Kubernetes Application Developer (CKAD)",
      issuer: "Cloud Native Computing Foundation",
      year: 2022,
    },
  ],
};

export type PortfolioData = typeof portfolioData;
