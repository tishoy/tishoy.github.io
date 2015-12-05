/**
 * Created by tishoy on 15/1/31.
 * 身体枚举，需要与DirectionTypeEnum搭配使用
 */
var BodyGridEnum = (function () {
    function BodyGridEnum() {
    }
    var __egretProto__ = BodyGridEnum.prototype;
    BodyGridEnum.getType = function (indexOfBodyGrid) {
        if (indexOfBodyGrid <= BodyGridEnum.bone) {
            return BodyGridEnum.bone;
        }
        else if (indexOfBodyGrid <= BodyGridEnum.wing) {
            return BodyGridEnum.wing;
        }
        else if (indexOfBodyGrid <= BodyGridEnum.tail) {
            return BodyGridEnum.tail;
        }
        else if (indexOfBodyGrid == BodyGridEnum.bottom) {
            return BodyGridEnum.bottom;
        }
    };
    BodyGridEnum.bone = 1;
    BodyGridEnum.wing = 6;
    BodyGridEnum.tail = 7;
    BodyGridEnum.bottom = 8;
    return BodyGridEnum;
})();
BodyGridEnum.prototype.__class__ = "BodyGridEnum";
