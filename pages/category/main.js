import { request } from "../../utils/request.js"
Page({
    data: {
        currentIndex: 0,
        categories: []
    },
    change: function(e) {
        let { index } = e.currentTarget.dataset;
        this.setData({ currentIndex: index })
    },
    onLoad: async function(options) {
        const res = await request('/categories');
        this.setData({ categories: res.data.message });
    }
})