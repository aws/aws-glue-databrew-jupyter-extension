export const getAWSConfig = async (basePath) => {
    try {
        const config = await get(`${basePath}awsproxy/awsconfig`);
        return {
            region: config.region,
        };
    }
    catch (_a) {
        const config = await post(`${basePath}api/getInstanceConfig`);
        return {
            region: config.region,
        };
    }
};
export const get = (path) => {
    const options = { method: "get" };
    return request(new Request(path, options));
};
export const post = (path) => {
    const options = { method: "post" };
    return request(new Request(path, options));
};
export const request = async (req) => {
    const res = await fetch(req);
    const text = await res.text();
    const data = text && parse(text);
    if (!res.ok) {
        const error = data;
        throw new Error((error && error.message) || res.statusText);
    }
    return data;
};
export const parse = (text) => {
    try {
        return JSON.parse(text);
    }
    catch (_a) {
        return {};
    }
};
