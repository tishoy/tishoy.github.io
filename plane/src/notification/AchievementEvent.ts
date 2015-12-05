/**
 * Created by tishoy on 15/2/2.
 */
class AchievementEvent extends egret.Event {
    static ACHIEVE_LOVE_WINGS: string = "achieve_love_wings";
    static ACHIEVE_KILL_BUTTON: string = "achieve_kill_button";
    static ACHIEVE_CROW: string = "achieve_crow";

    constructor(type: string, bubbles: boolean= false, cancelable: boolean= false) {
        super(type, bubbles, cancelable);
    }
}