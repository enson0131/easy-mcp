#!/usr/bin/env node
import startServer, { ILanguageMcpConfig } from './mcp';


export function start (options?: ILanguageMcpConfig) {
  return startServer(options).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}

// If we're being executed directly (not imported), start the server
if (process.argv[1]) {
  start();
}
