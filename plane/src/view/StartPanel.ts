/**
 * Created by tishoy on 15/1/31.
 * 游戏开始界面
 */
class StartPanel extends BasePanel{

    constructor(){
        super();
    }

    private bg:egret.Bitmap;
    private logoImg:egret.Bitmap;
    private advatureBtn:EButton;
    private startBtn:EButton;
    // 初始化面板
    public initPanel():void{
        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;

        this.logoImg = new egret.Bitmap();
        this.logoImg.texture = this.assets.getTexture("logoImg");
        this.logoImg.anchorX = 0.5;
        this.logoImg.anchorY = 1;
        this.logoImg.x = this.w/2;
        this.logoImg.y = 60 + this.logoImg.height;
        this.addChild(this.logoImg);   
        this.logoImg.visible = false;

        this.advatureBtn = new EButton(this,"startBtn");
        this.advatureBtn.x = this.w / 2 - this.advatureBtn.width/2;
        this.advatureBtn.y = this.h / 2 - this.advatureBtn.height/2 - 100;        
        this.addChild(this.advatureBtn);
        //this.advatureBtn.cooldownTime = 500;
        this.advatureBtn.visible = false;
        this.advatureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdvatureBtnTouchTap, this);

        this.startBtn = new EButton(this, "startBtn");
        this.startBtn.x = this.w / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.h / 2 - this.startBtn.height / 2 + 100;
        this.addChild(this.startBtn);
        this.startBtn.visible = false;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCommanBtnTouchTap, this);

        this.initEffect();

        /*
        SocketManager.connectServer("echo.websocket.org",80);
        var socketFun:Function = function(e){
           Global.alert("提示","数据收到了："+JSON.stringify(e.param));
        }
        Global.addEventListener("uzwan_login",socketFun,this)*/
    }

    private initEffect():void{
        this.logoImg.y = -350;
        this.startBtn.alpha = 0;
        this.advatureBtn.alpha = 0;
        var onComplete:Function = function(){
            egret.Tween.get(this.startBtn).to({ alpha: 1 }, 300);
            egret.Tween.get(this.advatureBtn).to({ alpha: 1 }, 300);
        };
        this.logoImg.visible = true;
        this.startBtn.visible = true;
        this.advatureBtn.visible = true;
        egret.Tween.get(this.logoImg).to({y:60 + this.logoImg.height},600,egret.Ease.backOut).call(onComplete,this);   
    }

    onAdvatureBtnTouchTap(e: egret.TouchEvent): void {
        Global.dispatchEvent(MainNotify.openChooseCopyPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        //GameController.getInstance().startCopy();
    }

    onCommanBtnTouchTap(e: egret.TouchEvent): void{
        Global.dispatchEvent(MainNotify.openGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeStartPanelNotify, null, false);
        GameController.getInstance().commonGame();
    }

    onShopTouchTap(e:egret.TouchEvent):void{
        Global.share();
    }

    public onSetTouchTap(e:egret.TouchEvent):void{
        SocketManager.sendMessage('{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}')
    }

}

