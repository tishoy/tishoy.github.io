
module egret {

	export class ScrollEvent extends Event{
		public static SCROLL:string = "component_scroll";
		
		public static ITEM_SCROLL:string = "component_item_scroll";
		
		private _minPosition:number;
		private _maxPosition:number;
		private _position:number;
		
		public constructor(type:string, pos:number, min:number, max:number, bubbles:boolean = false, cancelable:boolean = false){
			super(type, bubbles, cancelable);
			this._minPosition = min;
			this._maxPosition = max;
			this._position = pos;
		}
		
//		public toString():string{
//			return this.formatToString("ScrollEvent", "type", "position", "minPosition", "maxPosition", "bubbles", "cancelable", "eventPhase");
//		}
		
		public get minPosition():number{
			return this._minPosition;
		}
		
		public get maxPosition():number{
			return this._maxPosition;
		}
		
		public get position():number{
			return this._position;
		}
	}
}