/**
 * Created by tishoy on 15/1/31.
 * 游戏主界面
 */
class GamePanel extends BasePanel{
    selectedGrid:GridView;
    selectedWeapon:number;

    private gameData:GameData;
    private map:egret.Bitmap;
    private bg:egret.Bitmap;
    private mapName: ETextField;
    private headTimesLabel: ETextField;
    private headNum: egret.BitmapText;
    private bodyTimesLabel: ETextField;
    private bodyNum: egret.BitmapText;
    private hitTimesLabel: ETextField;
    private hitNum: egret.BitmapText;
    private lastStepLabel: ETextField;
    private lastStepNum: egret.BitmapText;
    private radarButton:EToggleButton;
    private radarSwitch:EToggleSwitch;
    private fireButton:EToggleButton;
    private birdButton:EToggleButton;
    private gameCancel: EButton;
    private shopBtn:EButton;

    constructor(){
        super();
    }

    // 初始化面板
    initPanel():void{
        this.gameData = GameData.getInstance();

        this.bg = new egret.Bitmap();
        this.bg.texture = this.assets.getTexture("bg");
        this.addChild(this.bg);   
        this.bg.touchEnabled = true;

        this.map = new egret.Bitmap(RES.getRes("mapView").getTexture("grid"));
        this.map.x = 0;
        this.addChild(this.map);

        var grid: GridView;
        for (var i = 0; i < 81; i++) {
            grid = new GridView();
            grid.column = i % 9;
            grid.row = Math.floor(i / 9);
            grid.x = 10 + grid.column * 50;
            grid.y = 315 + grid.row * 50;
            grid.name = "grid" + i;
            this.addChildAt(grid,this.getChildIndex	(this.map) + 1);
        }

        this.mapName = new ETextField();
        this.mapName.bold = true;
        this.mapName.strokeColor = 0xFFFFFF;
        this.mapName.stroke = 1;
        this.mapName.width = 370;
        this.mapName.x = 100;
        this.mapName.y = 30;
        this.mapName.visible = false;
        this.addChild(this.mapName);

        this.headTimesLabel = new ETextField();
        this.headTimesLabel.bold = true;
        this.headTimesLabel.strokeColor = 0x000000;
        this.headTimesLabel.stroke = 1;
        this.headTimesLabel.width = 370;
        this.headTimesLabel.setText("爆头次数");
        this.headTimesLabel.x = 38;
        this.headTimesLabel.y = 140;
        this.headTimesLabel.visible = false;
        this.addChild(this.headTimesLabel);

        //this.headNum = new egret.BitmapText();
        ////this.headNum.font = RES.getRes("font_json");
        //this.headNum.x = 178;
        //this.headNum.y = 131;
        //this.headNum.visible = false;
        //this.addChild(this.headNum);

        this.bodyTimesLabel = new ETextField();
        this.bodyTimesLabel.bold = true;
        this.bodyTimesLabel.strokeColor = 0x000000;
        this.bodyTimesLabel.stroke = 1;
        this.bodyTimesLabel.width = 370;
        this.bodyTimesLabel.setText("击中次数");
        this.bodyTimesLabel.x = 220;
        this.bodyTimesLabel.y = 140;
        this.bodyTimesLabel.visible = false;
        this.addChild(this.bodyTimesLabel);

        this.gameCancel = new EButton(this,"cancelBtn");
        this.gameCancel.x = this.w - this.gameCancel.width;
        this.gameCancel.y = 0;
        this.addChild(this.gameCancel);
        this.gameCancel.visible = true;
        this.gameCancel.touchEnabled = true;
        this.gameCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameCancelTouchTap, this);

