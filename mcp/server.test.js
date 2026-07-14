import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createBemouiMcpServer } from "./server.js";

async function withClient(run) {
  const server = createBemouiMcpServer();
  const client = new Client({ name: "BemoUI-MCP-test", version: "0.1.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);

  try {
    await run(client);
  } finally {
    await client.close();
  }
}

test("exposes the three read-only catalog tools", async () => {
  await withClient(async client => {
    const result = await client.listTools();
    assert.deepEqual(result.tools.map(tool => tool.name).sort(), [
      "get_component_source",
      "get_components",
      "list_components",
    ]);
    assert.ok(result.tools.every(tool => tool.annotations?.readOnlyHint === true));
  });
});

test("returns a full compact catalog and selected source over MCP", async () => {
  await withClient(async client => {
    const catalogResult = await client.callTool({ name: "list_components", arguments: {} });
    assert.ok(catalogResult.structuredContent.total > 150);
    assert.equal(catalogResult.structuredContent.total, catalogResult.structuredContent.returned);

    const sourceResult = await client.callTool({
      name: "get_component_source",
      arguments: { id: "marquee", variant: "react-tailwind" },
    });
    assert.equal(sourceResult.structuredContent.component.id, "marquee");
    assert.ok(sourceResult.structuredContent.files.some(file => file.path.endsWith("Marquee.jsx")));
  });
});

test("publishes the compact catalog as an MCP resource", async () => {
  await withClient(async client => {
    const resources = await client.listResources();
    assert.ok(resources.resources.some(resource => resource.uri === "bemoui://catalog/compact"));

    const result = await client.readResource({ uri: "bemoui://catalog/compact" });
    const payload = JSON.parse(result.contents[0].text);
    assert.ok(payload.total > 150);
    assert.equal(payload.total, payload.components.length);
  });
});
