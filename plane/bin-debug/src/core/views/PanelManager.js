/**
  * 面板管理类
  * by dily
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var PanelManager = (function () {
    function PanelManager() {
    }
    // 初始化所有面板
    PanelManager.initPanel = function () {
        var _width = document.documentElement.clientWidth;
        var _height = document.documentElement.clientHeight;
        if (_width < _height) {
            GlobalData.initIsVertical = true;
        }
        PanelManager.gamePanel = new GamePanel();
        Global.addEventListener(MainNotify.openStartPanelNotify, PanelManager.openStartPanel, this);
        Global.addEventListener(MainNotify.closeStartPanelNotify, PanelManager.closeStartPanel, this);
        Global.addEventListener(MainNotify.openGamePanelNotify, PanelManager.openGamePanel, this);
        Global.addEventListener(MainNotify.closeGamePanelNotify, PanelManager.closeGamePanel, this);
        Global.addEventListener(MainNotify.openGameOverPanelNotify, PanelManager.openGameOverPanel, this);
        Global.addEventListener(MainNotify.closeGameOverPanelNotify, PanelManager.closeGameOverPanel, this);
        Global.addEventListener(MainNotify.openJsSdkPanelNotify, PanelManager.openJsSdkPanel, this);
        Global.addEventListener(MainNotify.closeJsSdkPanelNotify, PanelManager.closeJsSdkPanel, this);
    };
    // 打开开始界面
    PanelManager.openStartPanel = function () {
        if (PanelManager.startPanel == null) {
            PanelManager.startPanel = new StartPanel();
            PopUpManager.addPopUp(PanelManager.startPanel, false, 0, 0, 0);
        }
    };
    // 关闭开始界面
    PanelManager.closeStartPanel = function () {
        if (PanelManager.startPanel != null) {
            PopUpManager.removePopUp(PanelManager.startPanel, 3);
            PanelManager.startPanel = null;
        }
    };
    // 打开游戏界面
    PanelManager.openGamePanel = function () {
        if (PanelManager.gamePanel == null) {
        }
        PopUpManager.addPopUp(PanelManager.gamePanel, false, 0, 0, 3);
    };
    // 关闭游戏界面
    PanelManager.closeGamePanel = function () {
        if (PanelManager.gamePanel != null) {
            PopUpManager.removePopUp(PanelManager.gamePanel, 3);
        }
    };
    // 打开结束界面
    PanelManager.openGameOverPanel = function () {
        if (PanelManager.gameOverPanel == null) {
            PanelManager.gameOverPanel = new GameOverPanel();
            PopUpManager.addPopUp(PanelManager.gameOverPanel, false, 0, 0, 3);
        }
    };
    // 关闭结束界面
    PanelManager.closeGameOverPanel = function () {
        if (PanelManager.gameOverPanel != null) {
            PopUpManager.removePopUp(PanelManager.gameOverPanel, 3);
            PanelManager.gameOverPanel = null;
        }
    };
    // 打开jsSdkPanel界面
    PanelManager.openJsSdkPanel = function () {
        if (PanelManager.jsSdkPanel == null) {
            PanelManager.jsSdkPanel = new JsSdkPanel();
            PopUpManager.addPopUp(PanelManager.jsSdkPanel, false, 0, 0, 3);
        }
    };
    // 关闭jsSdkPanel界面
    PanelManager.closeJsSdkPanel = function () {
        if (PanelManager.jsSdkPanel != null) {
            PopUpManager.removePopUp(PanelManager.jsSdkPanel, 3);
            PanelManager.jsSdkPanel = null;
        }
    };
    return PanelManager;
})();
PanelManager.prototype.__class__ = "PanelManager";
