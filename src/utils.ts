import { CLOUDFRONT_HOST, CN_REGION_HOST } from "./constants";

export const isCnPartition = (region: string): boolean => region === "cn-north-1" || region === "cn-northwest-1";
export const getBaseUrl = (region: string): string => isCnPartition(region) ? CN_REGION_HOST : CLOUDFRONT_HOST
export const getContentPrefixUrl = (region: string): string => `${getBaseUrl(region)}/content`;
export const getPrefixUrl = (region: string): string => `${getBaseUrl(region)}/prefixes/main`;