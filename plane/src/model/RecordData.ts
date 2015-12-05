/**
 * Created by tishoy on 15/1/31.
 * 录像数据
 */
class RecordData {
    private static instance: RecordData;

    private recordedStep: StepData[] = [];
    private currentStep: number;
    private wings: number; 
    private bottom: number;

    isFiring:boolean;
    private firingTime:number;
    firingList:GridData[];
    isBirding:boolean;

    constructor() {
        if (RecordData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): RecordData {
        if (!this.instance) {
            this.instance = new RecordData();
        }
        return this.instance;
    }

    initialize(): void {
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.onContinue, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    }

    clear() {
        this.recordedStep = [];
    }

    private onVictory(e:GameEvent):void {
        this.checkAchievement(AchievementTypeEnum.victoryType);
    }

    private onContinue(e:GameEvent):void {
        this.checkAchievement(AchievementTypeEnum.keepingType);
    }

    private onLost(e:GameEvent):void {

    }

    recordStep(gridData:GridData, weapon:number = 0): void {
        var stepData: StepData = new StepData();
        this.currentStep++;
        stepData.step = this.currentStep;
        stepData.row = gridData.row;
        stepData.column = gridData.column;
        stepData.grid = gridData.gridValue;
        stepData.weapon = weapon;
        stepData.type = gridData.gridType;
        if (stepData.type == GridTypeEnum.body) {
            stepData.bodyType = gridData.bodyType;
        }
        this.recordedStep.push(stepData);
    }

    /**
     * 通过类型，检验
     * @param type
     */
    checkAchievement(type:number): void {
        switch (type) {
            //尚未确定成就表的模式，没有策划~也是个蛋疼的事，需要自己拟定表格了。
            //爱吃鸡翅膀的成就
            case AchievementTypeEnum.victoryType:
                //爱吃鸡翅膀
                if (AchievementData[0] == 0) {
                    if (this.recordedStep[this.currentStep].bodyType ==BodyGridEnum.wing) {
                        this.wings++;
                        if (this.wings > 5) {
                            Global.dispatchEvent(AchievementEvent.ACHIEVE_LOVE_WINGS);
                        }
                    }
                }
                if (AchievementData[1] == 0) {
                    //获得摧菊之手的成就
                    if (this.recordedStep[this.currentStep].bodyType == BodyGridEnum.bottom) {
                        this.bottom++;
                        if (this.bottom == 3 && this.currentStep < 10) {
                            Global.dispatchEvent(AchievementEvent.ACHIEVE_KILL_BUTTON);
                        }
                    }
                }
                break;

            case AchievementTypeEnum.keepingType:
                //乌鸦叫的判断
                if (AchievementData[2] == 0) {
                    var times:number;
                    for (var i = 0; i < 3; i++) {
                        if (this.recordedStep[this.currentStep - i].type == GridTypeEnum.miss) {
                            times++;
                        }
                    }
                    if (times == 3) {
                        Global.dispatchEvent(AchievementEvent.ACHIEVE_CROW);
                    }
                }
                break;

            case AchievementTypeEnum.copyType:

                break;
        }
    }

    weaponInUsing():void {
        var i,j;
        if (this.isFiring) {
            this.firingTime++;
            var beforeThisRoundLen:number = this.firingList.length;
            for (i = 0; i < beforeThisRoundLen; i++) {
                var nextRoundFire:number[] = WeaponEnum.getTriggers(WeaponEnum.fireBoomID, this.firingList[0].column, this.firingList[0].row);
                for (j = 0; j < nextRoundFire.length; j++) {
                    var fireGrid:GridData = MapData.getInstance().map[nextRoundFire[j]];
                    this.firingList.push(fireGrid);
                    var grid: GridView = <GridView>PanelManager.gamePanel.getChildByName("grid" + fireGrid.gridValue);
                    grid.setStatu(true, true);
                }
                this.firingList.shift();
            }
        }
        if (this.isBirding) {
        }
    }
} 