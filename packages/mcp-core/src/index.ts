// import { FastMCP } from "fastmcp";
// import { z } from "zod";

// export interface McpConfig {
//   projectId: string; // 项目id
//   env: string; // 环境
//   path?: string; // 路径
//   language?: string; // 语言
//   languageCode?: string; // 语言代码
//   languageName?: string; // 语言名称
// }

// // export const startMCP = (options?: McpConfig) => {
// const server = new FastMCP({
//   name: "language-mcp", // 服务名称
//   version: "1.0.0",
// });

// server.start({
//   transportType: "stdio", // 使用 stdio 传输协议
// });

// // 获取语言列表的工具函数
// server.addTool({
//   name: "get_language_list",
//   description: "获取语言列表",
//   parameters: z.object({
//     //   project_id: z.string(), // 项目id
//     //   path: z.string(), // 路径
//   }),
//   execute: async (args) => {
//     console.log("options");
//     return "hello Language MCP";
//   },
// });
// // }

// // startMCP();


import { FastMCP } from "fastmcp";
import { z } from "zod"; // Or any validation library that supports Standard Schema

const server = new FastMCP({
  name: "My Server",
  version: "1.0.0",
});

server.addTool({
  name: "add",
  description: "Add two numbers",
  parameters: z.object({
    a: z.number(),
    b: z.number(),
  }),
  execute: async (args) => {
    return String(args.a + args.b);
  },
});

server.start({
  transportType: "stdio",
});