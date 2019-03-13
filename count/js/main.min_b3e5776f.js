var __reflect=this&&this.__reflect||function(t,e,n){t.__class__=e,n?n.push(e):n=[e],t.__types__=t.__types__?n.concat(t.__types__):n},__extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);n.prototype=e.prototype,t.prototype=new n},__awaiter=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))(function(i,s){function r(t){try{u(o.next(t))}catch(e){s(e)}}function a(t){try{u(o["throw"](t))}catch(e){s(e)}}function u(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(r,a)}u((o=o.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function n(t){return function(e){return o([t,e])}}function o(n){if(i)throw new TypeError("Generator is already executing.");for(;u;)try{if(i=1,s&&(r=s[2&n[0]?"return":n[0]?"throw":"next"])&&!(r=r.call(s,n[1])).done)return r;switch(s=0,r&&(n=[0,r.value]),n[0]){case 0:case 1:r=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,s=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(r=u.trys,!(r=r.length>0&&r[r.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!r||n[1]>r[0]&&n[1]<r[3])){u.label=n[1];break}if(6===n[0]&&u.label<r[1]){u.label=r[1],r=n;break}if(r&&u.label<r[2]){u.label=r[2],u.ops.push(n);break}r[2]&&u.ops.pop(),u.trys.pop();continue}n=e.call(t,u)}catch(o){n=[6,o],s=0}finally{i=r=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,s,r,a,u={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){var e=t.call(this)||this;return e.engine=new MatchvsEngine,e.response=new MatchvsResponse,e.sum=0,e.amountList=[],e.gameResult="",e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){egret.lifecycle.addLifecycleListener(function(t){t.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[4,platform.login()];case 2:return e.sent(),[4,platform.getUserInfo()];case 3:return t=e.sent(),console.log(t),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,3,,4]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,RES.loadGroup("preload",0,t)];case 2:return n.sent(),this.stage.removeChild(t),[3,4];case 3:return e=n.sent(),console.error(e),[3,4];case 4:return[2]}})})},e.prototype.createGameScene=function(){this.response.initResponse=this.initResponse.bind(this),this.engine.init(this.response,"Matchvs","alpha",215188);new egret.Bitmap,new egret.TextField;this.startButton=new egret.Bitmap,this.startButton.texture=RES.getRes("egret_icon_png"),this.startButton.touchEnabled=!0,this.addChild(this.startButton),this.startButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMatch,this)},e.prototype.initResponse=function(t){200===t&&(console.log("初始化成功!"),this.response.registerUserResponse=this.registerUserResponse.bind(this),this.engine.registerUser())},e.prototype.registerUserResponse=function(t){0==t.status?(console.log("注册成功"),this.response.loginResponse=this.loginResponse.bind(this),this.engine.login(t.userID,t.token,215188,1,"e12affcec3a2414484f92adc0bf58e92#E","4b132c8a77c248b5840087b0420e7faa","v",0)):console.log("注册失败",t.status)},e.prototype.loginResponse=function(t){200==t.status&&(console.log("登录Matchvs联网SDK成功"),this.response.joinRoomNotify=this.joinRoomNotify.bind(this),this.response.joinRoomResponse=this.joinRoomResponse.bind(this))},e.prototype.joinRoomResponse=function(t,e,n){200===t&&(console.log(e),console.log("我自己进入房间成功"),this.myTurn=!1)},e.prototype.joinRoomNotify=function(t){console.log(t),console.log("有其他人进入房间"),this.myTurn=!0},e.prototype.sendEventNotify=function(t){if(console.log("sendEventInfo"),console.log(t),Number(!isNaN(Number(t.cpProto)))){var e=Number(t.cpProto);this.sum+=e,this.amountList[e-1].text=String(Number(this.amountList[e-1].text)-1),this.updateView(),""===this.gameResult&&(this.myTurn=!0)}},e.prototype.onMatch=function(t){this.startButton.visible=!1;var e,n;this.engine.joinRandomRoom(2,"hello matchvs"),this.response.sendEventNotify=this.sendEventNotify.bind(this);for(var o=1;6>=o;o++)e=new egret.Bitmap,e.texture=RES.getRes(""+o+"_png"),e.x=(o-1)%3*200,e.y=400*Math.floor((o-1)/3),e.name=o.toString(),e.touchEnabled=!0,e.addEventListener(egret.TouchEvent.TOUCH_TAP,this.getNumber,this),this.addChild(e),n=new egret.TextField,n.x=e.x+e.width,n.y=e.y,n.text="4",this.amountList.push(n),this.addChild(n);this.sum=0,this.sumText=new egret.TextField,this.sumText.x=200,this.sumText.y=800,this.sumText.text=this.sum.toString(),this.addChild(this.sumText)},e.prototype.updateView=function(){this.sumText.text=this.sum.toString(),this.sum>31?this.myTurn===!0?(this.myTurn=!1,this.gameResult="loss",console.log("loss")):(this.gameResult="win",console.log("win")):31===this.sum&&(this.myTurn===!0?(this.myTurn=!1,this.gameResult="win",console.log("win")):(this.gameResult="loss",console.log("loss")))},e.prototype.getNumber=function(t){if(this.myTurn){console.log(t.target.name);var e=Number(t.target.name);0===Number(this.amountList[e-1].text)?console.log("请从点一次"):(this.sum+=e,this.amountList[e-1].text=String(Number(this.amountList[e-1].text)-1),this.engine.sendEvent(t.target.name),this.updateView(),this.myTurn=!1)}else console.log("不是你的回合")},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"+Math.floor(100*Math.random())}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);