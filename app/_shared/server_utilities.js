export const API = async (url, method, headers, body) => {
    const response = await fetch(url, {
        method: method,
        headers: !headers ? { 'Content-Type': 'application/json' } : headers,
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
}

export const toLowerCase = (string) => {
    return string.toLowerCase();
}