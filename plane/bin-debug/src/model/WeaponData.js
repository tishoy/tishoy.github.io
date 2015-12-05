/**
 * Created by tishoy on 15/1/31.
 * 玩家武器装备道具
 */
var WeaponData = (function (_super) {
    __extends(WeaponData, _super);
    function WeaponData() {
        _super.call(this);
        this.radar = 0;
        this.fireBoom = 0;
        this.angryBird = 0;
        this.scud = 0;
        if (WeaponData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = WeaponData.prototype;
    WeaponData.getInstance = function () {
        if (!this.instance) {
            this.instance = new WeaponData();
        }
        return this.instance;
    };
    __egretProto__.initialize = function () {
        this.radar = 0;
        this.fireBoom = 0;
        this.angryBird = 0;
        this.scud = 0;
    };
    __egretProto__.updateWeaponQuantity = function () {
    };
    __egretProto__.checkWeaponQuantity = function (weapon) {
        switch (weapon) {
            case WeaponEnum.radarID:
                if (this.radar == 0) {
                    //打开商店面板 派发事件到游戏面板
                    Global.confirm("军火不足", "您没有足够的雷达，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;
            case WeaponEnum.fireBoomID:
                if (this.fireBoom == 0) {
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的燃烧弹，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;
            case WeaponEnum.angryBirdID:
                if (this.angryBird == 0) {
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的愤怒的小鸟，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;
            case WeaponEnum.scudID:
                if (this.scud == 0) {
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的飞毛腿，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;
        }
    };
    __egretProto__.openShopPanel = function () {
        Global.dispatchEvent(MainNotify.openShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
    };
    return WeaponData;
})(egret.EventDispatcher);
WeaponData.prototype.__class__ = "WeaponData";
