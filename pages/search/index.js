import { request } from "../../utils/request.js"
Page({
    data: {
        goods: [],
        value: ""
    },
    timerId: -1,
    inputHandle: function(e) {
        let { value } = e.detail;
        this.setData({ value })
        if (!value.trim()) {
            clearTimeout(this.timerId);
            this.setData({ goods: [] })
            return;
        }
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            this.search(value);
        }, 500)
    },
    search: async function(value) {
        const res = await request("/goods/qsearch", { query: value });
        this.setData({
            goods: res.data.message.map(item => ({...item, name: item.goods_name.split(' ')[0] }))
        })
    },
    btnSearchHandle: function() {
        wx.navigateTo({
            url: `/pages/goods_list/index?query=${this.data.value}`
        });
    }
})