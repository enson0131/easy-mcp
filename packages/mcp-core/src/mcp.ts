import { FastMCP, ToolParameters } from "fastmcp";
import { AsyncSeriesHook } from "./utils/utils";
import { resolve } from "path";
import { program } from "commander";
import { IMcpConfigType, IRequestRes } from "./types";
import axios, { AxiosRequestConfig } from "axios";

export interface IMcpConfig {
  config: string | Record<string, any>; // 配置文件路径
}

type IStartOptions =
  | {
      httpStream: {
        port: number;
      };
      transportType: "httpStream";
    }
  | {
      transportType: "stdio";
    };
/**
 * 从命令行、配置环境、函数参数中获取项目配置文件
 */
const initConfig = async (options?: IMcpConfig) => {
  // 1. 获取命令行的参数
  // program.parse(process.argv);
  // const opts = program.opts();
  // const configPath =
  //   opts.config || options.config || resolve(process.cwd(), ".easy-mcp.js");

  // 2. 获取配置文件
  let configJsonByFile = {};

  console.log('options', options);

  // if (typeof options.config === "string") {
  //   try {
  //     const configModule = await import(configPath);
  //     configJsonByFile = configModule.default || configModule;
  //   } catch (error) {
  //     console.warn(`无法加载配置文件 ${configPath}:`, error.message);
  //   }
  // } else {
    configJsonByFile = options.config;
  // }

  return configJsonByFile as IMcpConfigType;
};

const createServer = async (options: IMcpConfigType) => {
  const {
    name,
    version,
    tools,
    transportType = "stdio",
    port = 3000,
  } = options;

  const server = new FastMCP({
    name, // 服务名称
    version,
  });

  let startOptions: IStartOptions = {
    transportType: "stdio",
  };

  if (transportType === "httpStream") {
    startOptions = {
      httpStream: {
        port,
      },
      transportType: "httpStream",
    };
  }


  for (const tool of tools) {
    server.addTool({
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters as ToolParameters,
      execute: async (args) => {
        let action = tool.request;
        if (typeof tool.request !== "function") {
          action = async () =>
            await axios(tool.request as AxiosRequestConfig<any>);
        }

        // @ts-ignore TODO fix
        return (await action(args)) as IRequestRes;
      },
    });
  }

  server
  .start(startOptions)
  .then(() => {
    console.log(`[INFO] ${name} 服务启动成功`);
  })
  .catch((error) => {
    console.error(`[ERROR] ${name} 服务启动失败:`, error);
  });

  return server;
};

export const start = async (options?: IMcpConfig | IMcpConfigType) => {
  const asyncSeries = new AsyncSeriesHook();

  // 判断是否直接传入了配置数据
  const init = async () => {
      // 传入配置文件路径
      return await initConfig(options as IMcpConfig);
  };

  const pips: Array<(...args) => Promise<any>> = [init, createServer];

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
