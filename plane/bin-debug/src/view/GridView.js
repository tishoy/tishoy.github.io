/**
 * Created by tishoy on 15/1/31.
 * 主界面每个格子
 */
var GridView = (function (_super) {
    __extends(GridView, _super);
    function GridView() {
        _super.call(this);
        this.init();
    }
    var __egretProto__ = GridView.prototype;
    __egretProto__.init = function () {
        this.gamePanel = PanelManager.gamePanel;
        this.touchEnabled = true;
        this.width = this.height = 48;
        this.sheet = RES.getRes("mapView");
        this.view = new egret.Bitmap();
        this.addChild(this.view);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        Global.addEventListener(GameEvent.GAME_RESET, this.onReset, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onEnd, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onEnd, this);
    };
    __egretProto__.updateView = function () {
        if (this.statu) {
            switch (this.type) {
                case GridTypeEnum.miss:
                    this.view.texture = this.sheet.getTexture("hitHole");
                    break;
                case GridTypeEnum.body:
                    this.view.texture = this.sheet.getTexture("hitBody");
                    if (GameData.getInstance().keeping) {
                        EffectUtils.shakeObj(this.view);
                    }
                    break;
                case GridTypeEnum.head:
                    this.view.texture = this.sheet.getTexture("hitHead");
                    if (GameData.getInstance().keeping) {
                        EffectUtils.shakeScreen();
                    }
                    break;
            }
        }
        else if (this.selected) {
            this.view.texture = this.sheet.getTexture("select");
            EffectUtils.blinkEffect(this.view);
        }
        else {
            this.view.texture = null;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    };
    __egretProto__.onReset = function (e) {
        if (e.type == GameEvent.GAME_RESET) {
            this.setStatu(false);
        }
    };
    __egretProto__.onEnd = function (e) {
        TipsManager.removeTips(this);
        if (e.type == GameEvent.GAME_VICTORY) {
            this.setStatu(true);
        }
        else if (e.type == GameEvent.GAME_LOST) {
        }
    };
    __egretProto__.onTouch = function (e) {
        if (!this._selected) {
            this.selected = true;
            if (PanelManager.gamePanel.selectedGrid) {
                PanelManager.gamePanel.selectedGrid.selected = false;
                PanelManager.gamePanel.selectedGrid = this;
            }
            else {
                PanelManager.gamePanel.selectedGrid = this;
            }
        }
        else {
            if (PanelManager.gamePanel.selectedGrid) {
                PanelManager.gamePanel.selectedGrid = null;
            }
            if (PanelManager.gamePanel.selectedWeapon != 0) {
                GameController.getInstance().useWeapon(this.column, this.row);
            }
            else {
                this.setStatu(true, false);
            }
        }
    };
    Object.defineProperty(__egretProto__, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this._selected = value;
            this.updateView();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "statu", {
        get: function () {
            return this._statu;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.setStatu = function (value, weaponTrigger) {
        if (weaponTrigger === void 0) { weaponTrigger = false; }
        //已经亮起的 免受道具波及
        if (value == true && this._statu == value) {
            return;
        }
        this.type = GameController.getInstance().getGridViewType(this.column, this.row, weaponTrigger);
        this._statu = value;
        if (this._selected) {
            this._selected = false;
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.updateView();
    };
    return GridView;
})(egret.Sprite);
GridView.prototype.__class__ = "GridView";
