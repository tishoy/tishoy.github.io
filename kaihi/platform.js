/**
 * 请在白鹭引擎的Main.ts中调用 platform.login() 方法调用至此处。
 */

class JPlatform {


    // name;
    // banner;
    // video;

    initAnalytics() {
        if (this.name === "qqplay") {
            let config = {
                gameKey: "02a2d376f1268780cdeb969e3385bae2",
                secretKey: "9b426779362d3259747c55f90ce0a40500524bcb"
            }
            return config;

            // window.GameAnalytics = window.GameAnalytics || function () { (GameAnalytics.q = GameAnalytics.q || []).push(arguments) };
            // GameAnalytics("setEnabledInfoLog", true);
            // GameAnalytics("initialize", "02a2d376f1268780cdeb969e3385bae2", "9b426779362d3259747c55f90ce0a40500524bcb");
        } else if (this.name === "wxgame") {

        }
    }

    setLifeCycleCallBack(onPause, onResume) {
        if (this.name === "qqplay") {
            BK.QQ.listenGameEventEnterBackground({}, function () {
                if (onPause) {
                    onPause();
                }
            });
            BK.QQ.listenGameEventEnterForeground({}, function () {
                if (onResume) {
                    onResume();
                }
            });
        } else {
            egret.lifecycle.onPause = () => {
                onPause();
            }

            egret.lifecycle.onResume = () => {
                onResume();
            }
        }
    }

    setLoadingProgress(percent) {
        if (this.name === "oppo") {
            OPPO.setLoadingProgress(percent)
        }
    }

    loadingComplete() {
        if (this.name === "oppo") {
            OPPO.loadingComplete()
        } else if (this.name === "mi") {
            // 游戏开始
            XMGame.game_start(foo)  // 游戏loading蒙层会取消

            function foo(result) {
                if (result.code === "3") {
                    // 需要调用提前游戏结束的逻辑，这是例子
                    XMGame.game_over({
                        cost_time: 10000,
                        score: 0
                    })
                }
            }

        }
    }

    print(msg) {
        if (this.name === "qqplay") {
            BK.Script.log(1, 1, "joypac " + msg);
        } else {
            console.log("joypac " + msg);
        }
    }

    share(title, url, iconurl = "", cb = null, extendInfo = "", savedPath = "") {
        if (this.name === WXGAME) {
            wx.onShareAppMessage(cb);
            if (url.indexOf("http") === -1) {
                wx.shareAppMessage({
                    title: title,
                    imageUrl: url
                })
            } else {
                wx.shareAppMessage({
                    title: title,
                })
            }
        } else if (this.name === "qqplay") {
            // if (url.indexOf("http") === -1) {
            //     url = "GameRes://" + url
            // }
            var shareInfo = {
                summary: title,          //QQ聊天消息标题
                picUrl: "",               //QQ聊天消息图片
                extendInfo: extendInfo,    //QQ聊天消息扩展字段
                localPicPath: "",   //分享至空间、微信、朋友圈时需要的图。（选填，若无该字段，系统使用游戏对应的二维码）
                gameName: "神回避"          //游戏名，暂用与生成二维码
            };

            BK.QQ.share(shareInfo, function (retCode, shareDest, isFirstShare) {
                BK.Script.log(1, 1, "joypac retCode:" + retCode + " shareDest:" + shareDest + " isFirstShare:" + isFirstShare);
                if (retCode == 0) {
                    if (shareDest == 0 /* QQ */) {
                        //聊天窗
                        BK.Script.log(1, 1, "joypac 成功分享至QQ");
                    }
                    else if (shareDest == 1 /* QZone */) {
                        //空间
                        BK.Script.log(1, 1, "joypac 成功分享至空间");
                    }
                    else if (shareDest == 2 /* WX */) {
                        //微信
                        BK.Script.log(1, 1, "joypac 成功分享至微信");
                    }
                    else if (shareDest == 3 /* WXCircle */) {
                        // 朋友圈
                        BK.Script.log(1, 1, "joypac 成功分享至朋友圈");
                    }
                }
                else if (retCode == 1) {
                    BK.Script.log(1, 1, "joypac 分享失败" + retCode);
                }
                else if (retCode == 2) {
                    BK.Script.log(1, 1, "joypac 分享失败，用户取消分享：" + retCode);
                }
            });
        } else {

        }
    }

