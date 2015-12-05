/**
 * Created by tishoy on 15/1/31.
 * 副本数据
 */
class CopyData {
    private static instance: CopyData;
    currentCopy:number;
    copyList:Array<any>;
    oneStar:number;
    doubleStar:number;
    tripleStar: number;
    copyStarList: number[];

    constructor() {
        if (CopyData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): CopyData {
        if (!this.instance) {
            this.instance = new CopyData();
        }
        return this.instance;
    }

    initialize(): void {
        this.copyList = RES.getRes("copy");
        this.currentCopy = 0;
        //this.currentCopy = NativeApi.getLocalData("copy");
        this.copyStarList = [];
        for(var i:number = 0; i < this.currentCopy; i++){
            //this.copyStarList[i] = NativeApi.getLocalData("copy"+i);
        }
    }

    saveCopyStar(step:number):void {
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
    }

    nextCopy(): void{
        this.currentCopy++;
        //this.copyStart(this.currentCopy);
    }
} 