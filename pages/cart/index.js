import { chooseAddress, showModal, showToast } from "../../utils/wxAsync.js"
Page({
    data: {
        address: {},
        goods: [],
        total: 0,
        num: 0,
        allSelect: false,
        selectText: '全选'
    },
    // 计算总价、总数的函数
    setCart: function(goods, allSelect, selectText) {
        let selectedNum = 0;
        let num = 0;
        let total = 0;
        goods && goods.forEach(item => {
            if (item.isSelected) {
                selectedNum++;
                num += item.num;
                total += item.num * item.goods_price;
            }
        })
        if (selectedNum === goods.length) {
            allSelect = true;
            selectText = "取消全选";
        } else {
            allSelect = false;
            selectText = "全选";
        }
        this.setData({
            goods,
            allSelect,
            selectText,
            num,
            total
        });
        wx.setStorageSync("cart", goods);
    },
    onShow: function() {
        const goods = wx.getStorageSync("cart");
        let { allSelect, selectText } = this.data;
        this.setCart(goods, allSelect, selectText)
    },
    getAddress: async function() {
        const address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        this.setData({
            address
        })
        wx.setStorageSync("address", address);
    },
    toSelect: function(e) {
        const { index } = e.currentTarget.dataset;
        let { goods, allSelect, selectText } = this.data;
        goods[index].isSelected = !goods[index].isSelected;
        this.setCart(goods, allSelect, selectText)
    },
    allSelect: function() {
        let { goods, allSelect, selectText } = this.data;
        allSelect = !allSelect;
        selectText = allSelect ? "取消全选" : "全选";
        let num = 0;
        let total = 0;
        goods.forEach(item => {
            item.isSelected = allSelect;
            if (item.isSelected) {
                num += item.num;
                total += item.num * item.goods_price;
            }
        });
        this.setData({
            goods,
            allSelect,
            selectText,
            num,
            total
        })
        wx.setStorageSync("cart", goods);
    },
    add: function(e) {
        const { index } = e.currentTarget.dataset;
        let { goods, allSelect, selectText } = this.data;
        goods[index].num++;
        this.setCart(goods, allSelect, selectText)
    },
    suntract: async function(e) {
        const { index } = e.currentTarget.dataset;
        let { goods, allSelect, selectText } = this.data;
        if (goods[index].num === 1) {
            const res = await showModal("确认将这个宝贝删除？")
            if (res.confirm) {
                goods.splice(index, 1)
            }
        } else
            goods[index].num--;
        this.setCart(goods, allSelect, selectText)
    },
    pay: async function() {
        let { address, num } = this.data;
        if (!address.userName) {
            await showToast("请添加收货地址")
            return
        }
        if (num === 0) {
            await showToast("您还没有选中任何宝贝")
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index',
        });
    }
})