    existRank() {
        if (this.name === "qqplay") {
            return true;
        }
        if (this.name === "oppo") {
            return true;
        }
        return false;
    }

    uploadRank(key, value) {
        if (this.name === "wxgame") {
            let valueStr = {
                "wxgame": {
                    "score": value + '',
                    "update_time": ((new Date()).getTime()).toString()
                },
            };
            var kvDataList = [];
            kvDataList.push({
                key: 'radishRecord',
                value: JSON.stringify(valueStr)
            });
            wx.getStorageInfo({
                success: (keys, currentSize, limitSize) => {
                    let hasKey = false;

                    for (var i = 0; i < keys.length; i++) {
                        if (keys[i] === key) {
                            console.log("存在本地存储");
                            wx.getStorage({
                                "key": key,//根据上传托管定义的key值进行获取 获取存储的记录
                                success: res => {
                                    //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
                                    //拿到数居 进行排序
                                    // this.parseCloudRecord(data);
                                    // this.recordData = res.data;
                                    // this.parseCloudRecord(res.data);
                                    // 对比上次成绩 再次上传



                                    wx.setUserCloudStorage({
                                        KVDataList: kvDataList,
                                        success: function (res) {
                                            console.log("上传数据成功");
                                            console.log(kvDataList);

                                            wx.setStorage({
                                                key: key,
                                                data: valueStr,
                                                success: function (res) {
                                                    console.log("本地存储更新成功");
                                                },
                                                fail: function (res) {
                                                    console.log("本地存储更新失败");
                                                },
                                                complete: function (res) {
                                                }
                                            });
                                        },
                                        fail: function (res) {

                                        },
                                        complete: function (res) {
                                        }
                                    });

                                },
                                fail: function (res) {
                                },
                                complete: function () {
                                }
                            })
                            hasKey = true;
                            break;
                        }

                    }
                    if (hasKey === false) {
                        wx.setUserCloudStorage({
                            KVDataList: kvDataList,
                            success: function (res) {
                                console.log(kvDataList);

                                wx.setStorage({
                                    key: key,
                                    data: valueStr,
                                    success: function (res) {
                                        console.log("本地存储更新成功");
                                    },
                                    fail: function (res) {
                                        console.log("本地存储更新失败");
                                    },
                                    complete: function (res) {
                                    }
                                });
                            },
                            fail: function (res) {

                            },
                            complete: function (res) {
                            }
                        });
                    }

                },
                fail: () => {

                },
                complete: () => {

                }

            });
            //先获取之前的成绩  再上传新的成绩

        } else if (this.name === "qqplay") {
            BK.Script.log(1, 1, value);
            var time = ((new Date()).getTime()).toString();
            var data = {
                userData: [
                    {
                        openId: GameStatusInfo.openId,
                        startMs: time, //必填。 游戏开始时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        endMs: ((new Date()).getTime()).toString(),  //必填。 游戏结束时间。单位为毫秒，<font color=#ff0000>类型必须是字符串</font>
                        scoreInfo: {
                            score: value, //分数，类型必须是整型数
                        },
                    },
                ],
                attr: {
                    score: {
                        type: 'rank',
                        order: 1,
                    },
                },
            };
            // gameMode: 游戏模式，如果没有模式区分，直接填 1
            // 必须配置好周期规则后，才能使用数据上报和排行榜功能
            BK.Script.log(1, 1, '上传分数');
            BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
                // 返回错误码信息
                if (errCode !== 0) {
                    BK.Script.log(1, 1, '上传分数失败!错误码：' + errCode);
                }
            });
        } else if (this.name === "oppo") {
            OPPO.updateGameRank({
                score: value// 更新当前账号在排行榜中显示的可比较数值（整数，最大值为2147483647）
            })
        }
    }

    getRank(key) {
        if (this.name === "wxgame") {
            wx.getFriendCloudStorage({
                keyList: ['radishRecord'],//根据上传托管定义的key值进行获取 获取存储的记录
                success: res => {
                    //后面加上 ?aaa=aa.jpg 这几个字符，就能够访问到用户头像图片
                    console.log("好友数据请求成功", res.data);
                    //拿到数居 进行排序
                    // this.parseCloudRecord(data);
                    // this.recordData = res.data;
                    // this.parseCloudRecord(res.data);

                },
                fail: function () {
                    console.log("好友数据失败");
                },
                complete: function () {
                    console.log("好友数据完成");
                }
            })
        } else if (this.name === "qqplay") {
            BK.Script.log(1, 1, '获取排行榜');
            return new Promise((resolve, reject) => {
                var attr = "score";//使用哪一种上报数据做排行，可传入score，a1，a2等
                var order = 1;     //排序的方法：[ 1: 从大到小(单局)，2: 从小到大(单局)，3: 由大到小(累积)]
                var rankType = 0; //要查询的排行榜类型，0: 好友排行榜，1: 群排行榜，2: 讨论组排行榜，3: C2C二人转 (手Q 7.6.0以上支持)
                // 必须配置好周期规则后，才能使用数据上报和排行榜功能

                BK.Script.log(1, 1, '获取排行榜数据');
                BK.QQ.getRankListWithoutRoom(attr, order, rankType, function (errCode, cmd, data) {
                    // 返回错误码信息
                    if (errCode !== 0) {
                        resolve([]);
                        return;
                    }
                    // 解析数据
                    if (data) {
                        BK.Script.log(1, 1, '获取数据' + data.data.ranking_list);
                        resolve(data.data.ranking_list);
                        /**
                         * {"nick":"哈N她!)|A(","score":5,"selfFlag":1,"url":"http://thirdqq.qlogo.cn/g?b=sdk&k=F7aCnicxWzpicK89d0gkh7cw&s=100&t=1516260478"}
                         */
                        // this.parseQQPlayRecord(data.data.ranking_list);
                        // console.log(data.data.ranking_list);
                    }


                }.bind(this));
            });
        }
    }

    fetchBanner() {
        if (this.name === "qqplay") {
            return new Promise((resolve, reject) => {
                BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
                    if (retCode == 0) {
                        adBannerHandle.onClickContent(function () {
                            BK.Script.log(1, 1, "joypac 点击了广告 msg:" + msg);
                        });
                        adBannerHandle.onClickClose(function () {
                            BK.Script.log(1, 1, "joypac 关闭了广告 msg:" + msg);
                        });
                        resolve(adBannerHandle);
                    } else {
                        resolve(null);
                        BK.Script.log(1, 1, "joypac fetchBannerAd failed. retCode:" + retCode);
                    }
                }.bind(this));
            })
        } else if (this.name === "oppo") {
            return new Promise((resolve, reject) => {
                var bannerAd = opUnion.createBannerAd({
                    containerId: 'banner',
                    posId: '33043',
                    mediaId: '101000219',
                });
                bannerAd.onLoad(function (err) {
                    let ad_node = document.getElementById("ad");
                    ad_node.style.display = "none";//block
                    resolve(bannerAd);
                })
                bannerAd.onError(function (err) {
                    let ad_node = document.getElementById("ad");
                    ad_node.style.display = "none";//block
                    resolve(null);
                })
                bannerAd.addEventListener("onclick", () => {

                })
            })
        } else if (this.name === "wxgame") {
            return null;
        }
    }

    showBanner(banner) {
        if (this.name === "qqplay") {
            if (banner === null) {
                return;
            }
            banner.show(function (succCode, msg, handle) {
                if (succCode == 0) {
                    //
                }
                else {
                    BK.Script.log(1, 1, "展示失败 msg:" + msg);
                }
            }.bind(this));
        } else if (this.name === "oppo") {
            let ad_node = document.getElementById("ad");
            ad_node.style.display = "block";//block
        }
    }

    hideBanner(banner) {
        if (this.name === "qqplay") {
            banner.close();
        } else if (this.name === "oppo") {
            let ad_node = document.getElementById("ad");
            ad_node.style.display = "none";//block
        }
    }

    fetchVedio() {
        if (this.name === "qqplay") {
            return new Promise((resolve, reject) => {
                var videoType = 0; //激励视频广告场景 0.游戏页面挂件广告 1.游戏结算页广告 2.游戏任务广告  3.游戏复活广告 
                BK.Advertisement.fetchVideoAd(videoType, function (retCode, msg, handle) {
                    if (retCode == 0) {
                        AdManager.getInstance().vedioLoaded = true;
                        resolve(handle);
                    } else {
                        AdManager.getInstance().vedioLoaded = false;
                        resolve(null)
                    }
                }.bind(this));
            });
        } else if (this.name === "oppo") {
            return new Promise((resolve, reject) => {
                var rewardedVideoAd = opUnion.createVideoAd({
                    posId: '32998',
                    mediaId: '101000219'
                })
                console.log('开始视频广告加载');

                rewardedVideoAd.onLoad(function () {
                    AdManager.getInstance().vedioLoaded = true;
                })

                rewardedVideoAd.onError(function (err) {
                    AdManager.getInstance().vedioLoaded = false;
                })

                resolve(rewardedVideoAd);

            })
        } else if (this.name === "mi") {
            AdManager.getInstance().vedioLoaded = true;
        }
    }

    reloadVedio(vedio) {
        vedio.load();
    }

    vedioPlay(vedio, onPlay, onEnd) {
        if (this.name === "qqplay") {
            // return new Promise((resolve, reject) => {\
            var result = {
                start: false,
                finish: false
            };
            vedio.setEventCallack(
                function (code, msg) {
                    BK.Script.log(1, 1, "closeGame"); //关闭游戏（不再使用不需要监听） 
                }.bind(this),
                function (code, msg) {
                    if (code === 0) {
                        result.finish = true;
                        //达到看广告时长要求，可以下发奖励 
                    } else {

                    }
                }.bind(this),
                function (code, msg) {
                    if (code === 0) {
                        onEnd(result);
                        // resolve(result);//关闭视频webview 
                    } else {

                    }
                }.bind(this),
                function (code, msg) {
                    if (code === 0) {
                        // result.start = true;
                        // resolve(result);
                        //开始播放视频 
                        onPlay();
                    } else {

                    }
                }.bind(this)
            )
            vedio.jump();
            // });
            // if (args.length === 3) {

            // }
        }
        if (this.name === "wxgame") {

        }
        if (this.name === "oppo") {
            var result = {
                start: false,
                finish: false
            };
            vedio.onClose(function (res) {
                SoundManager.getInstance().playBGM();
                egret.ticker.resume();
                if (res && res.isEnded) {
                    result.finish = true;
                    console.log(result);
                    onEnd(result);
                } else {
                    console.log(result);
                    onEnd(result);
                }
            });
            vedio.show().then(function () { onPlay() }, () => { }).catch(function (err) { vedio.load().then(function () { vedio.show() }) }, () => { });
        } else if (this.name === "mi") {
            var content = {
                adType: '1',
                adId: '21c9f49ceec061102301'
            }
            console.log("joypac播放视频");
            XMGame.game_show_ad(content, function (adData) {
                console.log("joypac" + adData.result);
                console.log("joypac" + adData.hasGetAd);
                if (this.adData.hasGetAd) {
                    onPlay();
                }
                // if (adData.) {

                // }
            })
        }
    }

    fetchInterstitial() {
        if (this.name === "oppo") {
            return new Promise((resolve, reject) => {
                var interstitialAd = opUnion.createInterstitialAd({
                    posId: '33044',
                    mediaId: '101000219'
                })
                console.log('开始插屏广告加载');

                interstitialAd.onLoad(function () {
                    // resolve(interstitialAd);
                    // interstitialAd.offLoad();

                })

                interstitialAd.onError(function (err) {
                    // resolve(null);

                })

                resolve(interstitialAd);
            })
        }
    }

    showInterstitial(interstitialAd) {
        if (this.name === "oppo") {
            interstitialAd.onClose(function () {
                SoundManager.getInstance().playBGM();
                egret.ticker.resume();
            }.bind(this))
            interstitialAd.show().catch(function (err) { interstitialAd.load().then(function () { interstitialAd.show() }) }, () => { })
        }
    }

    getUserInfo() {
        if (this.name === "wxgame") {
            wx.getUserInfo({
                withCredentials: true,
                success: function (res) {
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var province = userInfo.province
                    var city = userInfo.city
                    var country = userInfo.country
                    resolve(userInfo);
                }
            })
        } else if (this.name === "mi") {
            //获取用户信息
            XMGame.get_userinfo(callback) // 获取用户头像和名称等信息

            function callback(userInfo) {
                if (userInfo && Object.prototype.toString.call(userInfo) === '[object Object]') {
                    console.log(userInfo)
                    console.log(userInfo.nickName)
                    console.log(userInfo.avatar) // url
                    console.log('获取到了用户数据')
                }
            }

        }


    }

    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: (res) => {
                    resolve(res)
                }
            })
        })
    }

    getSaveData() {

    }

    setSaveData() {

    }

    rankView(show = true) {
        if (this.name === "wxgame") {
            if (show) {
                platform.openDataContext.postMessage({
                    isDisplay: true,
                    text: 'hello',
                    year: (new Date()).getFullYear(),
                    command: "open"
                });
            } else {
                platform.openDataContext.postMessage({
                    isDisplay: false,
                    text: 'hello',
                    year: (new Date()).getFullYear(),
                    command: "close"
                });
            }

        } else if (this.name === "oppo") {
            OPPO.openRankPage();
        } else {
            UIManager.getInstance().toRankScene();
        }
    }

    loadNextStage(stage) {
        if (this.name === "qqplay") {
            if (stage <= 30) {
                RES.loadConfig("stage" + stage + ".res.json", "https://games.tishoy.com/kaihi3_h5/resource/");
                // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
            }
        } else if (this.name === "wxgame") {
            if (stage <= 30) {
                RES.loadConfig("stage" + stage + ".res.json", "https://games.tishoy.com/kaihi3_h5/resource/");
                // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
            }
        }
    }

    hasBannerSDK() {
        return false;
    }

    hasInterstitialSDK() {
        return false;
    }

    hasVedioSDK() {
        return true;
    }

    hasShareSDK() {
        return false;
    }
    // openDataContext = new WxgameOpenDataContext();
}

class WxgameOpenDataContext {

    createDisplayObject(type, width, height) {
        const bitmapdata = new egret.BitmapData(sharedCanvas);
        bitmapdata.$deleteSource = false;
        const texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        const bitmap = new egret.Bitmap(texture);
        bitmap.width = width;
        bitmap.height = height;

        if (egret.Capabilities.renderMode == "webgl") {
            const renderContext = egret.wxgame.WebGLRenderContext.getInstance();
            const context = renderContext.context;
            ////需要用到最新的微信版本
            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)
            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
            if (!context.wxBindCanvasTexture) {
                egret.startTick((timeStarmp) => {
                    egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                    bitmapdata.webGLTexture = null;
                    return false;
                }, this);
            }
        }
        return bitmap;
    }


    postMessage(data) {
        const openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage(data);
    }
}

/**
     * 发布后，拷入该平台，只需要更换具体平台名称的
     */
// WXGAME = 'wxgame';
// QQPLAY = 'qqplay';
// OPPO = 'oppo';
// MI = 'mi'

window.platform = new JPlatform();
window.platform.name = "mi";
window.platform.openDataContext = new WxgameOpenDataContext();