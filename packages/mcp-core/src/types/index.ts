import { ContentResult, ImageContent, TextContent, ToolParameters } from "fastmcp";

export type IRequestRes =  Promise<ContentResult | ImageContent | string | TextContent | void>;

export interface IMcpConfigType {
  name: string;
  version: `${number}.${number}.${number}`;
  tools: Array<{
    name: string;
    description: string;
    parameters: ToolParameters,
    request: Record<string, any> | ((args: any) => IRequestRes)
  }>
  transportType?: "stdio" | "httpStream";
  port?: number;
}