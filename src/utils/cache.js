// 设置缓存
export const setCache = (key, value) => {
    let content = value
    if (typeof value == 'object') {
        content = JSON.stringify(value)
    }
    localStorage.setItem(key, content)
}

// 读取缓存
export const getCache = (key) => {
    let content = localStorage.getItem(key)
    if (typeof content == 'object')
        return content
    if (content) {
        return JSON.parse(content)
    }
    return null
}