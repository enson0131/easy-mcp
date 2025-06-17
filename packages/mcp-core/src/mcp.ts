import { FastMCP, ToolParameters } from "fastmcp";
import { z } from "zod";
import { AsyncSeriesHook } from "./utils/utils";
import { resolve } from "path";
import { program } from "commander";
import { getLanguage } from "./tools/getLanguage";
import { IMcpConfigType, IRequestRes } from "./types";
import axios, { AxiosRequestConfig } from "axios";

export interface IMcpConfig {
  config: string; // 配置文件路径
}
/**
 * 从命令行、配置环境、函数参数中获取项目配置文件
 */
const initConfig = async (options?: IMcpConfig) => {
  // 1. 获取命令行的参数
  program.parse(process.argv);
  const opts = program.opts();
  const configPath = opts.config || options.config || resolve(process.cwd(), ".easy-mcp.js");

  // 2. 获取配置文件
  let configJsonByFile = {};
  try {
    const configModule = await import(configPath);
    configJsonByFile = configModule.default || configModule;
  } catch (error) {
    console.warn(`无法加载配置文件 ${configPath}:`, error.message);
  }

  return configJsonByFile as IMcpConfigType;
};

const createServer = async (options: IMcpConfigType) => {
  const { name, version, tools } = options;

  
  
  const server = new FastMCP({
    name, // 服务名称
    version,
  });

  
  for(const tool of tools) {
    server.addTool({
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters as ToolParameters,
      execute: async (args) => {
        let action = tool.request;
        if (typeof tool.request !== 'function') {
          action = async () => await axios(tool.request as AxiosRequestConfig<any>); 
        }

        // @ts-ignore TODO fix
        return (await action(args)) as IRequestRes;
      }
    })
  }
};

const startServer = async (options?: IMcpConfig) => {
  const asyncSeries = new AsyncSeriesHook();
  const init = async () => await initConfig(options);

  const pips: Array<(...args) => Promise<any>> = [
    init,
    createServer,
  ];

  let currentPivot = asyncSeries;
  for (let pipsOperation of pips) {
    currentPivot = currentPivot.next(pipsOperation);
  }

  const pro = currentPivot.run();

  pro.catch((err) => {
    console.error(`[ERROR]`, err);
  });

  return pro;
};

export default startServer;
