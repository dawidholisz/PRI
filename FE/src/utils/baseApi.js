const mainQueryConfig = () => ({
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

const getQueryParams = params => {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&')
}

export default async (url, options: {}) => {
    let requestUrl = `${process.env.REACT_APP_API_URL}/${url}`
    const queryConfig = mainQueryConfig();

    if (options?.method && options.method !== 'GET') {
        queryConfig.method = options.method
    }

    if (options?.body) {
        queryConfig.body = JSON.stringify(options.body)
    }

    if (options?.queryParams) {
        requestUrl += (url.indexOf('?') === -1 ? '?' : '&') + getQueryParams(options.queryParams)
    }

    return await fetch(requestUrl, queryConfig).then(response => response.json())
}