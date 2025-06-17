#!/usr/bin/env node
import startServer, { ILanguageMcpConfig } from './mcp';
import { program } from "commander";

program
    .name("language-mcp")
    .usage(`<command> [option]`)
    .version(`1.0.0`, "-v, --version") // 版本号
    .option("-c, --config <path>", "config file path") // 配置文件路径
    .option("-e, --env <string>", "env") // 环境
    .option("-l, --language <string>", "language code, like zh-CN, en-US"); // 语言

program.parse(process.argv);

export function start (options?: ILanguageMcpConfig) {
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
