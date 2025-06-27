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


# 如何发包

项目目前采用的是 changesets 管理版本，发布时需要执行 `pnpm release` 命令，该命令会执行 `pnpm build` 和 `pnpm changeset publish` 命令

## 步骤1 - 添加一个 Changeset 在你的代码分支上，运行以下命令

```bash
pnpm changeset
```

pnpm 会调用 Changesets 的 CLI，它会启动一个交互式命令行，问你几个问题：

1. 你想要发布哪个包？ -> 你可以使用方向键和空格选择
2. 再次询问，让你确认 -> 直接回车即可
3. 选择需要修改的版本 -> major.minor.patch 遵循 [semver 规范](https://semver.org/)
4. 请填写本次变更的摘要


## 步骤2 - 提交代码和 Changeset 文件 将你的代码改动和这个新生成的 .md 文件一起提交到 git，并发起一个 Pull Request。


## 步骤3 - 版本更新与发布 当你的 PR 被合并到主分支后，就到了发布的时刻。

```bash
pnpm changeset version
```

这个命令会：

1. 找到所有的 changeset 文件。
2. 删除这些 .md 文件。
3. 根据文件内容，自动更新 packages/shared-ui/package.json 中的 version 字段。
4. 自动更新 packages/xx/CHANGELOG.md，将变更摘要加进去。

## 步骤4 - 构建与发布

```bash
pnpm release
```




# 参考
- https://github.com/webfansplz/vite-plugin-vue-mcp
- https://github.com/punkpeye/fastmcp-boilerplate
- https://github.com/GLips/Figma-Context-MCP/blob/main/src/mcp.ts
- https://github.com/astonishqft/pnpm-monorepo-demo
