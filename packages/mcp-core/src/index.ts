import { FastMCP } from "fastmcp";
import { z } from "zod";
import { AsyncSeriesHook } from "./utils/utils";

export interface ILanguageMcpConfig {
  projectId: string; // 项目id
  env: string; // 环境
  path?: string; // 路径
  language?: string; // 语言
  languageCode?: string; // 语言代码
  languageName?: string; // 语言名称
}

interface IChainResult {
  options: ILanguageMcpConfig,
  server: FastMCP
}

/**
 * 从命令行、配置环境、函数参数中获取项目配置文件
 */
const initConfig = (options: ILanguageMcpConfig) => {
  let mergeOptions = {} as ILanguageMcpConfig;
  // 1. 获取配置文件的参数


  // 2. 获取命令行的参数

  // 3. 获取函数上的参数，进行合并

  return mergeOptions
}

const createServer = (options) => {
  const server = new FastMCP({
    name: "language-mcp", // 服务名称
    version: "1.0.0",
  });
  
  return {
    options,
    server,
  } as IChainResult;
}

const addGetLanguageTools = (lastResult: IChainResult) => {
  const { server, options } = lastResult
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
}


const start = async (options: ILanguageMcpConfig) => {
  const asyncSeries = new AsyncSeriesHook();
  const init = async () => await initConfig(options)
  
  const pips = [init, createServer, addGetLanguageTools];

  for(let pipsOperation of pips) {
    asyncSeries.next(pipsOperation);
  }

  const pro =  asyncSeries.run()

  pro.catch(err => {
    console.error(`[ERROR]`, err);
  })

  return pro;
}

export default start;