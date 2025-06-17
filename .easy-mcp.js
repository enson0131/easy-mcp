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
        url: 'https://customizer.bytello.com/api/client/${appCode}/${env}/${locale}/default' // 获取语料的url
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
          url: `https://customizer.bytello.com/api/client/${appCode}/${env}/${locale}/default` // 获取语料的url
        }
      }
    }
  ]
}