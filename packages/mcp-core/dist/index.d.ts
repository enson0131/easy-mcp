interface ILanguageMcpConfig {
    projectId: string;
    env: string;
    path?: string;
    language?: string;
    languageCode?: string;
    languageName?: string;
}

declare function start(options?: ILanguageMcpConfig): Promise<any>;

export { type ILanguageMcpConfig, start };
