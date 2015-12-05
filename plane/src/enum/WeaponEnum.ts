/**
 * Created by tishoy on 15/1/31.
 * 武器枚举
 * 暂且在此记录，尚未完善，没有策划出表确实难做啊
 */
class WeaponEnum{
    /**
     * 无道具使用
     */
    static nothingUsed:number = 0;
    /**
     * 雷达ID
     */
    static radarID:number = 1;
    /**
     * 燃烧弹ID
     */
    static fireBoomID:number = 2;
    /**
     * 燃烧弹
     * 持续型1 每次进行所有 3次
     * @type {number[]}
     */
    static fireBoom: number[] = [-9, -1, 1, 9];
    /**
     * 愤怒的小鸟
     */
    static angryBirdID:number = 3;
    /**
     * 愤怒的小鸟
     * 持续型2 每次进行一个 9次
     * * @type {number[]}
     */
    static angryBird:number[] = [-1, -9, +1, +1, +9, +9, -1, -1];
    /**
     * 飞毛腿
     */
    static scudID:number = 4;
    /**
     * 飞毛腿
     * 一次性 击中就沉
     */
    static scud:number = 0;

    /**
     * 通过不同位置获取道具的效果
     * @param id
     * @param column
     * @param row
     * @returns {*}
     */
    static getTriggers(id:number, column:number, row):number[]{
        switch (id) {
            case WeaponEnum.radarID:
                if(column < 1 && row < 1){
                    return [1, 9, 10];
                }else if (column < 1 && row < 8) {
                    return [-8, -9, 1, 9, 10];
                }else if (column < 1 && row == 8) {
                    return [-8, -9, 1];
                }else if (column < 8 && row < 1) {
                    return [-1, 1, 8, 9, 10];
                }else if (column < 8 && row < 8) {
                    return [-10, -9, -8, -1, 1, 8, 9, 10];
                }else if (column < 8 && row == 8) {
                    return [-10, -9, -8, -1, 1];
                }else if (column == 8 && row < 1) {
                    return [-1, 8, 9];
                }else if (column == 8 && row < 8) {
                    return [-10, -9, -1, 8, 9];
                }else if (column == 8 && row == 1) {
                    return [-10, -9, -1];
                }else {
                    console.log("错误位置");
                    return null;
                }

            case WeaponEnum.fireBoomID:
                if(column < 1 && row < 1){
                    return [1, 9];
                }else if (column < 1 && row < 8) {
                    return [-1, 1, 9];
                }else if (column < 1 && row == 8) {
                    return [-1, 9];
                }else if (column < 8 && row < 1) {
                    return [-9, 1, 9];
                }else if (column < 8 && row < 8) {
                    return [-9, -1, 1, 9];
                }else if (column < 8 && row == 8) {
                    return [-9, -1, 9];
                }else if (column == 8 && row < 1) {
                    return [-9, 1];
                }else if (column == 8 && row < 8) {
                    return [-9, -1, 1];
                }else if (column == 8 && row == 1) {
                    return [-9, -1];
                }else{
                    console.log("错误位置");
                }
                return null;

            case WeaponEnum.angryBirdID:
                if(column < 1 && row < 1){
                }else if (column < 1 && row < 8) {
                }else if (column < 1 && row == 8) {
                }else if (column < 8 && row < 1) {
                }else if (column < 8 && row < 8) {
                }else if (column < 8 && row == 8) {
                }else if (column == 8 && row < 1) {
                }else if (column == 8 && row < 8) {
                }else if (column == 8 && row == 1) {
                }else{
                    console.log("错误位置");
                }
                return null;

            case  WeaponEnum.scudID:
                if(column < 1 && row < 1){
                }else if (column < 1 && row < 8) {
                }else if (column < 1 && row == 8) {
                }else if (column < 8 && row < 1) {
                }else if (column < 8 && row < 8) {
                }else if (column < 8 && row == 8) {
                }else if (column == 8 && row < 1) {
                }else if (column == 8 && row < 8) {
                }else if (column == 8 && row == 1) {
                }else{
                    console.log("错误位置");
                }
                return null;
        }
        return [];
    }
} 