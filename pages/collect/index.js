Page({
    data: {
        tabs: [{
            id: 1,
            name: '商品收藏',
            isActive: true
        }, {
            id: 2,
            name: '品牌收藏',
            isActive: false
        }, {
            id: 3,
            name: '店铺收藏',
            isActive: false
        }, {
            id: 4,
            name: '浏览足迹',
            isActive: false
        }],
        goods: []
    },
    toggle: function(e) {
        const { index } = e.detail;
        let tabs = this.data.tabs;
        tabs.forEach((item, i) => i == index ? item.isActive = true : item.isActive = false);
        this.setData({ tabs });
    },
    onLoad: function() {
        const collect = wx.getStorageSync("collect") || [];
        this.setData({ goods: collect })
    }
})