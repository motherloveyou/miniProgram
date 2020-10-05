import { request } from "../../utils/request.js"
Page({
    data: {
        tabs: [{
            id: 1,
            name: '综合',
            isActive: true
        }, {
            id: 2,
            name: '销量',
            isActive: false
        }, {
            id: 3,
            name: '价格',
            isActive: false
        }],
        goods: {},
        total: 0,
        initPagesize: 10,
        initPagenum: 1,
        params: {},
        tipText: 'loading···'
    },
    onLoad: async function(options) {
        options.pagesize = this.data.initPagesize;
        options.pagenum = this.data.initPagenum;
        this.setData({
            params: options
        })
        const res = await request('/goods/search', this.data.params);
        this.setData({
            goods: res.data.message.goods,
            total: res.data.message.total
        });
    },
    onReachBottom: async function() {
        var { params } = this.data;
        if (params.pagenum * params.pagesize >= this.data.total) {
            this.setData({
                tipText: '客官，没有更多了'
            })
            return
        }
        params.pagenum++;
        this.setData({
            params
        })
        const res = await request('/goods/search', this.data.params);
        let newData = this.data.goods.concat(res.data.message.goods);
        this.setData({
            goods: newData
        });
    },
    onPullDownRefresh: async function() {
        var { params } = this.data;
        if ((params.pagenum + 1) * params.pagesize >= this.data.total) {
            this.setData({
                tipText: '客官，没有更多了'
            });
        }
        if (params.pagenum * params.pagesize >= this.data.total) {
            params.pagenum = 1;
            this.setData({
                tipText: 'loading···'
            });
        } else
            params.pagenum++;
        this.setData({
            params
        })
        const res = await request('/goods/search', this.data.params);
        this.setData({
            goods: res.data.message.goods
        })
        wx.stopPullDownRefresh();
    },
    toggle: function(e) {
        const { index } = e.detail;
        let tabs = this.data.tabs;
        tabs.forEach((item, i) => i == index ? item.isActive = true : item.isActive = false);
        this.setData({ tabs });
    }
})