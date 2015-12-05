/**
 * Created by tishoy on 15/2/9.
 */
var ShopItem = (function (_super) {
    __extends(ShopItem, _super);
    function ShopItem() {
        _super.call(this);
        this._itemName = new ETextField();
        this.initView();
    }
    var __egretProto__ = ShopItem.prototype;
    __egretProto__.initView = function () {
        this._itemName.scaleX = this._itemName.scaleY = 4;
        this.addChild(this._itemName);
        this.buyWeaponBtn = new EButton(this, "startBtn");
        this.buyWeaponBtn.width = (480 - this.buyWeaponBtn.width) << 1;
        this.buyWeaponBtn.y = 400;
        this.addChild(this.buyWeaponBtn);
        this.buyWeaponBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buyWeapon, this);
    };
    __egretProto__.buyWeapon = function () {
        GameController.getInstance().buyWeapon(this._id);
    };
    __egretProto__.updateView = function () {
    };
    Object.defineProperty(__egretProto__, "name", {
        set: function (value) {
            this._itemName.text = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "id", {
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShopItem;
})(egret.Sprite);
ShopItem.prototype.__class__ = "ShopItem";
