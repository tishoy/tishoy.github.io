/**
 * Created by tishoy on 15/2/5.
 * 横向滑动面板
 */
module egret {

	export class HSwipePane extends SwipePane{
		private _fullWidth:number = 0;
		
		public constructor(){
			super();
			
		}
		
		public updateItems():void{
			var item:DisplayObject;
			var count:number = 0;
			var width:number = 0;
			for (var i:number = 0; i < this._itemList.length; ++i){
				item = this._itemList[i];
				if (item){
					item.x = this._padding + this._space * count;
					item.y = this._leading;
					this.addChild(item);
					width = item.x + item.width;
					++count;
				}
			}
			this.drawBackgroundAndUpdateSize(width);
		}
		
		public updateSpace():void{
			if (this.numChildren == 0){
				return;
			}
			this.graphics.clear();
			var width:number = 0;
			var item:DisplayObject;
			for (var i:number = 0; i < this.numChildren; ++i){
				item = this.getChildAt(i);
				item.x = this._space * i;
				item.y = this._leading;
			}
			width = item.x + item.width;
			this.drawBackgroundAndUpdateSize(width);
		}
		
		private drawBackgroundAndUpdateSize(width:number):void{
			this._fullWidth = width;
			if (this._pageSize == null){
				return;
			}
			this.scrollRect = null;
			this.graphics.beginFill(0, 0);
			this.graphics.drawRect(0, 0, width + this._padding, this._pageSize.y);
			this.graphics.endFill();
			this._numPage = Math.ceil(width / this._pageSize.x);
			if (this._lockToPage){
				this.maxDragPosition = this._numPage * this._pageSize.x;
			}
			else{
				this.maxDragPosition = Math.max(width + this._padding - this._pageSize.x, 0);
			}
			if (this.dragRect.right > width){
				this.dragRect.x = this.maxDragPosition;
			}
			if (this.dragRect.x < 0){
				this.dragRect.x = 0;
			}
			this.scrollRect = this.dragRect;
			if (this._lockToPage){
				this.scrollToPage(Math.round(this.dragRect.x / this._pageSize.x));
			}
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.dragRect.x, 0, this.maxDragPosition));
		}
		
		public onMouseDown(e:TouchEvent):void{
			super.onMouseDown(e);
			this.startPosition = e.stageX;
			this.dragPosition = this.startPosition + this.dragRect.x;
		}
		
		public onMouseMove(e:TouchEvent):void{
			this.dragRect.x = this.dragPosition - e.stageX;
			if (this.dragRect.x < 0){
				this.dragRect.x = this.dragRect.x >> 3;
			}
			else if (this.dragRect.x > this.maxDragPosition){
				this.dragRect.x = this.maxDragPosition + ((this.dragRect.x - this.maxDragPosition) >> 3);
			}
			this.scrollRect = this.dragRect;
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.dragRect.x, 0, this.maxDragPosition));
		}
		
		public onMouseUp(e:TouchEvent = null):void{
			super.onMouseUp(e);
			var dragDistance:number = 0;
			if (e){
				dragDistance = this.startPosition - e.stageX;
				this._isDrag = Math.abs(dragDistance) > 50;
                if (getTimer() - this.touchTime < SwipePane.FAST_DRAG_TIME && Math.abs(dragDistance) > SwipePane.FAST_DRAG_DISTANCE){
					if (this._lockToPage){
						this.scrollToPage(e.stageX > this.startPosition ? this._pageIndex - 1 : this._pageIndex + 1);
					}
					else{
						this.scrollTo(this.dragRect.x + dragDistance * 3);
					}
					return;
				}
			}
			if (this._lockToPage){
				this.scrollToPage(Math.round(this.dragRect.x / this._pageSize.x));
			}
			else{
				this.scrollTo(this.dragRect.x);
			}
		}
		
		public scrollToPage(pageIndex:number = 0):void{
			if (pageIndex < 0){
				pageIndex = 0;
			}
			else if (pageIndex >= this._numPage){
				pageIndex = this._numPage - 1;
			}
			this._pageIndex = pageIndex;
			this.touchEnabled = false;
            Tween.get(this.dragRect).to({ x: this._pageIndex * this._pageSize.x}, 300).call(this.onScrollUpdate, this).call(this.onScrollComplete, this);
		}
		
		public scrollTo(position:number, callback:Function = null, params:Array<any> = null):void{
			super.scrollTo(position, callback, params);
			if (position < 0){
				position = 0;
			}
			else if (position > this.maxDragPosition){
				position = this.maxDragPosition;
			}
			if (this.dragRect.x == position){
				if (callback != null){
					callback.apply(null, params);
				}
				return;
			}
			this.touchEnabled = false;
            Tween.get(this.dragRect).to({ x: position }, 300).call(this.onScrollUpdate, this).call(this.onScrollComplete,this);
		}
		
		public get position():number{
			return this.dragRect.x;
		}
		
		public set position(value:number){
			if (value < 0){
				value = 0;
			}
			else if (value > this.maxDragPosition){
				value = this.maxDragPosition;
			}
			this.dragRect.x = value;
			this.scrollRect = this.dragRect;
		}
		
		public get maxPosition():number{
			return this.maxDragPosition;
		}
		
		public get fullWidth():number{
			return this._fullWidth;
		}
		
		public set pageIndex(value:number){
			if (value < 0){
				value = 0;
			}
			else if (value >= this._numPage){
				value = this._numPage - 1;
			}
			this._pageIndex = value;
			this.dragRect.x = this._pageIndex * this._pageSize.x;
			this.scrollRect = this.dragRect;
		}
	}
}