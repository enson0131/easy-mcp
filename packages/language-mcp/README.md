# 语料平台的 MCP

基于 easy-mcp-generator 构建的 MCP 服务

## 如何使用

### 安装
```bash
pnpm add language-mcp -D
```


### 配置

#### cursor 为例
```json
// .cursor/mcp.json
{
  "mcpServers": {
    "language-mcp": {
      "command": "npx",
      "args": ["-y", "language-mcp"]
    }
  }
}
```

### 启动
```shell
# 启动 MCP 服务
language-mcp -c .easy-mcp.js
```


