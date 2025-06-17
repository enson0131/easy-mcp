export { I as IMcpConfig, s as start } from './cli-ek4cgBQ1.js';
import { ToolParameters, ContentResult, ImageContent, TextContent } from 'fastmcp';

type IRequestRes = Promise<ContentResult | ImageContent | string | TextContent | void>;
interface IMcpConfigType {
    name: string;
    version: `${number}.${number}.${number}`;
    tools: Array<{
        name: string;
        description: string;
        parameters: ToolParameters;
        request: Record<string, any> | ((args: any) => IRequestRes);
    }>;
}

export type { IMcpConfigType, IRequestRes };
