// src/index.ts
import { FastMCP } from "fastmcp";
import { z } from "zod";
var server = new FastMCP({
  name: "My Server",
  version: "1.0.0"
});
server.addTool({
  name: "add",
  description: "Add two numbers",
  parameters: z.object({
    a: z.number(),
    b: z.number()
  }),
  execute: async (args) => {
    console.log(`args---<>`, args);
    return String(args.a + args.b);
  }
});
server.start({
  transportType: "stdio"
});
//# sourceMappingURL=index.js.map