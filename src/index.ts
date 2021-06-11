import { initiateExtension } from "./aws_glue_databrew_extension";
import {
  getContentPrefixUrl,
  getPrefixUrl,
} from "./utils";
import { jsFileName, styleFileName } from "./constants";

export const getPaths = async (region: string): Promise<string[]> => {
  const prefix = await getPrefix(region);
  const contentPrefixUrl = `${getContentPrefixUrl(region)}/${prefix}`;
  return [
    `${contentPrefixUrl}/${jsFileName}`,
    `${contentPrefixUrl}/${styleFileName}`,
  ];
};

export const getPrefix = async (region: string): Promise<string> => {
  const prefixUrl = getPrefixUrl(region);
  const req = new Request(prefixUrl);
  const response = await fetch(req);
  const json = await response.json();
  return json && json.prefix.toString();
};

const extension = initiateExtension(getPaths);

export default extension;
