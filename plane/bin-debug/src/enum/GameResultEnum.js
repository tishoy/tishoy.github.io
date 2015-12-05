/**
 * Created by tishoy on 15/1/31.
 * 游戏结果枚举
 */
var GameResultEnum = (function () {
    function GameResultEnum() {
    }
    var __egretProto__ = GameResultEnum.prototype;
    /**
      *  胜利
      */
    GameResultEnum.victory = 0;
    /**
      *  失败
      */
    GameResultEnum.lost = 1;
    /**
     * 传送结束
     */
    GameResultEnum.transform = 3;
    return GameResultEnum;
})();
GameResultEnum.prototype.__class__ = "GameResultEnum";
