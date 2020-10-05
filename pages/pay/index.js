import { chooseAddress, showModal, showToast } from "../../utils/wxAsync.js"
Page({
    data: {
        address: {},
        goods: [],
        total: 0
    },
    onShow: function() {
        const goods = wx.getStorageSync("cart");
        const address = wx.getStorageSync("address");
        let newGoods = goods.filter(item => item.isSelected)
        let total = 0;
        newGoods.forEach(item => {
            total += item.num * item.goods_price;
        })
        this.setData({
            goods: newGoods,
            total,
            address
        });
    },
    pay: function() {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return
        }
        wx.showActionSheet({
            itemList: ['确认支付'],
            success: async(res) => {
                if (res.tapIndex == 0) {
                    await showToast("支付成功")
                    const goods = wx.getStorageSync("cart");
                    let newGoods = goods.filter(item => !item.isSelected)
                    wx.setStorageSync("cart", newGoods);
                    setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index'
                        });
                    }, 500)
                } else
                    await showToast("支付失败")
            }
        })

    }
})