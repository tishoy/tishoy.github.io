/**
  * 加载类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 加载主游戏资源
  */
var LoadingPanel = (function (_super) {
    __extends(LoadingPanel, _super);
    function LoadingPanel() {
        _super.call(this);
        this.bg = new egret.Sprite();
        this.w = 0;
        this.h = 0;
        this.mySheet = RES.getRes("load");
        this.createView();
    }
    var __egretProto__ = LoadingPanel.prototype;
    __egretProto__.createView = function () {
        this.w = egret.MainContext.instance.stage.stageWidth;
        this.h = egret.MainContext.instance.stage.stageHeight;
        this.bg.graphics.beginFill(0x313131, 1);
        this.bg.graphics.drawRect(0, 0, this.w, this.h);
        this.bg.graphics.endFill();
        this.bg.width = this.w;
        this.bg.height = this.h;
        this.addChild(this.bg);
        this.touchEnabled = true;
        this.pgBg = new egret.Bitmap;
        this.pgBg.anchorX = 0.5;
        this.pgBg.anchorY = 0.5;
        this.pgBg.texture = this.mySheet.getTexture("pgBg");
        this.pgBg.x = this.w / 2;
        this.pgBg.y = this.h / 2;
        this.addChild(this.pgBg);
        this.pgBar = new egret.Bitmap;
        this.pgBar.anchorX = 0.5;
        this.pgBar.anchorY = 0.5;
        this.pgBar.texture = this.mySheet.getTexture("pgBar");
        this.pgBar.x = this.w / 2 - 34;
        this.pgBar.y = this.h / 2;
        this.addChild(this.pgBar);
        this.textField = new egret.TextField();
        this.textField.size = 24;
        this.textField.textColor = 0xFFFFFF;
        this.textField.bold = true;
        this.textField.stroke = 1;
        this.textField.strokeColor = 0x000000;
        this.addChild(this.textField);
        this.textField.width = 100;
        this.textField.x = this.w / 2 - this.textField.width / 2;
        this.textField.y = this.h / 2 - this.textField.height / 2 - 10;
        this.textField.textAlign = "center";
        this.textField.text = "0%";
    };
    __egretProto__.setProgress = function (current, total) {
        var rate = Math.round((current / total) * 100);
        this.textField.text = rate + "%";
        this.pgBar.width = 282 * (current / total);
    };
    return LoadingPanel;
})(egret.Sprite);
LoadingPanel.prototype.__class__ = "LoadingPanel";
