# BemoUI-MCP

BemoUI-MCP is a read-only STDIO MCP server that lets an agent inspect the complete BemoUI catalog and decide which components fit a page.

## Tools

- `list_components`: returns the full compact catalog, with optional factual filters.
- `get_components`: returns detailed metadata for up to 20 candidate components.
- `get_component_source`: returns one selected implementation variant.

The compact catalog is also available as the `bemoui://catalog/compact` MCP resource.

## Run

```bash
npm run mcp:start
```

The process uses STDIO and is normally started by an MCP client rather than run interactively.

## Codex configuration

Add this project to Codex with an absolute server path:

```bash
codex mcp add BemoUI-MCP -- node /absolute/path/to/BemoUI/mcp/server.js
```

Equivalent `config.toml`:

```toml
[mcp_servers.BemoUI-MCP]
command = "node"
args = ["/absolute/path/to/BemoUI/mcp/server.js"]
enabled_tools = ["list_components", "get_components", "get_component_source"]
required = true
```

Use `BEMOUI_ROOT` only when the server file is outside the BemoUI repository:

```toml
[mcp_servers.BemoUI-MCP.env]
BEMOUI_ROOT = "/absolute/path/to/BemoUI"
```

## Test

```bash
npm run test:mcp
```
