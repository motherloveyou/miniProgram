export const request = (url, data) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `https://api-hmugo-web.itheima.net/api/public/v1${url}`,
            data: data,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject(err)
            }
        })
    })
}