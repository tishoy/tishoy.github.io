var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    GameEvent.GAME_START = "game_start";
    GameEvent.GAME_CONTINUE = "game_continue";
    GameEvent.GAME_VICTORY = "game_victory";
    GameEvent.GAME_LOST = "game_lost";
    GameEvent.GAME_RESET = "game_reset";
    return GameEvent;
})(egret.Event);
GameEvent.prototype.__class__ = "GameEvent";
