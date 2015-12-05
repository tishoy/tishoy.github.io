var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
  * 游戏场景类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 目前包含三层：面板层、弹窗层、特效层
  */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    //构造方法
    function GameScene() {
        _super.call(this);
        // 面板层 如 游戏开始结束界面之类的
        this.uiLayer = new egret.DisplayObjectContainer();
        // 弹窗层 如 设置之类的
        this.tipLayer = new egret.DisplayObjectContainer();
        // 特效层 如 飘字之类的
        this.effectLayer = new egret.DisplayObjectContainer();
        // 主UI层 如 底部功能栏
        this.mainUILayer = new egret.DisplayObjectContainer();
        // 通讯遮罩层 
        this.maskLayer = new egret.DisplayObjectContainer();
        // 旋转屏幕提示层 
        this.rotationTipsLayer = new egret.DisplayObjectContainer();
        this.init();
    }
    //初始化场景类
    GameScene.prototype.init = function () {
        this.addChild(this.uiLayer);
        this.addChild(this.tipLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.mainUILayer);
        this.addChild(this.maskLayer);
        this.addChild(this.rotationTipsLayer);
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
