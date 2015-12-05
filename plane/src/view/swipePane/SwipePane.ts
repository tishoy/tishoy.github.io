/**
 * Created by tishoy on 15/2/5.
 * 滑动面板基类
 */
module egret {

    export class SwipePane extends Sprite{
        static FAST_DRAG_TIME: number = 200;
        static FAST_DRAG_DISTANCE:number = 50;

		public touchTime:number = 0;
		public startPosition:number;
		public dragPosition:number;
		
		public _itemList:Array<any>;
		
		public dragRect:Rectangle;
		public maxDragPosition:number;
		
		public _space:number = 0;
		public _pageIndex:number = 0;
		public _numPage:number = 0;
		public _pageSize:Point;
		public _lockToPage:boolean;
		public _isDrag:boolean;
		public _padding:number = 0;
		public _leading:number = 0;
		public onScrollEnd:Function;
		public onScrollEndParams:Array<any>;
		public _scrollEnabled:boolean = true;
		
		public constructor(){
			super();
			this.initView();
		}
		
		public initView():void{
			this.dragRect = new Rectangle();
			this.addEventListener(TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
			this.addEventListener(Event.REMOVED_FROM_STAGE, this.onRemoved, this);
		}
		
		private onRemoved(e:Event):void{
			this.onMouseUp();
		}
		
		public updateView():void{
			this.graphics.clear();
			while (this.numChildren){
				this.removeChildAt(0);
			}
			if (this._itemList == null || this._itemList.length == 0){
				return;
			}
			this.updateItems();
		}
		
		public updateSpace():void{
			//间距更新
		}
		
		public updateItems():void{
			
		}
		
		public onMouseDown(e:TouchEvent):void{
			this._isDrag = false;
			this.touchTime = getTimer();
			this.stage.addEventListener(TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
			this.stage.addEventListener(TouchEvent.TOUCH_END, this.onMouseUp, this);
		}
		
		public onMouseMove(e:TouchEvent):void{
			
		}
		
		public onMouseUp(e:TouchEvent = null):void{
			if (this.stage){
				this.stage.removeEventListener(TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
				this.stage.removeEventListener(TouchEvent.TOUCH_END, this.onMouseUp, this);
			}
		}
		
		public scrollToPage(pageIndex:number = 0):void{
			
		}
		
		public onScrollUpdate():void{
			this.scrollRect = this.dragRect;
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.position, 0, this.maxDragPosition));
		}
		
		public onScrollComplete():void{
			this.touchEnabled = true;
			if (this.onScrollEnd != null){
				this.onScrollEnd.apply(null, this.onScrollEndParams);
			}
		}
		
		public scrollTo(position:number, callback:Function = null, params:Array<any> = null):void{
			this.onScrollEnd = callback;
			this.onScrollEndParams = params;
		}
		
		public appendItem(item:DisplayObject):void{
			if (item == null){
				return;
			}
			this._itemList.push(item);
			this.addChild(item);
			this.updateSpace();
		}
		
		public insertAt(item:DisplayObject, index:number = 0):void{
			if (item == null){
				return;
			}
			this._itemList.splice(index, 0, item);
			this.addChildAt(item, index);
			this.updateSpace();
		}
		
		public removeAt(index:number = 0):void{
			if (index >= 0 && index < this._itemList.length){
				var item:DisplayObject = <DisplayObject><any> (this._itemList[index]);
				this._itemList.splice(index, 1);
				if (item){
					this.removeChild(item);
					this.updateSpace();
				}
			}
		}
		
		/**
		 * 项列表
		 */
		public get itemList():Array<any>{
			return this._itemList;
		}
		
		public set itemList(value:Array<any>){
			this._itemList = value;
			this.updateView();
		}
		
		/**
		 * 项间距
		 */
		public get space():number{
			return this._space;
		}
		
		public set space(value:number){
			this._space = value;
			this.updateSpace();
		}
		
		/**
		 * 锁定到单页
		 */
		public get lockToPage():boolean{
			return this._lockToPage;
		}
		
		public set lockToPage(value:boolean){
			this._lockToPage = value;
		}
		
		/**
		 * 页面大小
		 */
		public get pageSize():Point{
			return this._pageSize;
		}
		
		public set pageSize(value:Point){
			this._pageSize = value;
			this.dragRect.width = this._pageSize.x;
			this.dragRect.height = this._pageSize.y;
		}
		
		/**
		 * 当前页索引，从0开始
		 */
		public get pageIndex():number{
			return this._pageIndex;
		}
		
		public set pageIndex(value:number) {
		    this._pageIndex = value;
		}
		
		/**
		 * 总页数
		 */
		public get numPage():number{
			return this._numPage;
		}
		
		/**
		 * 是否已经拖动，防止点击按钮拖动时也触发按钮的点击操作
		 */
		public get isDrag():boolean{
			return this._isDrag;
		}
		
		/**
		 * 第一项和最后一项离页首和页尾的边距
		 */
		public get padding():number{
			return this._padding;
		}
		
		public set padding(value:number){
			this._padding = value;
		}
		
		/**
		 * 前导量
		 */
		public get leading():number{
			return this._leading;
		}
		
		public set leading(value:number){
			this._leading = value;
		}
		
		/**
		 * 滚动位置
		 */
		public get position():number{
			return 0;
		}
		
		public set position(value:number){
			
		}
		
		/**
		 * 最大滚动位置
		 */
		public get maxPosition():number{
			return this.maxDragPosition;
		}
		
		/**
		 * 内容宽度
		 */
		public get fullWidth():number{
			if (this._pageSize){
				return this._pageSize.x;
			}
			return 0;
		}
		
		/**
		 * 内容高度
		 */
		public get fullHeight():number{
			if (this._pageSize){
				return this._pageSize.y;
			}
			return 0;
		}
		
		public get scrollEnabled():boolean{
			return this._scrollEnabled;
		}
		
		public set scrollEnabled(value:boolean){
			this._scrollEnabled = value;
			if (this._scrollEnabled){
				this.addEventListener(TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
			}
			else{
				this.removeEventListener(TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
			}
		}
		
		public get itemCount():number{
			if (this._itemList){
				return this._itemList.length;
			}
			return 0;
		}
	}
}