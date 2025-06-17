# easy-mcp
一款通过 `配置即可` 生成 MCP 的工具

# 架构设计
- 1 参考了 vite-plugin-vue-mcp 的 `pnpm + monorepo` 和 Figma-Context-MCP 的设计
- 2 参考了低代码的设计思路

# engine
Node >= 22.12.0

## 配置案例


```js
module.exports = {
  name: 'language-mcp',
  version: "1.0.0",
  tools: [
    { 
      name: 'get_language_list',
      description: "获取语料列表",
      parameters: {
        
      },
      // 获取语言配置
      requestConfig: {
        method: 'GET',
        url: 'https://xxx.com/api/client/${appCode}/${env}/${locale}/default' // 获取语料的url
      }
    },
    { 
      name: 'get_language_list',
      description: "获取语料列表",
      parameters: {
        appCode: String,
        env: String,
        locale: String,
      },
      // 获取语言配置
      requestConfig: (args) => {
        const { appCode, env, locale } = args;
        return {
          method: 'GET',
          url: `https://xxx.com/api/client/${appCode}/${env}/${locale}/default` // 获取语料的url
        }
      }
    }
  ]
}

```

| 标题 | 类型 | 是否必填 | 含义 | 
| ---  | --- | --- | --- | 
| name  | string  | 是 |  MCP 服务名称  |
| version  | `${number}.${number}.${number}`  | 是  | MCP 版本  |
| tools    |      Array<Itool>              | 否               | MCP 中的[工具](https://modelcontextprotocol.io/docs/concepts/tools)允许服务器公开可由客户端调用并由 LLM 用于执行操作的可执行函数。             |



Itool 类型

| 标题 | 类型 | 是否必填 | 含义 | 
| ---  | --- | --- | --- |
| name  | string  | 是 | 工具名称  |
| description  | string | 是 | 工具描述  |
| parameters    |      any | 否 |      参数类型描述     |  
| requestConfig    | Record<string, any> \| ((args: any) => IRequestRes) | 是 |  获取数据的方法，axios 的配置 |


# 参考
- https://github.com/webfansplz/vite-plugin-vue-mcp
- https://github.com/punkpeye/fastmcp-boilerplate
- https://github.com/GLips/Figma-Context-MCP/blob/main/src/mcp.ts