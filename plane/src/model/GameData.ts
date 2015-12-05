/**
 * Created by tishoy on 15/1/31.
 * 游戏主数据
 * 这里并未使用dily提供的GlobalData，因为所需数据多且分散，所以使用许多Data分别记录。
 */
class GameData{
    private static instance: GameData;
    public model: number;
    private _keeping:boolean = false;
    private _hitTimes: number;
    private _missTimes: number;
    private _bodyTimes: number;
    private _headTimes: number;
    mapName:string;
    private _lastSetp: number;
    private _result: number;

    constructor() {
        if (GameData.instance) {
            throw new Error("single instance error");
        }
        this.initialize();
    }

    static getInstance(): GameData {
        if (!this.instance) {
            this.instance = new GameData();
        }
        return this.instance;
    }

    initialize(): void {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
        this._lastSetp = 0;
        this.model = 0;
    }

    clear(): void {
        this._hitTimes = 0;
        this._missTimes = 0;
        this._bodyTimes = 0;
        this._headTimes = 0;
    }

    set hitTimes(value: number) {
        this._hitTimes = value;
    }

    get hitTimes(): number {
        return this._hitTimes;
    }

    set missTimes(value: number) {
        this._missTimes = value;
    }

    get missTimes(): number {
        return this._missTimes;
    }

    set bodyTimes(value: number) {
        this._bodyTimes = value;
    }

    get bodyTimes(): number {
        return this._bodyTimes;
    }

    set headTimes(value: number) {
        this._headTimes = value;
    }

    get headTimes(): number {
        return this._headTimes;
    }

    set lastStep(value: number) {
        this._lastSetp = value;
    }

    get lastStep(): number {
        return this._lastSetp;
    }

    set keeping(value: boolean) {
        if (this._keeping == value) {
            if (this._keeping == true) {
                Global.dispatchEvent(GameEvent.GAME_CONTINUE,null,false);
                if (this.headTimes == 3) {
                    this._result = GameResultEnum.victory;
                    GameController.getInstance().endGame();
                    CopyData.getInstance().saveCopyStar(this._lastSetp);
                    Global.dispatchEvent(GameEvent.GAME_VICTORY,null,false);
                } else if (this.model == GameModelEnum.advanture && this.lastStep == 0) {
                    console.log("3");
                    this._result = GameResultEnum.lost;
                    GameController.getInstance().endGame();
                    Global.dispatchEvent(GameEvent.GAME_LOST, null, false);
                }
            } else {
                Global.dispatchEvent(GameEvent.GAME_RESET, null, false);
            }
            return;
        } else {
            this._keeping = value;
            if (this._keeping) {
                Global.dispatchEvent(GameEvent.GAME_START, null, false);
            } 
        }
    }

    get keeping():boolean {
        return this._keeping;
    }

    get result(): number {
        return this._result;
    }
}