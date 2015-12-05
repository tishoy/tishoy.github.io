
class GameApp extends egret.DisplayObjectContainer {
    /**
     * 游戏文档类
     */
    private loadingPanel:LoadingPanel;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    
    private onAddToStage(event: egret.Event) {
        egret.Injector.mapClass(RES.AnalyzerBase, RES.PropertiesAnalyzer, RES.PropertiesAnalyzer.TYPE);

        this.addChild(GameConfig.gameScene());

        //资源加载监听
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("loading");
    }
    /**
     * preload 资源加载完成，第一次加载loading界面的资源。 loading时会加载整个资源。
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            PopUpManager.removePopUp(this.loadingPanel);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        } else if (event.groupName == "loading") {
            this.loadingPanel = new LoadingPanel();
            PopUpManager.addPopUp(this.loadingPanel);
            RES.loadGroup("preload");
        }

    }
    /**
     * preload进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingPanel.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    /**
     * 创建游戏界面
     */
    private createGameScene(): void {
        PanelManager.initPanel();
        window["onorientationchange"] = function(){
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(MainNotify.onOrientationChange,window["orientation"],false));
            if(GlobalData.isVerticalGame && GlobalData.initIsVertical && (window["orientation"] != 0)){
                location.reload();
            }
            if(GlobalData.isVerticalGame&&GameConfig.isVertical()){
                NativeApi.showVerticalTips(true);
            }else if(GlobalData.isVerticalGame&&!GameConfig.isVertical()){
                NativeApi.removeVerticalTips();
            }
        }; 
        if(GlobalData.isVerticalGame&&GameConfig.isVertical()){
            NativeApi.showVerticalTips();
        }
        Global.dispatchEvent(MainNotify.openStartPanelNotify, null, false);

        //Global.shareToWeiXin("EGER���ٿ�������", "EGER�����������У�������ȡ��ʾ�����ɣ�", "http://wx.9ria.com/games/eger", "http://wx.9ria.com/games/eger/resource/assets/icon.png");
    }

}


