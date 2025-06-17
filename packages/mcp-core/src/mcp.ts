import { FastMCP } from "fastmcp";
import { z } from "zod";
import { AsyncSeriesHook } from "./utils/utils";
import { resolve } from "path";
import { program } from "commander";

export interface ILanguageMcpConfig {
  projectId: string; // 项目id
  env: string; // 环境
  language?: string; // 语言
}

interface IChainResult {
  options: ILanguageMcpConfig;
  server: FastMCP;
}

/**
 * 从命令行、配置环境、函数参数中获取项目配置文件
 */
const initConfig = async (options?: ILanguageMcpConfig) => {
  // 1. 获取命令行的参数
  program.parse(process.argv);
  const opts = program.opts();
  const configPath = opts.config || resolve(process.cwd(), ".language-mcp.js");

  // 2. 获取配置文件的参数
  let configJsonByFile = {};
  try {
    const configModule = await import(configPath);
    configJsonByFile = configModule.default || configModule;
  } catch (error) {
    console.warn(`无法加载配置文件 ${configPath}:`, error.message);
  }

  // 3. 获取函数上的参数，进行合并
  return Object.assign(
    {},
    configJsonByFile,
    options || {}
  ) as ILanguageMcpConfig;
};

const createServer = async (options) => {
  const server = new FastMCP({
    name: "language-mcp", // 服务名称
    version: "1.0.0",
  });

  return {
    options,
    server,
  } as IChainResult;
};

const addGetLanguageTools = async (lastResult: IChainResult) => {
  const { server, options } = lastResult;
  // 获取语言列表的工具函数
  server.addTool({
    name: "get_language_list",
    description: "获取语言列表",
    parameters: z.object({
      //   project_id: z.string(), // 项目id
      //   path: z.string(), // 路径
    }),
    execute: async (args) => {
      //
      console.log("options");
      return "hello Language MCP";
    },
  });

  return lastResult;
};

const startServer = async (options?: ILanguageMcpConfig) => {
  const asyncSeries = new AsyncSeriesHook();
  const init = async () => await initConfig(options);

  const pips: Array<(...args) => Promise<any>> = [
    init,
    createServer,
    addGetLanguageTools,
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

export default startServer;
