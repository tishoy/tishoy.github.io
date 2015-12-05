/**
 * 面板管理类
 * by dily
 * (c) copyright false,0,0,2014 - 2035
 * All Rights Reserved.
 * 面板的管理类
 */
class PanelManager {
    static startPanel:StartPanel;
    static chooseCopyPanel:ChooseCopyPanel;
    static gamePanel:GamePanel;
    static shopPanel:ShopPanel;
    static gameOverPanel:GameOverPanel;
    //static jsSdkPanel: JsSdkPanel;

	// 初始化所有面板
	static initPanel():void{ 
		var _width=document.documentElement.clientWidth;
    	var _height=document.documentElement.clientHeight;
    	if(_width < _height){
    		GlobalData.initIsVertical = true;
        }
        PanelManager.gamePanel = new GamePanel();

	    Global.addEventListener(MainNotify.openStartPanelNotify, PanelManager.openStartPanel, this);
	    Global.addEventListener(MainNotify.closeStartPanelNotify, PanelManager.closeStartPanel, this);

        Global.addEventListener(MainNotify.openChooseCopyPanelNotify, PanelManager.openChooseCopyPanel, this);
        Global.addEventListener(MainNotify.closeChooseCopyPanelNotify, PanelManager.closeChooseCopyPanel,this);

        Global.addEventListener(MainNotify.openShopPanelNotify, PanelManager.openShopPanel, this);
        Global.addEventListener(MainNotify.closeShopPanelNotify, PanelManager.closeShopPanel, this);

	    Global.addEventListener(MainNotify.openGamePanelNotify, PanelManager.openGamePanel, this);
	    Global.addEventListener(MainNotify.closeGamePanelNotify, PanelManager.closeGamePanel, this);

	    Global.addEventListener(MainNotify.openGameOverPanelNotify, PanelManager.openGameOverPanel, this);
	    Global.addEventListener(MainNotify.closeGameOverPanelNotify, PanelManager.closeGameOverPanel, this);

	    Global.addEventListener(MainNotify.openJsSdkPanelNotify, PanelManager.openJsSdkPanel, this);
	    Global.addEventListener(MainNotify.closeJsSdkPanelNotify, PanelManager.closeJsSdkPanel, this);

	} 

	// 打开开始界面
      static openStartPanel():void{
          if (PanelManager.startPanel == null){
              PanelManager.startPanel = new StartPanel();
              PopUpManager.addPopUp(PanelManager.startPanel,false,0,0,0);
          }
      }
      // 关闭开始界面
      static closeStartPanel():void{
          if (PanelManager.startPanel != null){
              PopUpManager.removePopUp(PanelManager.startPanel,3);
              PanelManager.startPanel = null;
          }
      }

      // 打开选关界面
      static openChooseCopyPanel():void{
          if (PanelManager.chooseCopyPanel == null){
              PanelManager.chooseCopyPanel = new ChooseCopyPanel();
              PopUpManager.addPopUp(PanelManager.chooseCopyPanel,false,0,0,0);
          }
      }
      // 关闭选关界面
      static closeChooseCopyPanel():void{
          if (PanelManager.chooseCopyPanel != null){
              PopUpManager.removePopUp(PanelManager.chooseCopyPanel,3);
              PanelManager.chooseCopyPanel = null;
          }
      }

      // 打开游戏界面
    static openGamePanel():void{ 
        if (PanelManager.gamePanel == null){
			
        }
        PopUpManager.addPopUp(PanelManager.gamePanel, false, 0, 0, 3);
	} 
	// 关闭游戏界面
    static closeGamePanel():void{ 
        if (PanelManager.gamePanel != null){
            PopUpManager.removePopUp(PanelManager.gamePanel,3);
//			this.gamePanel = null;
		}
	}

    static openShopPanel():void{
        if (PanelManager.shopPanel == null) {
            PanelManager.shopPanel = new ShopPanel();
            console.log("实例化");
            PopUpManager.addPopUp(PanelManager.shopPanel, false, 0, 0, 3);
        }
    }

    static closeShopPanel():void{
        if (PanelManager.shopPanel != null){
            PopUpManager.removePopUp(PanelManager.shopPanel,3);
            PanelManager.shopPanel = null;
        }
    }

	// 打开结束界面
    static  openGameOverPanel():void{ 
         if (PanelManager.gameOverPanel == null){
             PanelManager.gameOverPanel = new GameOverPanel();
             PopUpManager.addPopUp(PanelManager.gameOverPanel,false,0,0,3);
		}
	} 
	// 关闭结束界面
    static closeGameOverPanel():void{ 
        if (PanelManager.gameOverPanel != null){
            PopUpManager.removePopUp(PanelManager.gameOverPanel,3);
            PanelManager.gameOverPanel = null;
		}
	} 
	// 打开jsSdkPanel界面
    static openJsSdkPanel():void{ 
         //if (PanelManager.jsSdkPanel == null){
            //PanelManager.jsSdkPanel = new JsSdkPanel();
            // PopUpManager.addPopUp(PanelManager.jsSdkPanel,false,0,0,3);
		//}
	} 
	// 关闭jsSdkPanel界面
	static closeJsSdkPanel():void{
         //if (PanelManager.jsSdkPanel != null){
             //PopUpManager.removePopUp(PanelManager.jsSdkPanel,3);
             //PanelManager.jsSdkPanel = null;
		//}
	} 
}


