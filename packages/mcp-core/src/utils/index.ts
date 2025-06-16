import axios from "axios";
import { retry } from "./utils";

export interface CreateLocalesCoreOptions {
    locales: string | Array<string>; // 获取语料的方法
    appCode: string; // 应用编码
    outputDir: string; // 输出目录
    env?: string; // 环境
    outputConfig?: Record<string, any>; // 输出配置
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
 * 获取语料资源
 * @param _ 
 * @param initOption - 语料资源配置
 * @returns 
 */
export async function getLocaleByLang(_: unknown, initOption: CreateLocalesCoreOptions) {
    let { locales, appCode, env = 'pro', outputConfig = {} } = initOption;
  
    if (typeof locales === 'string') {
      locales = [locales];
    }
  
    const getLocale = () => Promise.all(locales.map((locale: string) => axios.get(`https://customizer.bytello.com/api/client/${appCode}/${env}/${locale}/default`)));
    const result = (await retry(getLocale)) as Array<LocaleResType>;
  
    if (!result || result.length === 0) {
      throw new Error('get locales fail'); 
      return;
    }
    return result;
}