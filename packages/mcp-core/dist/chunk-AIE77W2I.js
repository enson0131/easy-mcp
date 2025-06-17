// src/mcp.ts
import { FastMCP } from "fastmcp";
import { z } from "zod";

// src/utils/utils.ts
var AsyncSeriesHook = class {
  tasks;
  constructor() {
    this.tasks = [];
  }
  next(task) {
    this.tasks.push(task);
    return this;
  }
  callAsync(...args) {
    const finalCallback = args.pop();
    const next = (idx, lastResult = null) => {
      if (idx === this.tasks.length) {
        finalCallback(lastResult, null);
        return;
      }
      const task = this.tasks[idx];
      task(lastResult, ...args).then(
        (res) => {
          next(idx + 1, res);
        },
        (err) => finalCallback(null, err)
      );
    };
    next(0);
  }
  run(...args) {
    return new Promise((resolve2, reject) => {
      const finalCallback = (res, err) => {
        if (err) {
          reject(err);
        } else {
          resolve2(res);
        }
      };
      this.callAsync(...args, finalCallback);
    });
  }
};

// src/mcp.ts
import { resolve } from "path";
import { program } from "commander";
var initConfig = async (options) => {
  program.parse(process.argv);
  const opts = program.opts();
  const configPath = opts.config || resolve(process.cwd(), ".language-mcp.js");
  let configJsonByFile = {};
  try {
    const configModule = await import(configPath);
    configJsonByFile = configModule.default || configModule;
  } catch (error) {
    console.warn(`\u65E0\u6CD5\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6 ${configPath}:`, error.message);
  }
  return Object.assign(
    {},
    configJsonByFile,
    options || {}
  );
};
var createServer = async (options) => {
  const server = new FastMCP({
    name: "language-mcp",
    // 服务名称
    version: "1.0.0"
  });
  return {
    options,
    server
  };
};
var addGetLanguageTools = async (lastResult) => {
  const { server, options } = lastResult;
  server.addTool({
    name: "get_language_list",
    description: "\u83B7\u53D6\u8BED\u8A00\u5217\u8868",
    parameters: z.object({
      //   project_id: z.string(), // 项目id
      //   path: z.string(), // 路径
    }),
    execute: async (args) => {
      console.log("options");
      return "hello Language MCP";
    }
  });
  return lastResult;
};
var startServer = async (options) => {
  const asyncSeries = new AsyncSeriesHook();
  const init = async () => await initConfig(options);
  const pips = [
    init,
    createServer,
    addGetLanguageTools
  ];
  let currentPivot = asyncSeries;
  for (let pipsOperation of pips) {
    currentPivot = currentPivot.next(pipsOperation);
  }
  console.log(`currentPivot -->`, currentPivot);
  const pro = currentPivot.run();
  pro.catch((err) => {
    console.error(`[ERROR]`, err);
  });
  return pro;
};
var mcp_default = startServer;

// src/cli.ts
import { program as program2 } from "commander";
program2.name("language-mcp").usage(`<command> [option]`).version(`1.0.0`, "-v, --version").option("-c, --config <path>", "config file path").option("-e, --env <string>", "env").option("-l, --language <string>", "language code, like zh-CN, en-US");
program2.parse(process.argv);
function start(options) {
  return mcp_default(options).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
if (process?.argv?.length >= 2) {
  start();
}

export {
  start
};
//# sourceMappingURL=chunk-AIE77W2I.js.map