import { login } from "../../utils/wxAsync.js"
Page({
    getUserInfo: async function(e) {
        const { encryptedData, rawData, iv, signature } = e.detail;
        const res = await login();
        const { code } = res;
        const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo';
        wx.setStorageSync("token", token);
        wx.navigateBack({
            delta: 1
        });
    }
})