/**
 * Created by tishoy on 15/1/31.
 * 玩家武器装备道具
 */
class WeaponData extends egret.EventDispatcher {
    private static instance: WeaponData;

    radar: number = 0;
    fireBoom:number = 0;
    angryBird:number = 0;
    scud:number = 0;

    constructor() {
        super();
        if (WeaponData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): WeaponData {
        if (!this.instance) {
            this.instance = new WeaponData();
        }
        return this.instance;
    }

    initialize(): void {
        this.radar = 0;
        this.fireBoom = 0;
        this.angryBird = 0;
        this.scud = 0;
    }

    updateWeaponQuantity():void{

    }

    checkWeaponQuantity(weapon:number):boolean{
        switch (weapon) {
            case WeaponEnum.radarID:
                if(this.radar == 0){
                    //打开商店面板 派发事件到游戏面板
                    Global.confirm("军火不足", "您没有足够的雷达，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;

            case WeaponEnum.fireBoomID:
                if(this.fireBoom == 0){
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的燃烧弹，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;

            case WeaponEnum.angryBirdID:
                if(this.angryBird == 0){
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的愤怒的小鸟，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;

            case WeaponEnum.scudID:
                if(this.scud == 0){
                    //打开商店面板
                    Global.confirm("军火不足", "您没有足够的飞毛腿，是否前往商店购买", null, this.openShopPanel);
                    return false;
                }
                return true;
        }
    }

    openShopPanel():void {
        Global.dispatchEvent(MainNotify.openShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
    }
}