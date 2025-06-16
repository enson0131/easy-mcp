var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

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
var initConfig = (options) => {
  let mergeOptions = {};
  const configPath = resolve(process.cwd(), ".language-mcp.js");
  const configJsonByFile = __require(configPath);
  console.log(`process.argv -->`, process.argv);
  mergeOptions = Object.assign({}, configJsonByFile, options || {});
  return mergeOptions;
};
var createServer = (options) => {
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
var addGetLanguageTools = (lastResult) => {
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
  const pips = [init, createServer, addGetLanguageTools];
  for (let pipsOperation of pips) {
    asyncSeries.next(pipsOperation);
  }
  const pro = asyncSeries.run();
  pro.catch((err) => {
    console.error(`[ERROR]`, err);
  });
  return pro;
};
var mcp_default = startServer;

// src/cli.ts
function start(options) {
  return mcp_default(options).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
if (process.argv[1]) {
  start();
}
export {
  start
};
//# sourceMappingURL=index.js.map