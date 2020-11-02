import { initiateExtension } from './aws_glue_databrew_extension';
// these are jupyter_beta assets
const CLOUDFRONT_HOST = 'https://dc69wn9dwut4o.cloudfront.net';
const CONTENT_PREFIX = CLOUDFRONT_HOST + '/content';
const PREFIX_URL = CLOUDFRONT_HOST + '/prefixes/main';
const jsFileName = 'main.js';
const styleFileName = 'styles.css';
const getPaths = async () => {
    const prefix = await getPrefix();
    return [
        `${CONTENT_PREFIX}/${prefix}/${jsFileName}`,
        `${CONTENT_PREFIX}/${prefix}/${styleFileName}`,
    ];
};
const getPrefix = async () => {
    const response = await fetch(PREFIX_URL);
    const json = await response.json();
    return json && json.prefix.toString();
};
const extension = initiateExtension(getPaths);
export default extension;
