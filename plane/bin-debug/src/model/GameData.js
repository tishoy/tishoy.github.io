/**
 * Created by tishoy on 15/1/31.
 * 游戏主数据
 * 这里并未使用dily提供的GlobalData，因为所需数据多且分散，所以使用许多Data分别记录。
 */
var GameData = (function () {
    function GameData() {
        this._keeping = false;
        if (GameData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = GameData.prototype;
    GameData.getInstance = function () {
        if (!this.instance) {
            this.instance = new GameData();
        }
        return this.instance;
    };
    __egretProto__.initialize = function () {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
        this._lastSetp = 0;
        this.model = 0;
    };
    __egretProto__.clear = function () {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
    };
    Object.defineProperty(__egretProto__, "hitTimes", {
        get: function () {
            return this._hitTimes;
        },
        set: function (value) {
            this._hitTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "missTimes", {
        get: function () {
            return this._missTimes;
        },
        set: function (value) {
            this._missTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "bodyTimes", {
        get: function () {
            return this._bodyTimes;
        },
        set: function (value) {
            this._bodyTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "headTimes", {
        get: function () {
            return this._headTimes;
        },
        set: function (value) {
            this._headTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "lastStep", {
        get: function () {
            return this._lastSetp;
        },
        set: function (value) {
            this._lastSetp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "keeping", {
        get: function () {
            return this._keeping;
        },
        set: function (value) {
            if (this._keeping == value) {
                if (this._keeping == true) {
                    Global.dispatchEvent(GameEvent.GAME_CONTINUE, null, false);
                    if (this.headTimes == 3) {
                        this._result = GameResultEnum.victory;
                        GameController.getInstance().endGame();
                        CopyData.getInstance().saveCopyStar(this._lastSetp);
                        Global.dispatchEvent(GameEvent.GAME_VICTORY, null, false);
                    }
                    else if (this.model == GameModelEnum.advanture && this.lastStep == 0) {
                        console.log("3");
                        this._result = GameResultEnum.lost;
                        GameController.getInstance().endGame();
                        Global.dispatchEvent(GameEvent.GAME_LOST, null, false);
                    }
                }
                else {
                    Global.dispatchEvent(GameEvent.GAME_RESET, null, false);
                }
                return;
            }
            else {
                this._keeping = value;
                if (this._keeping) {
                    Global.dispatchEvent(GameEvent.GAME_START, null, false);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "result", {
        get: function () {
            return this._result;
        },
        enumerable: true,
        configurable: true
    });
    return GameData;
})();
GameData.prototype.__class__ = "GameData";
