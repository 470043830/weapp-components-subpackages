import {
    promisifyAll,
    promisify
} from 'miniprogram-api-promise';
const openIdUrl = require('./config').openIdUrl;

const wxp = {};
// promisify all wx's api
promisifyAll(wx, wxp);
console.log('wxp.getSystemInfoSync:', wxp.getSystemInfoSync());

App({
    onLaunch: function (opts) {
        console.log('App Launch', opts);
    },
    onShow: function (opts) {
        console.log('App Show', opts);

        setTimeout(() => {
            // this.getUserOpenId();
            this.getUserOpenIdBySelf();
            var appInstance = getApp();
            console.log('app, appInstance: ', appInstance);
        }, 100);

        let extraData = opts.referrerInfo.extraData;
        if (extraData && extraData.albumId){
            wx.showModal({
                title: '成功拿到相册ID',
                content: 'albumId: ' + extraData.albumId
            });
        }

        // let number = '17121212121';
        // if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(number))) {
        //     wx.showToast({
        //         title: '手机号码有误',
        //         duration: 2000,
        //         icon: 'none'
        //     });
        // }

        // if(/^[0-9]*$/.test(number)){
        //     console.log('is number')
        // }else{
        //     console.log('is not number')
        // }
        13202020101

    },
    onHide: function () {
        console.log('App Hide');
    },
    globalData: {
        hasLogin: false,
        openid: null
    },

    // lazy loading openid
    async getUserOpenId() {

        if (!this.globalData.openid) {
            let code = (await wxp.login()).code;
            console.log('code:', code);

            let [error, res] = await wxp.request({
                url: openIdUrl,
                data: {
                    code: code,
                    // openid2: 'openid2222222222222'
                },
            }).then(res => [null, res]).catch(error => [error]);
            // console.log('ret data:', ret.data);
            if (error) {
                console.log("error: ", error);
                wx.showModal({
                    title: 'error 提示',
                    content: error
                });
            }
            if (res) {
                console.log("res: ", res.data);
                this.globalData.openid = res.data.openid;
                wx.showModal({
                    title: 'ok提示',
                    content: JSON.stringify(res.data)
                });
            }
        }
    },



    async getUserOpenIdBySelf() {
        let appid = 'wxf6bead0c8dbc449e';
        let secret = '45a20443dd7c07d10ae81693add61bd2';

        if (!this.globalData.openid) {
            let code = (await wxp.login()).code;
            console.log('code:', code);

            let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`;
            let [error, res] = await wxp.request({
                url: url
            }).then(res => [null, res]).catch(error => [error]);
            // console.log('ret data:', ret.data);
            if (error) {
                console.log("error: ", error);
                wx.showModal({
                    title: 'error 提示',
                    content: error
                });
            }
            if (res) {

                this.globalData.openid = res.data.openid;
                console.log("res: ", res.data, this.globalData.openid);
                // wx.showModal({
                //     title: 'ok提示',
                //     content: JSON.stringify(res.data)
                // });
            }
        }
    }
});
