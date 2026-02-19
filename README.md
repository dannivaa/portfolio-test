# Portfolio MCP Server

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that exposes portfolio data as resources and tools, enabling AI assistants to query your professional profile.

## Features

### Resources

| URI | Description |
|-----|-------------|
| `portfolio://personal` | Name, bio, location, social links |
| `portfolio://skills` | Technical skills with categories and proficiency levels |
| `portfolio://experience` | Work history with roles, companies, and highlights |
| `portfolio://education` | Academic background |
| `portfolio://projects` | Open-source and personal projects |
| `portfolio://certifications` | Professional certifications |

### Tools

| Tool | Description |
|------|-------------|
| `search_skills` | Search skills by name or category |
| `get_projects_by_technology` | Find projects using a specific technology |
| `get_experience_summary` | Plain-text experience summary, filterable by years |
| `get_contact_info` | Contact details and social links |
| `get_full_profile` | Complete portfolio as structured JSON |

## Setup

```bash
npm install
npm run build
```

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "portfolio": {
      "command": "node",
      "args": ["/path/to/portfolio-mcp-server/dist/index.js"]
    }
  }
}
```

## Usage with Claude Code

```bash
claude mcp add portfolio -- node /path/to/portfolio-mcp-server/dist/index.js
```

## Development

```bash
npm run dev   # run with tsx (no build step)
npm run build # compile TypeScript to dist/
npm start     # run compiled output
```

## Customization

Edit `src/portfolio-data.ts` to update the portfolio content with your own information.
