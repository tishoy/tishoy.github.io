/**
 * Created by tishoy on 15/2/5.
 * 竖向滑动面板
 */
module egret {

	export class VSwipePane extends SwipePane{
		private _fullHeight:number = 0;
		
		public constructor(){
			super();
			
		}
		
		public updateItems():void{
			var item:DisplayObject;
			var count:number = 0;
			var height:number = 0;
			for (var i:number = 0; i < this._itemList.length; ++i){
				item = this._itemList[i];
				if (item){
					item.x = this._leading;
					item.y = this._space * count;
					this.addChild(item);
					height = item.y + item.height;
					++count;
				}
			}
			this.drawBackgroundAndUpdateSize(height);
		}
		
		public updateSpace():void{
			if (this.numChildren == 0){
				return;
			}
			this.graphics.clear();
			var item:DisplayObject;
			var height:number = 0;
			for (var i:number = 0; i < this.numChildren; ++i){
				item = this.getChildAt(i);
				item.x = this._leading;
				item.y = this._space * i;
			}
			height = item.y + item.height;
			this.drawBackgroundAndUpdateSize(height);
		}
		
		private drawBackgroundAndUpdateSize(height:number):void{
			this._fullHeight = height;
			if (this._pageSize == null){
				return;
			}
			this.scrollRect = null;
			this.graphics.beginFill(0, 0);
			this.graphics.drawRect(0, 0, this._pageSize.x, height + this._padding);
			this.graphics.endFill();
			this._numPage = Math.ceil(height / this._pageSize.y);
			if (this._lockToPage){
				this.maxDragPosition = this._numPage * this._pageSize.y;
			}
			else{
				this.maxDragPosition = Math.max(height + this._padding - this._pageSize.y, 0);
			}
			if (this.dragRect.bottom > height){
				this.dragRect.y = this.maxDragPosition;
			}
			if (this.dragRect.y < 0){
				this.dragRect.y = 0;
			}
			this.scrollRect = this.dragRect;
			if (this._lockToPage){
				this.scrollToPage(Math.round(this.dragRect.y / this._pageSize.y));
			}
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.dragRect.y, 0, this.maxDragPosition));
		}
		
		public onMouseDown(e:TouchEvent):void{
			super.onMouseDown(e);
			this.startPosition = e.stageY;
			this.dragPosition = this.startPosition + this.dragRect.y;
		}
		
		public onMouseMove(e:TouchEvent):void{
			this.dragRect.y = this.dragPosition - e.stageY;
			if (this.dragRect.y < 0){
				this.dragRect.y = this.dragRect.y >> 3;
			}
			else if (this.dragRect.y > this.maxDragPosition){
				this.dragRect.y = this.maxDragPosition + ((this.dragRect.y - this.maxDragPosition) >> 3);
			}
			this.scrollRect = this.dragRect;
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.dragRect.y, 0, this.maxDragPosition));
		}
		
		public onMouseUp(e:TouchEvent = null):void{
			super.onMouseUp(e);
			var dragDistance:number = 0;
			if (e){
				dragDistance = Math.abs(e.stageY - this.startPosition);
				this._isDrag = dragDistance > 50;
                if (getTimer() - this.touchTime < SwipePane.FAST_DRAG_TIME && dragDistance > SwipePane.FAST_DRAG_DISTANCE)	//满足快速滑动{
					if (this._lockToPage){
						this.scrollToPage(e.stageY > this.startPosition ? this._pageIndex - 1 : this._pageIndex + 1);
					}
					else{
						this.scrollTo(this.dragRect.y + (this.startPosition - e.stageY) * 3);
					}
					return;
                }  
			if (this._lockToPage){
				this.scrollToPage(Math.round(this.dragRect.y / this._pageSize.y));
			}
			else{
				this.scrollTo(this.dragRect.y);
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
            Tween.get(this.dragRect).to({ y: this._pageIndex * this._pageSize.y}, 300).call(this.onScrollUpdate).call(this.onScrollComplete);
		}
		
		public scrollTo(position:number, callback:Function = null, params:Array<any> = null):void{
			super.scrollTo(position, callback, params);
			if (position < 0){
				position = 0;
			}
			else if (position > this.maxDragPosition){
				position = this.maxDragPosition;
			}
			if (this.dragRect.y == position){
				if (callback != null){
					callback.apply(null, params);
				}
				return;
			}
			this.touchEnabled = false;
            Tween.get(this.dragRect).to({ y: position }, 300).call(this.onScrollUpdate).call(this.onScrollComplete);
		}
		
		public get position():number{
			return this.dragRect.y;
		}
		
		public set position(value:number){
			if (value < 0){
				value = 0;
			}
			else if (value > this.maxDragPosition){
				value = this.maxDragPosition;
			}
			this.dragRect.y = value;
			this.scrollRect = this.dragRect;
		}
		
		public get fullHeight():number{
			return this._fullHeight;
		}
		
		public set scrollRect(value:Rectangle) {
		    super._setScrollRect(value);
			this.dispatchEvent(new ScrollEvent(ScrollEvent.SCROLL, this.dragRect.y, 0, this.maxDragPosition));
		}
		
		public set pageIndex(value:number){
			if (value < 0){
				value = 0;
			}
			else if (value >= this._numPage){
				value = this._numPage - 1;
			}
			this._pageIndex = value;
			this.dragRect.y = this._pageIndex * this._pageSize.y;
			this.scrollRect = this.dragRect;
		}
	}
}