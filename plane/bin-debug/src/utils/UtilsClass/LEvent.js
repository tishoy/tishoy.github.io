/**
 * Created by d8q8 on 2014/8/12.
 * @module Lcp
 * @class LEvent
 * @constructor
 */
var lcp;
(function (lcp) {
    /**
     * 自定义事件类
     */
    var LEvent = (function (_super) {
        __extends(LEvent, _super);
        function LEvent(type, obj, bubbles, cancelable) {
            if (obj === void 0) { obj = null; }
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.CLASS_NAME = "LEvent";
            if (obj) {
                this._obj = obj;
            }
        }
        var __egretProto__ = LEvent.prototype;
        __egretProto__.clone = function (obj) {
            return new LEvent(this.type, obj ? obj : this._obj, this.bubbles, this.cancelable);
        };
        __egretProto__.toString = function () {
            console.log(this.CLASS_NAME, "type", "bubbles", "cancelable");
        };
        Object.defineProperty(__egretProto__, "param", {
            /**
             * 传参获取
             * @returns {Object}
             */
            get: function () {
                return this._obj;
            },
            enumerable: true,
            configurable: true
        });
        return LEvent;
    })(egret.Event);
    lcp.LEvent = LEvent;
    LEvent.prototype.__class__ = "lcp.LEvent";
})(lcp || (lcp = {}));
