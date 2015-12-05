/**
 * Created by tishoy on 15/1/31.
 * 每个格子数据
 */
var GridData = (function () {
    function GridData() {
    }
    var __egretProto__ = GridData.prototype;
    Object.defineProperty(__egretProto__, "row", {
        get: function () {
            return Math.floor(this._gridValue / 9);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "column", {
        get: function () {
            return this._gridValue % 9;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "gridValue", {
        get: function () {
            return this._gridValue;
        },
        set: function (value) {
            this._gridValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "gridType", {
        get: function () {
            return this._gridType;
        },
        set: function (value) {
            this._gridType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (value) {
            this._direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "bodyType", {
        get: function () {
            return this._bodyType;
        },
        set: function (value) {
            this._bodyType = value;
        },
        enumerable: true,
        configurable: true
    });
    return GridData;
})();
GridData.prototype.__class__ = "GridData";
