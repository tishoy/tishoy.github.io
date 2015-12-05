///<reference path="../utils/NativeApi.ts"/>
/**
 * Created by tishoy on 15/2/2.
 */
var AchievementData = (function () {
    function AchievementData() {
        if (AchievementData._instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = AchievementData.prototype;
    AchievementData.getInstance = function () {
        if (!AchievementData._instance) {
            AchievementData._instance = new AchievementData();
        }
        return AchievementData._instance;
    };
    __egretProto__.initialize = function () {
        //假定现有10个成就
        this.achievementList = [];
        for (var i = 0; i < 10; i++) {
            this.achievementList[i] = NativeApi.getLocalData("Achieve" + i);
        }
    };
    return AchievementData;
})();
AchievementData.prototype.__class__ = "AchievementData";
