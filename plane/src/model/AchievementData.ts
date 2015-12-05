///<reference path="../utils/NativeApi.ts"/>
/**
 * Created by tishoy on 15/2/2.
 */
class AchievementData{
    private static _instance:AchievementData;
    private achievementList:string[];   //记录01的序列，0表示没有完成
    constructor(){
        if (AchievementData._instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance():AchievementData{
        if (!AchievementData._instance) {
            AchievementData._instance = new AchievementData();
        }
        return AchievementData._instance;
    }

    initialize():void{
        //假定现有10个成就
        this.achievementList = [];
        for (var i = 0; i < 10;i++) {
            this.achievementList[i] = NativeApi.getLocalData("Achieve" + i);
        }
    }

}