/**
 * Created by tishoy on 15/1/31.
 * 游戏类型枚举
 */
var GameModelEnum = (function () {
    function GameModelEnum() {
    }
    var __egretProto__ = GameModelEnum.prototype;
    /**
      *  还没有选择
      */
    GameModelEnum.noChoose = 0;
    /**
      *  冒险模式
      */
    GameModelEnum.advanture = 1;
    /**
      *  普通模式
      */
    GameModelEnum.common = 2;
    /**
      *  无尽模式
      */
    GameModelEnum.infinite = 3;
    /**
      *  联机模式
      */
    GameModelEnum.online = 4;
    return GameModelEnum;
})();
GameModelEnum.prototype.__class__ = "GameModelEnum";
