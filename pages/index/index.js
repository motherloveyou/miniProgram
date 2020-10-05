import { request } from "../../utils/request.js"
Page({
    data: {
        swiperList: [],
        navList: [],
        floorList: [],
        modifyURL: ''
    },
    onLoad: async function() {
        const resSwiperdata = await request('/home/swiperdata')
        this.setData({ swiperList: resSwiperdata.data.message })

        const resCatitems = await request('/home/catitems')
        this.setData({ navList: resCatitems.data.message })

        const resFloordata = await request('/home/floordata')
        this.setData({ floorList: resFloordata.data.message })
    },
    modify: function(e) {
        var { url } = e.currentTarget.dataset;

        url = url.split('?')[0] + '/index?' + url.split('?')[1];
        this.setData({ modifyURL: url })
    }
})