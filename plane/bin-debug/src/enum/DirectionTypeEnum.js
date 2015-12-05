/**
 * Created by tishoy on 15/1/31.
 * 方向枚举
 * 通过方向获取身体位置
 */
var DirectionTypeEnum = (function () {
    function DirectionTypeEnum() {
    }
    var __egretProto__ = DirectionTypeEnum.prototype;
    /**
      * 增加称号功能后，此处飞机身体数组顺序不可改变
      */
    DirectionTypeEnum.getGridByDirection = function (direction) {
        switch (direction) {
            case DirectionTypeEnum.up:
                return [9, 18, 7, 8, 10, 11, 26, 28, 27];
            case DirectionTypeEnum.right:
                return [-1, -2, -19, -10, 8, 17, -12, 6, -3];
            case DirectionTypeEnum.down:
                return [-9, -18, -7, -8, -10, -11, -28, -26, -27];
            case DirectionTypeEnum.left:
                return [1, 2, -17, -8, 10, 19, -6, 12, 3];
            default:
                egret.Logger.info("direction error");
                return [];
        }
    };
    DirectionTypeEnum.directionList = [27, -3, -27, 3];
    /**
      *  上
      */
    DirectionTypeEnum.up = 0;
    /**
      *  右
      */
    DirectionTypeEnum.right = 1;
    /**
      *  下
      */
    DirectionTypeEnum.down = 2;
    /**
      *  左
      */
    DirectionTypeEnum.left = 3;
    return DirectionTypeEnum;
})();
DirectionTypeEnum.prototype.__class__ = "DirectionTypeEnum";
