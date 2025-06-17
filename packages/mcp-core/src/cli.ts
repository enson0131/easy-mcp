#!/usr/bin/env node
import startServer, { IMcpConfig } from './mcp';
import { program } from "commander";

program
    .name("esay-mcp")
    .usage(`<command> [option]`)
    .version(`1.0.0`, "-v, --version") // 版本号
    .option("-c, --config <path>", "config file path") // 配置文件路径

program.parse(process.argv);

export function start (options?: IMcpConfig) {
  return startServer(options).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

// If we're being executed directly (not imported), start the server
// 如果执行的是 cli 命令 + 配置了参数，则启动 server
if (process?.argv?.length >= 2) {
  start();
}
