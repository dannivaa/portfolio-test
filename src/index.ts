import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";

import { portfolioData } from "./portfolio-data.js";

const server = new Server(
  {
    name: "portfolio-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// ── Resources ──────────────────────────────────────────────────────────────

const RESOURCES = [
  {
    uri: "portfolio://personal",
    name: "Personal Info",
    description: "Contact details, bio, and social links",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://skills",
    name: "Skills",
    description: "Technical skills grouped by category and proficiency level",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://experience",
    name: "Work Experience",
    description: "Employment history with roles, companies, and achievements",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://education",
    name: "Education",
    description: "Academic background and degrees",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://projects",
    name: "Projects",
    description: "Open-source and personal projects with descriptions and links",
    mimeType: "application/json",
  },
  {
    uri: "portfolio://certifications",
    name: "Certifications",
    description: "Professional certifications and credentials",
    mimeType: "application/json",
  },
];

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: RESOURCES,
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  const resourceMap: Record<string, unknown> = {
    "portfolio://personal": portfolioData.personal,
    "portfolio://skills": portfolioData.skills,
    "portfolio://experience": portfolioData.experience,
    "portfolio://education": portfolioData.education,
    "portfolio://projects": portfolioData.projects,
    "portfolio://certifications": portfolioData.certifications,
  };

  if (!(uri in resourceMap)) {
    throw new McpError(ErrorCode.InvalidRequest, `Unknown resource URI: ${uri}`);
  }

  return {
    contents: [
      {
        uri,
        mimeType: "application/json",
        text: JSON.stringify(resourceMap[uri], null, 2),
      },
    ],
  };
});

// ── Tools ──────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "search_skills",
      description:
        "Search for skills by name or category. Returns matching skills with proficiency levels.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search term to match against skill name or category",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_projects_by_technology",
      description: "Find projects that use a specific technology or language.",
      inputSchema: {
        type: "object",
        properties: {
          technology: {
            type: "string",
            description: "Technology name to search for (e.g., TypeScript, React)",
          },
        },
        required: ["technology"],
      },
    },
    {
      name: "get_experience_summary",
      description:
        "Get a plain-text summary of work experience, optionally filtered by time range.",
      inputSchema: {
        type: "object",
        properties: {
          years: {
            type: "number",
            description:
              "Only include experience from the last N years. Omit to get all experience.",
          },
        },
        required: [],
      },
    },
    {
      name: "get_contact_info",
      description: "Retrieve contact information and social profile links.",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_full_profile",
      description:
        "Retrieve the complete portfolio profile as a structured JSON object.",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_skills": {
      const query = String((args as { query: string }).query).toLowerCase();
      const matches = portfolioData.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query)
      );
      return {
        content: [
          {
            type: "text",
            text:
              matches.length > 0
                ? JSON.stringify(matches, null, 2)
                : `No skills found matching "${query}".`,
          },
        ],
      };
    }

    case "get_projects_by_technology": {
      const tech = String(
        (args as { technology: string }).technology
      ).toLowerCase();
      const matches = portfolioData.projects.filter((p) =>
        p.technologies.some((t) => t.toLowerCase().includes(tech))
      );
      return {
        content: [
          {
            type: "text",
            text:
              matches.length > 0
                ? JSON.stringify(matches, null, 2)
                : `No projects found using technology "${tech}".`,
          },
        ],
      };
    }

    case "get_experience_summary": {
      const yearsArg = (args as { years?: number }).years;
      let experience = portfolioData.experience;

      if (yearsArg !== undefined && yearsArg > 0) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - yearsArg);
        experience = experience.filter((e) => {
          const end = e.endDate ? new Date(e.endDate) : new Date();
          return end >= cutoff;
        });
      }

      const summary = experience
        .map((e) => {
          const end = e.endDate ?? "Present";
          const lines = [
            `${e.role} @ ${e.company} (${e.startDate} – ${end})`,
            `  ${e.description}`,
            ...e.highlights.map((h) => `  • ${h}`),
          ];
          return lines.join("\n");
        })
        .join("\n\n");

      return {
        content: [{ type: "text", text: summary || "No experience found." }],
      };
    }

    case "get_contact_info": {
      const { name, email, location, website, github, linkedin } =
        portfolioData.personal;
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { name, email, location, website, github, linkedin },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_full_profile": {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(portfolioData, null, 2),
          },
        ],
      };
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
});

// ── Start ──────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Portfolio MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
