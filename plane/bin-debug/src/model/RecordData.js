/**
 * Created by tishoy on 15/1/31.
 * 录像数据
 */
var RecordData = (function () {
    function RecordData() {
        this.recordedStep = [];
        if (RecordData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }
    var __egretProto__ = RecordData.prototype;
    RecordData.getInstance = function () {
        if (!this.instance) {
            this.instance = new RecordData();
        }
        return this.instance;
    };
    __egretProto__.initialize = function () {
        Global.addEventListener(GameEvent.GAME_VICTORY, this.onVictory, this);
        Global.addEventListener(GameEvent.GAME_CONTINUE, this.onContinue, this);
        Global.addEventListener(GameEvent.GAME_LOST, this.onLost, this);
    };
    __egretProto__.clear = function () {
        this.recordedStep = [];
    };
    __egretProto__.onVictory = function (e) {
        this.checkAchievement(AchievementTypeEnum.victoryType);
    };
    __egretProto__.onContinue = function (e) {
        this.checkAchievement(AchievementTypeEnum.keepingType);
    };
    __egretProto__.onLost = function (e) {
    };
    __egretProto__.recordStep = function (gridData, weapon) {
        if (weapon === void 0) { weapon = 0; }
        var stepData = new StepData();
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
    };
    /**
     * 通过类型，检验
     * @param type
     */
    __egretProto__.checkAchievement = function (type) {
        switch (type) {
            case AchievementTypeEnum.victoryType:
                //爱吃鸡翅膀
                if (AchievementData[0] == 0) {
                    if (this.recordedStep[this.currentStep].bodyType == BodyGridEnum.wing) {
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
                    var times;
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
    };
    __egretProto__.weaponInUsing = function () {
        var i, j;
        if (this.isFiring) {
            this.firingTime++;
            var beforeThisRoundLen = this.firingList.length;
            for (i = 0; i < beforeThisRoundLen; i++) {
                var nextRoundFire = WeaponEnum.getTriggers(WeaponEnum.fireBoomID, this.firingList[0].column, this.firingList[0].row);
                for (j = 0; j < nextRoundFire.length; j++) {
                    var fireGrid = MapData.getInstance().map[nextRoundFire[j]];
                    this.firingList.push(fireGrid);
                    var grid = PanelManager.gamePanel.getChildByName("grid" + fireGrid.gridValue);
                    grid.setStatu(true, true);
                }
                this.firingList.shift();
            }
        }
        if (this.isBirding) {
        }
    };
    return RecordData;
})();
RecordData.prototype.__class__ = "RecordData";
