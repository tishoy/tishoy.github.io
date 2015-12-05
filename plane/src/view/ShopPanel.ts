/**
 * Created by tishoy on 15/2/7.
 * 商城界面
 */
class ShopPanel extends BasePanel{
    private bg:egret.Bitmap;
    private itemList: any[];
    private swipePane: egret.HSwipePane;
    private closeBtn: EButton;
    private selectWeapon:number;

    constructor() {
        super();
    }

    initPanel(): void {
        this.selectWeapon = WeaponEnum.radarID;

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);

        this.closeBtn = new EButton(this,"cancelBtn");
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
    }

    updateView(): void {
        var shopItem:ShopItem;
        var shopList:any[] = RES.getRes("shop");
        for (var i = 0; i < shopList.length; i++) {
            shopItem = new ShopItem();
            shopItem.id = shopList[i].id
            shopItem.name = shopList[i].name;
            this.itemList.push(shopItem);
        }
        this.swipePane.itemList = this.itemList;
    }

    onGameCancelTouchTap(e: egret.TouchEvent): void {
        Global.confirm("", "返回继续游戏？", this.closePanel, this.backToGame, 1);
    }

    private backToGame(): void {
        Global.dispatchEvent(MainNotify.closeShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
    }
} 