/**
 * Created by tishoy on 15/1/31.
 * 格子类型枚举
 */
class GridTypeEnum {
    /**
      *  格子空
      */
    static miss: number = 0;
    /**
      *  格子中
      */
    static body: number = 1;
    /**
      *  格子头
      */
    static head: number = 2; 
    /**
      *  宝箱    //打算设置在角落里
      */
    static gift: number = 3;
    /**
      *  金币    //打算设置在角落里
      */
    static gold: number = 4;
    /**
     * 传送点
     */
    static teleport:number = 5;
} 