/**
 * Created by tishoy on 15/1/31.
 * 主界面每个格子
 */
class GridView extends egret.Sprite{
    private _selected:boolean;
    private _statu: boolean;  //0为关闭，1为打开
    private type:number;
    view: egret.Bitmap;
    sheet:egret.SpriteSheet;
    row;
    column;
    gamePanel:GamePanel;

    constructor() {
        super();
        this.init();
    }

    init() {
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
    }

    updateView() {
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
        } else if (this.selected) {
            this.view.texture = this.sheet.getTexture("select");
            EffectUtils.blinkEffect(this.view);
        } else {
            this.view.texture = null;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    }

    private onReset(e: GameEvent): void {
        if (e.type == GameEvent.GAME_RESET) {
            this.setStatu(false);
        }
    }

    private onEnd(e: GameEvent): void {
        TipsManager.removeTips(this);
        if (e.type == GameEvent.GAME_VICTORY) {
            this.setStatu(true);
        } else if (e.type == GameEvent.GAME_LOST){

        }
    }

    private onTouch(e: egret.TouchEvent): void {
        if (!this._selected) {
            this.selected = true;
            if (PanelManager.gamePanel.selectedGrid) {
                PanelManager.gamePanel.selectedGrid.selected = false;
                PanelManager.gamePanel.selectedGrid = this;
            } else {
                PanelManager.gamePanel.selectedGrid = this;
            }
        } else {
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
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
        this.updateView();
    }

    get statu(): boolean {
        return this._statu;
    }

    setStatu(value: boolean, weaponTrigger:boolean = false) {
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
    }
} 