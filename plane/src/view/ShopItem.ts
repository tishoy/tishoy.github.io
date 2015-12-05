/**
 * Created by tishoy on 15/2/9.
 */
class ShopItem extends egret.Sprite{
    private _id:number;
    private _itemName:ETextField;
    private buyWeaponBtn:EButton;

    constructor () {
        super();
        this._itemName = new ETextField();
        this.initView();
    }

    private initView():void{
        this._itemName.scaleX = this._itemName.scaleY = 4;
        this.addChild(this._itemName);

        this.buyWeaponBtn = new EButton(this, "startBtn");
        this.buyWeaponBtn.width = (480 - this.buyWeaponBtn.width) << 1;
        this.buyWeaponBtn.y = 400;
        this.addChild(this.buyWeaponBtn);
        this.buyWeaponBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyWeapon, this);

    }

    private buyWeapon():void {
        GameController.getInstance().buyWeapon(this._id);
    }

    private updateView():void {

    }

    set name(value:string) {
        this._itemName.text = value;
        this.updateView();
    }

    set id(value:number) {
        this._id = value;
    }
}