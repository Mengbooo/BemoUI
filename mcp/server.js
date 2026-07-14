#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import {
  buildCatalog,
  compactComponent,
  DEFAULT_ROOT,
  filterCatalog,
  readVariantSource,
} from "./catalog.js";

const SERVER_NAME = "BemoUI-MCP";
const SERVER_VERSION = "0.1.0";

function jsonResult(value) {
  return {
    content: [{ type: "text", text: JSON.stringify(value, null, 2) }],
    structuredContent: value,
  };
}

function errorResult(message) {
  return {
    isError: true,
    content: [{ type: "text", text: message }],
  };
}

export function createBemouiMcpServer({ rootDir = DEFAULT_ROOT } = {}) {
  const resolvedRoot = path.resolve(rootDir);
  const catalog = buildCatalog(resolvedRoot);
  const byId = new Map(catalog.map(component => [component.id, component]));
  const compactCatalog = catalog.map(compactComponent);

  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions: "Use list_components before choosing BemoUI components for a page. Review the full compact catalog or apply factual filters, then use get_components for a small candidate set and get_component_source only for the final selection. The server returns component facts rather than subjective recommendations. All tools are read-only.",
    },
  );

  server.registerTool(
    "list_components",
    {
      title: "List BemoUI components",
      description: "Return the complete compact BemoUI component catalog, optionally filtered by text, collection, category, or variant. Use this first so the agent can compare components itself.",
      inputSchema: {
        query: z.string().optional().describe("Optional semantic keyword filter, for example social-proof or background."),
        collection: z.string().optional().describe("Optional exact collection filter, such as MagicUI or ReactBits."),
        category: z.string().optional().describe("Optional exact category filter, such as Backgrounds or TextAnimations."),
        variant: z.string().optional().describe("Optional exact variant id, such as react-tailwind or react-ts-css."),
        limit: z.number().int().min(1).max(500).default(500).describe("Maximum entries to return. Defaults to the full catalog up to 500."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ query, collection, category, variant, limit }) => {
      const matches = filterCatalog(catalog, { query, collection, category, variant });
      return jsonResult({
        catalogRevision: SERVER_VERSION,
        total: catalog.length,
        matched: matches.length,
        returned: Math.min(matches.length, limit),
        components: matches.slice(0, limit).map(compactComponent),
      });
    },
  );

  server.registerTool(
    "get_components",
    {
      title: "Inspect BemoUI components",
      description: "Return detailed metadata for a small candidate set, including variants, dependencies, usage, capabilities, warnings, and source provenance. This does not return implementation source.",
      inputSchema: {
        ids: z.array(z.string()).min(1).max(20).describe("One to twenty component ids from list_components."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ ids }) => {
      const missing = ids.filter(id => !byId.has(id));
      if (missing.length > 0) return errorResult(`Unknown component ids: ${missing.join(", ")}`);
      return jsonResult({ components: ids.map(id => byId.get(id)) });
    },
  );

  server.registerTool(
    "get_component_source",
    {
      title: "Read BemoUI component source",
      description: "Return the files for one selected component variant. Call this only after comparing candidates with list_components and get_components.",
      inputSchema: {
        id: z.string().describe("Component id from list_components."),
        variant: z.string().describe("Exact variant id exposed by the component, such as react-tailwind."),
        maxBytes: z.number().int().min(1_000).max(1_000_000).default(250_000).describe("Safety limit for the total returned source size."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async ({ id, variant, maxBytes }) => {
      const component = byId.get(id);
      if (!component) return errorResult(`Unknown component id: ${id}`);

      try {
        return jsonResult({
          component: compactComponent(component),
          variant,
          files: readVariantSource(component, variant, resolvedRoot, maxBytes),
        });
      } catch (error) {
        return errorResult(error instanceof Error ? error.message : String(error));
      }
    },
  );

  server.registerResource(
    "BemoUI compact component catalog",
    "bemoui://catalog/compact",
    {
      title: "BemoUI compact component catalog",
      description: "The complete compact catalog for agent-side component selection.",
      mimeType: "application/json",
    },
    async uri => ({
      contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify({
        catalogRevision: SERVER_VERSION,
        total: compactCatalog.length,
        components: compactCatalog,
      }) }],
    }),
  );

  return server;
}

async function main() {
  const rootDir = process.env.BEMOUI_ROOT || DEFAULT_ROOT;
  const server = createBemouiMcpServer({ rootDir });
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${SERVER_NAME} ${SERVER_VERSION} running on stdio`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch(error => {
    console.error(`${SERVER_NAME} failed:`, error);
    process.exit(1);
  });
}

export { SERVER_NAME, SERVER_VERSION };
