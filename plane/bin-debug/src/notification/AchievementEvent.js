/**
 * Created by tishoy on 15/2/2.
 */
var AchievementEvent = (function (_super) {
    __extends(AchievementEvent, _super);
    function AchievementEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var __egretProto__ = AchievementEvent.prototype;
    AchievementEvent.ACHIEVE_LOVE_WINGS = "achieve_love_wings";
    AchievementEvent.ACHIEVE_KILL_BUTTON = "achieve_kill_button";
    AchievementEvent.ACHIEVE_CROW = "achieve_crow";
    return AchievementEvent;
})(egret.Event);
AchievementEvent.prototype.__class__ = "AchievementEvent";
