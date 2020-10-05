import { request } from "../../utils/request.js"
Page({
    data: {
        goods: {},
        isCollect: false
    },
    onLoad: async function(options) {
        const res = await request('/goods/detail', options);
        const goods = res.data.message;
        this.setData({
            goods: {
                pics: goods.pics,
                goods_price: goods.goods_price,
                goods_name: goods.goods_name,
                goods_introduce: goods.goods_introduce.replace(/\.webp/g, '.jpg'),
                goods_id: goods.goods_id
            }
        })
        let collect = wx.getStorageSync("collect") || [];
        let isCollect = collect.some(item => item.goods_id === this.data.goods.goods_id);
        this.setData({ isCollect })
    },
    // 图片预览
    previewImage: function(e) {
        const { index } = e.currentTarget.dataset;
        const urls = this.data.goods.pics.map(item => item.pics_mid);
        wx.previewImage({
            urls,
            current: urls[index]
        })
    },
    // 加入购物车
    addCart: function() {
        console.log(11);
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(item => item.goods_id === this.data.goods.goods_id);
        if (index === -1) {
            this.data.goods.num = 1;
            this.data.goods.isSelected = false;
            cart.push(this.data.goods);
        } else {
            cart[index].num++;
            cart[index].isSelected = false;
        }
        wx.setStorageSync("cart", cart);
        wx.showToast({
            title: '添加成功，在购物车等亲',
            icon: 'success',
            mask: true
        })
    },
    // 收藏
    collect: function() {
        console.log('collect');
        let { isCollect } = this.data;
        let collect = wx.getStorageSync("collect") || [];
        if (!isCollect) {
            collect.push(this.data.goods);
            this.setData({ isCollect: true })
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true
            });
        } else {
            let index = collect.findIndex(item => item.goods_id === this.data.goods.goods_id);
            collect.splice(index, 1);
            this.setData({ isCollect: false })
            wx.showToast({
                title: '取消收藏成功',
                icon: 'success',
                mask: true
            });
        }
        wx.setStorageSync("collect", collect);
    }
})