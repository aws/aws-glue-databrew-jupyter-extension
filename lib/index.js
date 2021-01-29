import { initiateExtension } from "./aws_glue_databrew_extension";
import { CONTENT_PREFIX, jsFileName, PREFIX_URL, styleFileName, } from "./constants";
export const getPaths = async () => {
    const prefix = await getPrefix();
    return [
        `${CONTENT_PREFIX}/${prefix}/${jsFileName}`,
        `${CONTENT_PREFIX}/${prefix}/${styleFileName}`,
    ];
};
export const getPrefix = async () => {
    const response = await fetch(PREFIX_URL);
    const json = await response.json();
    return json && json.prefix.toString();
};
const extension = initiateExtension(getPaths);
export default extension;
