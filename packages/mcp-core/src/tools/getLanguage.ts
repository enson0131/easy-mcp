import axios from "axios";
import { retry } from "../utils/utils";
import { ILanguageMcpConfig } from "src/mcp";

export interface CreateLocalesCoreOptions {
    appCode: string; // 应用编码
    env?: string; // 环境
    before?: () => Promise<void>; // 执行前的钩子
    after?: () => Promise<void>; // 执行后的钩子
    error?: (error: Error) => void; // 错误处理
}

export interface LocaleResType {
    status: number;
    statusText: string;
    headers: Record<string, any>;
    config: Record<string, any>;
    data: Record<string, string>;
}


/**
 * 获取项目中的语料资源
 * @param _ 
 * @param initOption - 语料资源配置
 * @returns 
 */
export async function getLanguage(initOption: ILanguageMcpConfig['getLanguage']) {

    if (!initOption) return;

    let { appCode, env = 'pro', url } = initOption;
  
    const getLanguage = () => axios({
        method: initOption.method,
        url: url.replace('${appCode}', appCode).replace('${env}', env)
    });
    const result = (await retry(getLanguage)) as LocaleResType;
  
    if (!result) {
      throw new Error('get language fail'); 
    }
    
    return result.data;
}