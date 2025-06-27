#!/usr/bin/env node
import { start as startServer } from 'easy-mcp-generator';
import configData from './.easy-mcp.js';

console.log('configData', configData);

startServer({
    config: configData,
}).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
