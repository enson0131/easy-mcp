import axios from "axios";
import { z } from "zod";

// 语料平台相关的 MCP 服务配置
export default {
  name: 'language-mcp',
  version: "1.0.0",
  tools: [
    {
        name: 'get_language_list',
        description: '获取语料平台支持的语言列表',
        // 参数类型
        parameters: z.object({ // 符合 standard schema 的参数类型
            project: z.string().describe('项目名称'),
            language: z.string().describe('语言'),
            env: z.string().describe('环境'),
            customize: z.string().describe('定制客户的名称')
        }),
        // 请求配置
        request: async (params) => {
            const { project, language, env, customize } = params;
            const res = await axios({
                url: `https://xxx/api/client/${project}/${env}/${language}/${customize || 'default'}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log('res---->', res);

            return {
                content: [
                  {
                    type: "text",
                    text: JSON.stringify(res.data),
                  },
                ],
            };
        }
    }
  ]

}