        this.shopBtn = new EButton(this,"shopBtn");
        this.shopBtn.x = this.w - this.gameCancel.width - this.shopBtn.width;
        this.shopBtn.y = 0;
        this.addChild(this.shopBtn);
        this.shopBtn.visible = true;
        this.shopBtn.touchEnabled = true;
        this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShopBtnTouchTap, this);

        //武器按钮们
        //this.radarButton = new EToggleButton(this, "", "");
        this.radarSwitch = new EToggleSwitch(this, "switchOff", "switchOn", "switchBar", this.onSwitch);
        this.radarSwitch.x = 360;
        this.radarSwitch.y = 240;
        this.addChild(this.radarSwitch);

        var textRadar:ETextField = new ETextField();
        textRadar.text = "使用道具";
        textRadar.x = 240;
        textRadar.y = 240;
        this.addChild(textRadar);

        //记分板积分
        //this.bodyNum = new egret.BitmapText();
        ////this.bodyNum.font = new egret.BitmapFont(RES.getRes("font_json"), );
        //this.bodyNum.x = 360;
        //this.bodyNum.y = 131;
        //this.bodyNum.visible = false;
        //this.addChild(this.bodyNum);

        this.hitTimesLabel = new ETextField();
        this.hitTimesLabel.bold = true;
        this.hitTimesLabel.strokeColor = 0x000000;
        this.hitTimesLabel.stroke = 1;
        this.hitTimesLabel.width = 370;
        this.hitTimesLabel.setText("射击次数");
        this.hitTimesLabel.x = 185;
        this.hitTimesLabel.y = 83;
        this.hitTimesLabel.visible = false;
        this.addChild(this.hitTimesLabel);

        //this.hitNum = new egret.BitmapText();
        ////this.hitNum.font = RES.getRes("font_json");
        //this.hitNum.x = 325;
        //this.hitNum.y = 74;
        //this.hitNum.visible = false;
        //this.addChild(this.hitNum);

        this.lastStepLabel = new ETextField();
        this.lastStepLabel.bold = true;
        this.lastStepLabel.strokeColor = 0x000000;
        this.lastStepLabel.stroke = 1;
        this.lastStepLabel.width = 370;
        this.lastStepLabel.setText("剩余次数");
        this.lastStepLabel.x = 120;
        this.lastStepLabel.y = 190;
        this.lastStepLabel.visible = false;
        this.addChild(this.lastStepLabel);

        //this.lastStepNum = new egret.BitmapText();
        ////this.lastStepNum.font = RES.getRes("font_json");
        //this.lastStepNum.x = 260;
        //this.lastStepNum.y = 181;
        //this.lastStepNum.visible = false;
        //this.addChild(this.lastStepNum);

        //TipsManager.addTips(this.helpBtn,"我是排行榜按钮哦！",1);
        //TipsManager.addTips(this.shopBtn,"我是商店按钮哦！",2);
        //TipsManager.addTips(this.fbBtn,"我是facebook按钮哦！",3);
        //TipsManager.addTips(this.setBtn,"我是设置按钮哦！",4);
        //this.radarButton.setSelected(false);
        //this.fireButton.setSelected(false);
        //this.birdButton.setSelected(false);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }

    private onAdded(e:egret.Event){
        this.initEffect();
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_START, this.updateHitTimes, this);
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    }

    private updateHitTimes(e: GameEvent): void {
        //this.headNum.text = this.gameData.headTimes.toString();
        //this.bodyNum.text = this.gameData.bodyTimes.toString();
        //this.hitNum.text = this.gameData.hitTimes.toString();
        if (GameData.getInstance().model == GameModelEnum.advanture) {
            this.mapName.visible = true;
            this.lastStepLabel.visible = true;
            //this.lastStepNum.visible = true;
            if (e.type == GameEvent.GAME_START) {
                this.mapName.setText("");
                EffectUtils.typerEffect(this.mapName, "地图名称：" + this.gameData.mapName);
            }
            //this.lastStepNum.text = this.gameData.lastStep.toString();
        } else {
            this.lastStepLabel.visible = false;
            this.mapName.visible = false;
            //this.lastStepNum.visible = false;
        }
    }

    private onVictory(e: GameEvent): void {
        if (this.gameData.model == GameModelEnum.common) {
            RES.getResAsync("description", this.startAnimation, this);
        } else if (this.gameData.model == GameModelEnum.advanture) {
            Global.confirm("提示", "恭喜您闯关成功,是否再来一关？", this.onNextCopyCancel, this.onNextCopyConfirm,1);
        }
    }

    private onLost(e: GameEvent):void{
        console.log("收到事件");
        Global.alert("提示", "任务失败, 请从新再来", this.onThisCopyConfirm, 2);
    }

    private onNextCopyConfirm(): void {
        CopyData.getInstance().nextCopy();
        GameController.getInstance().startCopy();
    }

    private onNextCopyCancel(): void {
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);
    }

    private startAnimation(result: Array<any>): void {
        var step = GameData.getInstance().hitTimes;
        if (step <= 10) {
            var lineArr: Array<any> = result[step];
        } else if (step < 15) {
            var lineArr: Array<any> = result[11];
        } else if (step < 20) {
            var lineArr: Array<any> = result[12];
        } else if (step < 50) {
            var lineArr: Array<any> = result[13];
        } else if (step < 81) {
            var lineArr: Array<any> = result[14];
        } else {
            var lineArr: Array<any> = result[15];
        }
        var text = lineArr[1]["text"];
        Global.alert("提示", "您使用了" + step + "步打出了所有飞机！" + "\n" + text, this.goonCommonGame, 3);
    }

    private goonCommonGame(): void {
        GameController.getInstance().commonGame();
    }

    private onThisCopyConfirm(): void {
        GameController.getInstance().startCopy();
    }

    onGameCancelTouchTap(e: egret.TouchEvent): void {
        Global.confirm("", "确定退出？", this.closePanel, this.onNextCopyCancel, 1);
    }

    onShopBtnTouchTap(e:egret.TouchEvent):void{
        Global.dispatchEvent(MainNotify.openShopPanelNotify, null, false);
        Global.dispatchEvent(MainNotify.closeGamePanelNotify, null, false);
    }

    onSwitch():void{
        if (this.radarSwitch.getSelected()) {
            this.selectedWeapon = WeaponEnum.fireBoomID;
        } else{
            this.selectedWeapon = WeaponEnum.nothingUsed;
        }
    }

    private initEffect():void{
        //this.headTimesLabel.alpha = 0;
        //this.headNum.alpha = 0;
        //this.bodyTimesLabel.alpha = 0;
        //this.bodyNum.alpha = 0;
        //this.hitTimesLabel.alpha = 0;
        //this.hitNum.alpha = 0;
        //this.lastStepLabel.alpha =0;
        //this.lastStepNum.alpha = 0;
        var onComplete:Function = function(){
            //egret.Tween.get(this.headTimesLabel).to({alpha:1},300);
            //egret.Tween.get(this.headNum).to({alpha:1},300);
            //egret.Tween.get(this.bodyTimesLabel).to({alpha:1},300);
            //egret.Tween.get(this.bodyNum).to({alpha:1},300);
            //egret.Tween.get(this.hitTimesLabel).to({alpha:1},300);
            //egret.Tween.get(this.hitNum).to({alpha:1},300);
            if (GameData.getInstance().model == GameModelEnum.advanture) {
                egret.Tween.get(this.lastStepLabel).to({alpha:1},300);
                egret.Tween.get(this.lastStepNum).to({alpha:1},300);
            }
        };
        //this.headTimesLabel.visible = true;
        //this.headNum.visible = true;
        //this.bodyTimesLabel.visible = true;
        //this.bodyNum.visible = true;
        //this.hitTimesLabel.visible = true;
        //this.hitNum.visible = true;
        //if (GameData.getInstance().model == GameModelEnum.advanture) {
        //    this.lastStepLabel.visible = true;
        //    this.lastStepNum.visible = true;
        //} else {
        //    this.lastStepLabel.visible = false;
        //    this.lastStepNum.visible = false;
        //}
        egret.Tween.get(this.map).to({y:300},600,egret.Ease.backOut).call(onComplete,this);
    }

}
