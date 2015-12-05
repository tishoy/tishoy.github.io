/**
 * Created by tishoy on 15/1/31.
 * SDK界面
 */
var JsSdkPanel = (function (_super) {
    __extends(JsSdkPanel, _super);
    function JsSdkPanel() {
        _super.call(this);
    }
    var __egretProto__ = JsSdkPanel.prototype;
    // 初始化面板
    __egretProto__.initPanel = function () {
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.startBtn = new EButton(this, "startBtn", this.onStartBtnTouchTap);
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.h / 2 - this.startBtn.height / 2;
        this.addChild(this.startBtn);
        this.setBtn = new EButton(this, "setBtn", this.tipsEffect4, "设置", 30, 1);
        this.setBtn.x = this.w - this.setBtn.width - 20;
        this.setBtn.y = this.h - this.setBtn.height - 20;
        this.addChild(this.setBtn);
        this.setBtn2 = new EButton(this, "setBtn", this.tipsEffect2, "JS", 30, 1);
        this.setBtn2.x = 10;
        this.setBtn2.y = this.h - this.setBtn2.height - 20;
        this.addChild(this.setBtn2);
        this.setBtn3 = new EButton(this, "setBtn", this.uploadImage, "JS", 30, 1);
        this.setBtn3.x = 200;
        this.setBtn3.y = this.h - this.setBtn3.height - 20;
        this.addChild(this.setBtn3);
    };
    __egretProto__.onStartBtnTouchTap = function (e) {
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeJsSdkPanelNotify, null, false);
    };
    __egretProto__.tipsEffect4 = function (e) {
        var bodyConfig = new BodyConfig;
        bodyConfig.appId = "wx602fb015fb1880a8";
        bodyConfig.debug = true;
        /// ... 其他的配置属性赋值
        /// 通过config接口注入权限验证配置
        wx.config(bodyConfig);
        wx.ready(function () {
            /// 在这里调用微信相关功能的 API
            alert("验证通过");
        });
    };
    __egretProto__.tipsEffect2 = function (e) {
        var checkConfig = new BodyCheckJsAPISupport;
        checkConfig.success = this.tipsEffectSuccess;
        checkConfig.jsApiList = ['chooseImage'];
        wx.checkJsApi(checkConfig);
    };
    __egretProto__.tipsEffectSuccess = function (e) {
        console.log("success");
    };
    __egretProto__.uploadImage = function () {
        wx.chooseImage({
            "success": function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            }
        });
    };
    return JsSdkPanel;
})(BasePanel);
JsSdkPanel.prototype.__class__ = "JsSdkPanel";
