/**
 * Created by tishoy on 15/1/31.
 * 副本数据
 */
var CopyData = (function () {
    function CopyData() {
        if (CopyData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = CopyData.prototype;
    CopyData.getInstance = function () {
        if (!this.instance) {
            this.instance = new CopyData();
        }
        return this.instance;
    };
    __egretProto__.initialize = function () {
        this.copyList = RES.getRes("copy");
        this.currentCopy = 0;
        //this.currentCopy = NativeApi.getLocalData("copy");
        this.copyStarList = [];
        for (var i = 0; i < this.currentCopy; i++) {
        }
    };
    __egretProto__.saveCopyStar = function (step) {
        if (step >= 0) {
            if (step > this.oneStar - this.doubleStar) {
                if (step > this.oneStar - this.tripleStar) {
                    this.copyStarList[this.currentCopy] = 3;
                }
                this.copyStarList[this.currentCopy] = 2;
            }
            this.copyStarList[this.currentCopy] = 1;
        }
        NativeApi.setLocalData("copy" + this.currentCopy, this.copyStarList[this.currentCopy].toString());
    };
    __egretProto__.nextCopy = function () {
        this.currentCopy++;
        //this.copyStart(this.currentCopy);
    };
    return CopyData;
})();
CopyData.prototype.__class__ = "CopyData";
