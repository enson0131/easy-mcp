module.exports = {
  getLanguage: { // 获取语言配置
    method: 'GET',
    // appCode: '1234567890', // 应用编码
    // env: 'pro', // 环境
    url: 'https://customizer.bytello.com/api/client/${appCode}/${env}/${locale}/default' // 获取语料的url
  }
}