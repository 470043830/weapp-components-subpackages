var types = ['default', 'primary', 'warn'];
var pageObject = {
    data: {
        defaultSize: 'default',
        primarySize: 'default',
        warnSize: 'default',
        disabled: false,
        plain: false,
        loading: false
    },
    onShow: function (option) {
        // 生命周期函数--监听页面显示
        console.log("button onShow: ", option);
    },

    setDisabled: function (e) {
        this.setData({
            disabled: !this.data.disabled
        });
    },
    setPlain: function (e) {
        this.setData({
            plain: !this.data.plain
        });
    },
    setLoading: function (e) {
        this.setData({
            loading: !this.data.loading
        });
    },

    jumpToAppid() {
        let liutaodeapp = 'wxf6bead0c8dbc449e';
        let smdapp = 'wxdff95a1b846987ba';
        let shangquanapp = 'wxd69022d502cadf17';
        let openid = getApp().globalData.openid;

        var appInstance = getApp();
        console.log('appInstance: ', appInstance);
        console.log('jumpToAppid: ', openid);

        if (!openid){
            return;
        }

        wx.navigateToMiniProgram({
            appId: shangquanapp,
            path: '/pages/index/index?openid=' + openid,
            extraData: {
                openid: openid
            },
            envVersion: 'develop', //'trial', //
            success(res) {
                // 打开成功
            }
        });
    }
};

for (var i = 0; i < types.length; ++i) {
    (function (type) {
        pageObject[type] = function (e) {
            var key = type + 'Size';
            var changedData = {};
            changedData[key] =
                this.data[key] === 'default' ? 'mini' : 'default';
            this.setData(changedData);
        };
    })(types[i]);
}

Page(pageObject);
