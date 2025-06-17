#!/usr/bin/env node
interface ILanguageMcpConfig {
    projectId: string;
    env: string;
    language?: string;
}

declare function start(options?: ILanguageMcpConfig): Promise<any>;

export { type ILanguageMcpConfig as I, start };
