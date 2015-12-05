var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var __egretProto__ = GameEvent.prototype;
    GameEvent.GAME_START = "game_start";
    GameEvent.GAME_CONTINUE = "game_continue";
    GameEvent.GAME_VICTORY = "game_victory";
    GameEvent.GAME_LOST = "game_lost";
    GameEvent.GAME_RESET = "game_reset";
    return GameEvent;
})(egret.Event);
GameEvent.prototype.__class__ = "GameEvent";
