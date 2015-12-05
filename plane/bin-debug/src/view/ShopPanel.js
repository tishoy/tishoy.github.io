/**
 * Created by tishoy on 15/2/7.
 * 商城界面
 */
var ShopPanel = (function (_super) {
    __extends(ShopPanel, _super);
    function ShopPanel() {
        _super.call(this);
    }
    var __egretProto__ = ShopPanel.prototype;
    __egretProto__.initPanel = function () {
        this.selectWeapon = WeaponEnum.radarID;
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);
        this.closeBtn = new EButton(this, "cancelBtn");
        this.closeBtn.x = this.w - this.closeBtn.width;
        this.closeBtn.y = 0;
        this.addChild(this.closeBtn);
        this.closeBtn.visible = true;
        this.closeBtn.touchEnabled = true;
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameCancelTouchTap, this);
        this.itemList = [];
        this.swipePane = new egret.HSwipePane();
        this.swipePane.x = 0;
        this.swipePane.y = 300;
        this.swipePane.space = 480;
        this.swipePane.touchEnabled = true;
        this.swipePane.lockToPage = true;
        this.swipePane.pageSize = new egret.Point(480, 600);
        this.addChild(this.swipePane);
        this.updateView();
        //this.addEventListener(egret.Event.ADDED_TO_STAGE, this.updateView, this);
    };
    __egretProto__.updateView = function () {
        var shopItem;
        var shopList = RES.getRes("shop");
        for (var i = 0; i < shopList.length; i++) {
            shopItem = new ShopItem();
            shopItem.id = shopList[i].id;
            shopItem.name = shopList[i].name;
            this.itemList.push(shopItem);
        }
        this.swipePane.itemList = this.itemList;
    };
    __egretProto__.onGameCancelTouchTap = function (e) {
        Global.confirm("", "返回继续游戏？", this.closePanel, this.backToGame, 1);
    };
    __egretProto__.backToGame = function () {
        Global.dispatchEvent(MainNotify.closeShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
    };
    return ShopPanel;
})(BasePanel);
ShopPanel.prototype.__class__ = "ShopPanel";
