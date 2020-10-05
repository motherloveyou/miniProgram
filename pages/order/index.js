import { request } from "../../utils/request.js"
Page({
    data: {
        tabs: [{
            id: 1,
            name: '全部',
            isActive: true
        }, {
            id: 2,
            name: '待付款',
            isActive: false
        }, {
            id: 3,
            name: '待收货',
            isActive: false
        }, {
            id: 4,
            name: '退款退货',
            isActive: false
        }],
        orders: []
    },
    changeTitle: function(index) {
        let tabs = this.data.tabs;
        tabs.forEach((item, i) => i == index ? item.isActive = true : item.isActive = false);
        this.setData({ tabs });
    },
    toggle: function(e) {
        const { index } = e.detail;
        const token = wx.getStorageSync("token");
        this.changeTitle(index)
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all',
            data: {
                type: index + 1
            },
            header: { Authorization: token },
            success: (result) => {
                this.setData({
                    orders: result.data.message.orders.map(item => ({...item, formatTime: new Date(item.create_time * 1000).toLocaleString() }))
                })
            }
        });
    },
    onLoad: function(options, e) {
        const { type } = options;
        this.changeTitle(type - 1);
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
        }
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all',
            data: {
                type: type
            },
            header: { Authorization: token },
            success: (result) => {
                this.setData({
                    orders: result.data.message.orders.map(item => ({...item, formatTime: new Date(item.create_time * 1000).toLocaleString() }))
                })
            }
        });
    }
})