class GameEvent extends egret.Event {
    static GAME_START: string = "game_start";
    static GAME_CONTINUE: string = "game_continue";
    static GAME_VICTORY: string = "game_victory";
    static GAME_LOST: string = "game_lost";
    static GAME_RESET:string = "game_reset";

    constructor(type: string, bubbles: boolean= false, cancelable: boolean= false) {
        super(type, bubbles, cancelable);
    }
} 