/**
 * Created by tishoy on 15/1/31.
 * 游戏主控制器   另外的控制器在core中的Globel
 */
class GameController {
    private static instance: GameController;

    private mapData: MapData;
    private gameData:GameData;
    private copyData:CopyData;
    private weaponData:WeaponData;
    private recordData:RecordData;
    private random: boolean = true;

    constructor() {
        if (GameController.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): GameController {
        if (!this.instance) {
            this.instance = new GameController();
        }
        return this.instance;
    }

    initialize(): void {
        this.mapData = MapData.getInstance();
        this.gameData = GameData.getInstance();
        this.copyData = CopyData.getInstance();
        this.weaponData = WeaponData.getInstance();
        this.recordData = RecordData.getInstance();
    }

    initMap():void {
        this.mapData.initialize();
    }

    startCopy(copy: number = 0): void {
        this.mapData.clear();
        this.gameData.clear();
        this.gameData.model = GameModelEnum.advanture;
        this.gameData.keeping = false;
        if (copy == 0) {
            this.loadMap(CopyData.getInstance().currentCopy);
        } else {
            this.loadMap(copy);
        }
    }

    nextCopy(): void {
        //this.copy++;
        //this.startCopy(this.copy);
        //NativeApi.setLocalData("copy", this.copy.toString());
    }

    loadMap(copy:number):void {
        var currentMap: any = this.copyData.copyList[copy];
        this.gameData.mapName = currentMap.name;
        var headList:Array<number> = currentMap.head;
        var directionList:Array<number> = currentMap.direction;
        var lightList: Array<number> = currentMap.light;
        var starList: Array<number> = currentMap.step;
        this.gameData.lastStep = starList[0];
        this.copyData.oneStar = starList[0];
        this.copyData.doubleStar = starList[1];
        this.copyData.tripleStar = starList[2];
        for (var i = 0; i < headList.length; i++) {
            this.mapData.setPlaneGridByHead(headList[i], directionList[i]);
        }
        for (var j = 0; j < lightList.length; j++) {
            var grid: GridView = <GridView>PanelManager.gamePanel.getChildByName("grid" + (lightList[j].toString()));
            if (this.mapData.map[lightList[j]].gridType == GridTypeEnum.head) {
                this.gameData.headTimes++;
            }
            grid.setStatu(true);
        }
        this.startGame();
    }

    commonGame(): void {
        this.mapData.clear();
        this.gameData.clear();
        this.gameData.model = GameModelEnum.common;
        this.gameData.keeping = false;
        while (this.mapData.numPlane < 3) {
            this.addPlane();
            if (this.mapData.numPlane == 3) {
                this.startGame();
            }
        }
    }

    infiniteGame(): void {
       
    }

    getGridViewType(column: number, row: number, weaponTrigger:boolean): number {
        var grid: GridData = MapData.getInstance().getMapGrid(column, row);
        if (GameData.getInstance().keeping) {
            GameController.getInstance().logHitResult(grid.gridType, weaponTrigger);
            if (!weaponTrigger) {
                this.recordData.recordStep(grid, PanelManager.gamePanel.selectedWeapon);
            } else {
                this.recordData.recordStep(grid);
            }
            //this.recordData.weaponInUsing();
        }
        return grid.gridType;
    }

    logHitResult(gridType: number, weaponTrigger:boolean): void {
        switch (gridType) {
            case GridTypeEnum.head:
                this.gameData.headTimes++;
                break;

            case GridTypeEnum.body:
                if (this.gameData.keeping) {
                    this.gameData.bodyTimes++;
                }
                break;

            case GridTypeEnum.miss:
                if (this.gameData.keeping) {
                    this.gameData.missTimes++;
                }
                break;

            default:
                egret.Logger.info("no this grid type");
                return;
        }
        if (this.gameData.keeping && !weaponTrigger) {
            this.gameData.hitTimes++;
            if (this.gameData.model == GameModelEnum.advanture) {
                this.gameData.lastStep--;
            }
        }
        this.gameData.keeping = this.gameData.keeping;
    }

    addPlane(): void {
        var direction: number = 0;
        var headColumn: number = 0;
        var headRow: number = 0;
        
        if (this.random) {
            direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case DirectionTypeEnum.up:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.right:
                    headColumn = 3 + Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
                case DirectionTypeEnum.down:
                    headColumn = 2 + Math.floor(Math.random() * 5);
                    headRow = 3 + Math.floor(Math.random() * 6);
                    break;
                case DirectionTypeEnum.left:
                    headColumn = Math.floor(Math.random() * 6);
                    headRow = 2 + Math.floor(Math.random() * 5);
                    break;
            }
            //处理特殊情况，无法放置三架飞机的情况！！！
            if (this.mapData.setPlaneGrid(headColumn, headRow, direction)) {
                this.mapData.numPlane++;
            } 
        }
    }

    endGame(): void {
        this.gameData.keeping = false;
        //Global.dispatchEvent(MainNotify.closeGameOverPanelNotify, null, false);
    }

    startGame(): void {
        this.gameData.keeping = true;
    }

    useWeapon(column:number, row:number):void {
        var selectedValue:number = row * 9 + column;
        var grid: GridView;
        var weapon = PanelManager.gamePanel.selectedWeapon;
        if (!this.weaponData.checkWeaponQuantity(weapon)) {
            return;
        }
        grid = <GridView>PanelManager.gamePanel.getChildByName(("grid" + selectedValue).toString());
        grid.setStatu(true, false);
        switch (weapon) {
            case WeaponEnum.radarID:
                var weaponTriggers:number[] = WeaponEnum.getTriggers(WeaponEnum.radarID, column, row);
                for (var i = 0; i < weaponTriggers.length; i++) {
                    grid = <GridView>PanelManager.gamePanel.getChildByName("grid" + ((weaponTriggers[i] + selectedValue).toString()));
                    grid.setStatu(true, true);
                }
                this.weaponData.radar--;
                break;

            case WeaponEnum.fireBoomID:
                this.recordData.isFiring = true;
                this.recordData.firingList.push(this.mapData.getMapGrid(grid.column,grid.row));
                this.weaponData.fireBoom--;
                break;

            case WeaponEnum.angryBirdID:
                this.weaponData.angryBird--;
                break;

            case WeaponEnum.scudID:
                this.weaponData.scud--;
                break;
        }
        WeaponData.getInstance().updateWeaponQuantity();
    }

    buyWeapon(weapon:number):void {
        this.weaponData.radar++;
    }
} 