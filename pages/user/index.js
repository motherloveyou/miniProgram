import { showModal } from "../../utils/wxAsync.js"
Page({
    data: {
        userInfo: {},
        collectNum: 0
    },
    onShow: function() {
        const userInfo = wx.getStorageSync("userInfo");
        const collect = wx.getStorageSync("collect");
        this.setData({ userInfo, collectNum: collect.length })
    },
    login: function(e) {
        const { userInfo } = e.detail;
        wx.setStorageSync("userInfo", userInfo);
        this.setData({ userInfo })
    },
    logout: async function() {
        const res = await showModal("确定退出吗？")
        if (res.confirm) {
            wx.removeStorageSync("userInfo");
            this.setData({ userInfo: {} })
        }
    }
})