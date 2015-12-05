/**
 * Created by tishoy on 15/1/31.
 * 方向枚举
 * 通过方向获取身体位置
 */
class DirectionTypeEnum{
    static directionList:number[] = [27, -3, -27, 3];
    /**
      *  上
      */
    static up: number = 0;
    /**
      *  右
      */
    static right: number = 1;
    /**
      *  下
      */
    static down: number = 2;
    /**
      *  左
      */
    static left: number = 3;

    /**
      * 增加称号功能后，此处飞机身体数组顺序不可改变
      */
    static getGridByDirection(direction:number): number[] {
        switch (direction) {
        case DirectionTypeEnum.up:
            return [9, 18, 7, 8, 10, 11, 26, 28, 27];

        case DirectionTypeEnum.right:
            return [-1, -2, -19, -10, 8, 17, -12, 6, - 3] ;

        case DirectionTypeEnum.down:
            return [-9, -18, -7, -8, -10, -11, -28 , - 26, -27 ];

        case DirectionTypeEnum.left:
            return [1, 2, -17, -8, 10, 19, - 6, 12, 3 ];

        default:
            egret.Logger.info("direction error");
            return [];
        }
    }
} 