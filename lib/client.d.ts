import { AWSConfig } from './types';
export declare const getPrefix: () => Promise<string>;
export declare const getAWSConfig: () => Promise<AWSConfig>;
export declare const get: (path: string) => Promise<any>;
export declare const request: (req: Request) => Promise<any>;
