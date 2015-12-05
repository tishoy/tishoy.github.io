/**
 * Created by tishoy on 15/1/31.
 * 格子类型枚举
 */
var GridTypeEnum = (function () {
    function GridTypeEnum() {
    }
    var __egretProto__ = GridTypeEnum.prototype;
    /**
      *  格子空
      */
    GridTypeEnum.miss = 0;
    /**
      *  格子中
      */
    GridTypeEnum.body = 1;
    /**
      *  格子头
      */
    GridTypeEnum.head = 2;
    /**
      *  宝箱    //打算设置在角落里
      */
    GridTypeEnum.gift = 3;
    /**
      *  金币    //打算设置在角落里
      */
    GridTypeEnum.gold = 4;
    /**
     * 传送点
     */
    GridTypeEnum.teleport = 5;
    return GridTypeEnum;
})();
GridTypeEnum.prototype.__class__ = "GridTypeEnum";
