#!/usr/bin/env node
interface ILanguageMcpConfig {
    projectId: string;
    env: string;
    language?: string;
    getLanguage?: {
        method: string;
        appCode: string;
        env: string;
        url: string;
    };
}

declare function start(options?: ILanguageMcpConfig): Promise<any>;

export { type ILanguageMcpConfig as I, start };
