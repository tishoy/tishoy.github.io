/**
 * Created by tishoy on 15/1/31.
 * 身体枚举，需要与DirectionTypeEnum搭配使用
 */
class BodyGridEnum {
    static bone: number = 1;
    static wing: number = 6;
    static tail: number = 7;
    static bottom: number = 8;

    static getType(indexOfBodyGrid: number): number {
        if (indexOfBodyGrid <= BodyGridEnum.bone) {
            return BodyGridEnum.bone;
        } else if (indexOfBodyGrid <= BodyGridEnum.wing) {
        return BodyGridEnum.wing;
        } else if (indexOfBodyGrid <= BodyGridEnum.tail) {
            return BodyGridEnum.tail;
        }else if (indexOfBodyGrid == BodyGridEnum.bottom) {
            return BodyGridEnum.bottom;
        }
    }
} 