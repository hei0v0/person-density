/*
* 生成唯一 id 标识
*/
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0
        // eslint-disable-next-line
        let v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    });
}

export const debounce = (fn, delay = 1000) => {
    let timer;
    return function () {
        const context = this
        const args = arguments
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}