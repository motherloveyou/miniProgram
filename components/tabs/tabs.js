Component({
    data: {},
    properties: {
        tabs: {
            type: Array,
            value: []
        }
    },
    methods: {
        toggle: function(e) {
            const { index } = e.currentTarget.dataset;
            this.triggerEvent("tabsChange", { index })
        }
    }
})