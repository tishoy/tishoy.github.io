/**
 * Created by tishoy on 15/1/31.
 * 地图数据
 */
var MapData = (function () {
    function MapData() {
        this.columns = 9; //number    横向是数字 1-9 即九列
        this.rows = 9; //letter    竖向是字母 A-I 即九行
        this.numPlane = 0;
        this.map = [];
        this.hasBadPlane = false;
        if (MapData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = MapData.prototype;
    MapData.getInstance = function () {
        if (!this.instance) {
            this.instance = new MapData();
        }
        return this.instance;
    };
    __egretProto__.initialize = function () {
        this.numPlane = 0;
        this.map.length = this.columns * this.rows;
        for (var i = 0; i < this.map.length; i++) {
            this.map[i] = new GridData();
            this.map[i].gridValue = i;
            this.map[i].gridType = GridTypeEnum.miss;
        }
    };
    __egretProto__.clear = function () {
        this.numPlane = 0;
        for (var i = 0; i < this.map.length; i++) {
            this.map[i].gridType = GridTypeEnum.miss;
        }
    };
    __egretProto__.getMapGrid = function (column, row) {
        return this.map[(row * this.columns) + column];
    };
    __egretProto__.setMapGridTypeByPos = function (column, row, type) {
        this.map[(row * this.columns) + column].gridType = type;
    };
    __egretProto__.setMapGridTypeByValue = function (value, type) {
        this.map[value].gridType = type;
    };
    __egretProto__.setHeadDirection = function (value, direction) {
        this.map[value].direction = direction;
    };
    __egretProto__.setBodyTypeByValue = function (value, bodyType) {
        this.map[value].bodyType = bodyType;
    };
    /**
     * 检查防止飞机的格子，若其中有的格子已经放置过飞机，则返回false。
     * return true:表示这些所有格子都可以防止飞机。
     */
    __egretProto__.checkValid = function (headColumn, headRow, direction) {
        if (this.getMapGrid(headColumn, headRow).gridType == GridTypeEnum.miss) {
            var headPos = headRow * this.columns + headColumn;
            var plane = DirectionTypeEnum.getGridByDirection(direction);
            for (var i = 0; i < plane.length; i++) {
                if (this.map[headPos + plane[i]].gridType == GridTypeEnum.miss) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    };
    /**
     *  检查一种特殊情况，导致无法放置三架飞机。
     *  return true:表示可以不会出现放不下三架飞机的情况。
     */
    __egretProto__.checkForThreePlane = function (headColumn, headRow, direction) {
        //第二架飞机添加时，进入判断
        var headPos = this.columns * headRow + headColumn;
        var badList = BadPlaceEnum.badGridList;
        var badDirectionList = BadPlaceEnum.badGridDirectionList;
        var badLength = badList.length;
        for (var badGrid = 0; badGrid < badLength; badGrid++) {
            //若第二架飞机是badPlane，进入判断
            if (badList[badGrid] == headPos && badDirectionList[badGrid] == direction) {
                var testList = BadPlaceEnum.badGridTestList[badGrid];
                var testLength = testList.length;
                for (var testGrid = 0; testGrid < testLength; testGrid++) {
                    var headed = badList[testList[testGrid]];
                    var directed = badDirectionList[testList[testGrid]];
                    if (this.map[headed].gridType == GridTypeEnum.head && this.map[badList[headed] + DirectionTypeEnum.directionList[directed]].gridType == GridTypeEnum.body) {
                        egret.Logger.info("twice bad");
                        return false;
                    }
                    else {
                        egret.Logger.info("first time bad");
                        return true;
                    }
                }
            }
            else {
                egret.Logger.info("second time bad");
                return true;
            }
        }
    };
    //    /**
    //     *  检查一种特殊情况，导致无法放置三架飞机。
    //     *  return true:表示可以不会出现放不下三架飞机的情况。
    //     */
    //    checkForThreePlane(headColumn: number, headRow: number, direction: number): boolean {
    //        //第二架飞机添加时，进入判断
    //        if (this.numPlane == 1) {
    //            var headPos: number = this.columns * headRow + headColumn;
    //            var badList: number[] = BadPlaceEnum.badGridList;
    //            var badDirectionList: number[] = BadPlaceEnum.badGridDirectionList;
    //            var badLength:number = badList.length;
    //            //查询第二架飞机是否在badPlane行列中，有24种情况
    //            for (var badGrid = 0; badGrid < badLength; badGrid++) {
    //                //若第二架飞机是badPlane，进入判断
    //                if (badList[badGrid] == headPos && badDirectionList[badGrid] == direction) {
    //                    var testList: number[] = BadPlaceEnum.badGridTestList[badGrid];
    //                    var testLength: number = testList.length;
    //                    //此时再去查看第一架飞机的情况
    //                    for (var testGrid = 0; testGrid < testLength; testGrid++) {
    //                        var headed: number = badList[testList[testGrid]];
    //                        var directed: number = badDirectionList[testList[testGrid]];
    //                        if (this.map[headed] == GridTypeEnum.head && 
    //                            this.map[badList[headed] + DirectionTypeEnum.directionList[directed]] == GridTypeEnum.body) {
    //                            egret.Logger.info("twice bad");
    //                            return false;
    //                        } else {
    //                            egret.Logger.info("first time bad");
    //                            return true;
    //                        }
    //                    }
    //                } else {
    //                    egret.Logger.info("second time bad");
    //                    return true;
    //                }
    //            }
    //        } else {
    //            return true;
    //        }
    //    }
    __egretProto__.setPlaneGridByHead = function (headValue, direction) {
        return this.setPlaneGrid(headValue % 9, Math.floor(headValue / 9), direction);
    };
    __egretProto__.setPlaneGrid = function (headColumn, headRow, direction) {
        //先检查该飞机能否加入。
        if (!this.checkValid(headColumn, headRow, direction)) {
            return false;
        }
        //        if (this.numPlane == 0) {
        //            //再检查飞机是否是badPlane
        //            this.hasBadPlane = !this.checkForThreePlane(headColumn, headRow, direction);
        //        }
        //        if (this.numPlane == 1 && this.hasBadPlane) {
        //            //再检查飞机是否是badPlane
        //            if (!this.checkForThreePlane(headColumn, headRow, direction)) {
        //                return false;
        //            }
        //        }
        if (this.numPlane == 1) {
            //再检查飞机是否是badPlane
            if (!this.checkForThreePlane(headColumn, headRow, direction)) {
                return false;
            }
        }
        var headPos = this.columns * headRow + headColumn;
        this.setMapGridTypeByValue(headPos, GridTypeEnum.head);
        this.setHeadDirection(headPos, direction);
        var plane = DirectionTypeEnum.getGridByDirection(direction);
        for (var i = 0; i < plane.length; i++) {
            this.setMapGridTypeByValue(headPos + plane[i], GridTypeEnum.body);
            this.setBodyTypeByValue(headPos + plane[i], BodyGridEnum.getType(i));
        }
        return true;
    };
    return MapData;
})();
MapData.prototype.__class__ = "MapData";
