/**
 * Created by tishoy on 15/2/2.
 */
var AchievementTypeEnum = (function () {
    function AchievementTypeEnum() {
    }
    var __egretProto__ = AchievementTypeEnum.prototype;
    /**
     * 游戏胜利后可获取的称号
     */
    AchievementTypeEnum.victoryType = 0;
    /**
     * 游戏进行中能获取的称号
     */
    AchievementTypeEnum.keepingType = 1;
    /**
     * 副本专属称号
     */
    AchievementTypeEnum.copyType = 2;
    return AchievementTypeEnum;
})();
AchievementTypeEnum.prototype.__class__ = "AchievementTypeEnum";
