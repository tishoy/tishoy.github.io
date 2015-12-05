/**
 * Created by tishoy on 15/1/31.
 * 每个格子数据
 */
class GridData {
    private _row: number;
    private _column: number;
    private _gridValue: number;
    private _gridType: number;
    private _direction: number;
    private _bodyType:number;

    public get row(): number {
        return Math.floor(this._gridValue /9);
    }

    public get column(): number {
        return this._gridValue % 9;
    }

    public get gridValue(): number {
        return this._gridValue;
    }

    public set gridValue(value: number) {
        this._gridValue = value;
    }

    public get gridType(): number {
        return this._gridType;
    }

    public set gridType(value: number) {
        this._gridType = value;
    }

    public get direction(): number {
        return this._direction;
    }

    public set direction(value: number) {
        this._direction = value;
    }

    get bodyType(): number {
        return this._bodyType;
    }

    set bodyType(value: number) {
        this._bodyType = value;
    }
} 