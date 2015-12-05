var egret;
(function (egret) {
    var ScrollEvent = (function (_super) {
        __extends(ScrollEvent, _super);
        function ScrollEvent(type, pos, min, max, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this._minPosition = min;
            this._maxPosition = max;
            this._position = pos;
        }
        var __egretProto__ = ScrollEvent.prototype;
        Object.defineProperty(__egretProto__, "minPosition", {
            //		public toString():string{
            //			return this.formatToString("ScrollEvent", "type", "position", "minPosition", "maxPosition", "bubbles", "cancelable", "eventPhase");
            //		}
            get: function () {
                return this._minPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxPosition", {
            get: function () {
                return this._maxPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            get: function () {
                return this._position;
            },
            enumerable: true,
            configurable: true
        });
        ScrollEvent.SCROLL = "component_scroll";
        ScrollEvent.ITEM_SCROLL = "component_item_scroll";
        return ScrollEvent;
    })(egret.Event);
    egret.ScrollEvent = ScrollEvent;
    ScrollEvent.prototype.__class__ = "egret.ScrollEvent";
})(egret || (egret = {}));
