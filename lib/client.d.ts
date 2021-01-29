import { AWSConfig } from "./types";
export declare const getAWSConfig: (basePath: string) => Promise<AWSConfig>;
export declare const get: <T>(path: string) => Promise<T>;
export declare const post: <T>(path: string) => Promise<T>;
export declare const request: <T>(req: Request) => Promise<T>;
export declare const parse: <T>(text: string) => T;
