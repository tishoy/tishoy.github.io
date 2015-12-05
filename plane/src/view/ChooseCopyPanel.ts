/**
 * Created by tishoy on 15/1/31.
 * 副本选关界面
 */
class ChooseCopyPanel extends BasePanel{
    private bg:egret.Bitmap;
    private _selectedCopy:number;
    private copyList:any[];

    private isDrag:boolean;
    private dragPoint:egret.Point = new egret.Point();
    private startPoint: egret.Point;
    private mapDragBounds: egret.Rectangle = new egret.Rectangle();
    private container:egret.Sprite;

    constructor(){
        super();
    }

    public initPanel(): void {
        this.container = new egret.Sprite();
        this.container.x = 0;
        this.container.y = 0;
        this.addChild(this.container);

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
//        this.addChild(this.bg);
        this.bg.touchEnabled = true;
        this.container.addChild(this.bg);
        this.container.scaleY = 2;
        this.container.y = -800;
        this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onScrollStart, this);

        var startBtn:EButton;
        var copyList:any[] = CopyData.getInstance().copyList;
        for (var i = 0; i < copyList.length; i++) {
            startBtn = new EButton(this, "startBtn");
            startBtn.x = this.w / 2 - startBtn.width/2;
            startBtn.y = i * 100;
            startBtn.name = i.toString();
            startBtn.scaleY = 0.5;
            this.container.addChild(startBtn);
            startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartCopy, this);
        }

        this.initEffect();
    }

    private onScrollStart(e: egret.TouchEvent): void {
        this.isDrag = false;
        this.dragPoint.x = e.stageX;
        this.dragPoint.y = e.stageY;
        this.startPoint = new egret.Point(this.dragPoint.x - this.container.x, this.dragPoint.y - this.container.y);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onScroll, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onScrollEnd, this);
    }

    private onScroll(e: egret.TouchEvent): void {
        this.container.x = e.stageX - this.startPoint.x;
        this.container.y = e.stageY - this.startPoint.y;
        this.checkBounds();
    }


    private checkBounds(): void
    {
        this.mapDragBounds.x = this.w - this.bg.width * this.container.scaleX;
        this.mapDragBounds.y = this.h - this.bg.height * this.container.scaleY;
        this.mapDragBounds.width = this.bg.width * this.container.scaleX - this.w;
        this.mapDragBounds.height = this.bg.height * this.container.scaleY - this.h;

        if (this.container.x > this.mapDragBounds.right) {
            this.container.x = this.mapDragBounds.right;
        }
        else if (this.container.x < this.mapDragBounds.x) {
            this.container.x = this.mapDragBounds.x;
        }
        if (this.container.y > this.mapDragBounds.bottom) {
            this.container.y = this.mapDragBounds.bottom;
        }
        else if (this.container.y < this.mapDragBounds.y) {
            this.container.y = this.mapDragBounds.y;
        }
    }

    private onScrollEnd(e: egret.TouchEvent): void {
        if (this.stage) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onScroll, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onScrollEnd, this);
        }
        if (this.dragPoint && e) {
            this.isDrag = Math.abs(e.stageX - this.dragPoint.x) + Math.abs(e.stageY - this.dragPoint.y) > 50;
        }
        this.startPoint = null;
    }

    private initEffect():void{
        //this.startBtn.alpha = 0;
        //var onComplete:Function = function(){
        //    egret.Tween.get(this.startBtn).to({ alpha: 1 }, 300);
        //};
        //this.startBtn.visible = true;
        //egret.Tween.get(this.bg).to({y:0},600,egret.Ease.backOut).call(onComplete,this);
    }

    onStartCopy(e: egret.TouchEvent): void{
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeChooseCopyPanelNotify, null, false);
        var copy:number = e.target.name;
        GameController.getInstance().startCopy(copy);
    }

}

