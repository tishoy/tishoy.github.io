
module egret {

	export class CooldownEffect extends Sprite{
		public static COOLDOWN_END:string = "eventEnd"; //结束事件
		public static COOLDOWN_START:string = "eventStart"; //开始事件
		public color:number = 0x000000; // 颜色
		public alphaC:number = 0.6; // 透明度
		public isAnti:boolean = false; // 是否逆时针（剩余的比过去的时间亮）
		public isRect:boolean = false; // 是否矩形
		public a:number; // 矩形半宽，椭圆的a
		public b:number; // 矩形半高，椭圆的b
		public startFrom:number = 270; // 从270度开始画
		public delay:number = 0; // 延迟时间，负数表示已经过了多久（单位：毫秒）
		public duration:number = 0; // CD时间，单位：毫秒
		public isCooling:boolean = false; // 是否正在冷却
		public startTime:number = 0; // 开始冷却的时刻
		public basePos:Point;
		public rect:Rectangle;
		
		/**
		 * 技能冷却效果类
		 * @param w 宽或椭圆的a * 2
		 * @param h 高或椭圆的b * 2
		 * @param $bRect 矩形还是圆形，true为矩形，false为圆形
		 * @param $isHighLight 是否剩余的比过去的时间亮
		 */
		public constructor(w:number, h:number = 0, isRect:boolean = true, isHighLight:boolean = false){
			super();
			this.touchChildren = false;
			this.touchEnabled = false;
			this.isRect = isRect;
			this.isAnti = isHighLight;
			this.setSize(w, h);
		}
		
		public setSize(w:number, h:number):void{
			h == 0 && (h = w);
			if (this.isRect){
				this.a = w * Math.SQRT1_2;
				this.b = h * Math.SQRT1_2;
			}
			else{
				this.a = w * 0.5;
				this.b = h * 0.5;
			}
			this.basePos = new Point(w * 0.5, h * 0.5);
			this.rect = new Rectangle(0, 0, w, h);
			this.scrollRect = this.rect;
		}
		
		/**
		 * 开始冷却
		 * @param $duration 冷却周期（单位：毫秒）
		 * @param $delay 延迟时间，负数表示已经过了多久（单位：毫秒）
		 * @param $enforce 强制刷新时间
		 */
		public start($duration:number, $delay:number = 0, $enforce:boolean = false):void{
			var time:number = getTimer();
			if (!$enforce && this.isCooling){
				if (($duration + $delay) < (this.duration + this.delay - (time - this.startTime))){
					// 如果新的冷却时间比原来的还短，不更新
					return;
				}
				this.stop();
			}
			this.duration = $duration;
			this.delay = $delay;
			this.startTime = time;
			this.isCooling = true;
			this.addEventListener(Event.ENTER_FRAME, this.draw, this);
			this.dispatchEvent(new Event(CooldownEffect.COOLDOWN_START)); //派发事件
		}
		
		/**
		 * 停止冷却
		 */
		public stop():void{
			this.isCooling = false;
			this.removeEventListener(Event.ENTER_FRAME, this.draw, this);
			this.dispatchEvent(new Event(CooldownEffect.COOLDOWN_END)); //派发事件
		}
		
		/**
		 * 清除效果，停止冷却
		 */
		public reset():void{
			this.stop();
			this.clear();
		}
		
		/**
		 * 清除效果
		 */
		private clear():void{
			this.graphics.clear();
		}
		
		public draw(e:Event):void{
			this.clear();
			var timePast:number = getTimer() - this.startTime - this.delay;
			if (timePast >= this.duration){
				// 冷却结束
				this.stop();
				return;
			}
			else if (timePast <= 0) {
				var angle:number = 0;
			}
			else{
				angle = timePast * 360 / this.duration;
			}
			this.drawBack();
			this.drawAngle(angle);
		}
		
		public drawBack():void{
			this.graphics.beginFill(0xffcccc, 0);
			if (this.isRect){
				this.graphics.drawRect(0, 0, this.rect.width, this.rect.height);
			}
			else{
				this.graphics.drawEllipse(0, 0, this.rect.width, this.rect.height);
			}
			this.graphics.endFill();
		}
		
		/**
		 * 画一个角度的图形
		 * @param angle 这个角度是顺时针算的。逆时针是360-angle
		 */
		public drawAngle(angle:number):void{
			!this.isAnti && (angle = 360 - angle);
			this.drawSector(angle, this.isAnti);
		}
		
		/**
		 * 画椭圆扇形
		 * @param angle 角度
		 * @param anti 是否逆时针
		 */
		public drawSector(angle:number, anti:boolean = false):void{
			var factor:number = 1;
			anti || (factor = -1);
			this.graphics.beginFill(this.color, this.alphaC);
			this.graphics.lineStyle(0, this.color, 0);
			this.graphics.moveTo(this.basePos.x, this.basePos.y);
			angle = (Math.abs(angle) > 360) ? 360 : angle;
			var n:number = Math.ceil(Math.abs(angle) / 45);
			var angleA:number = angle / n;
			angleA = angleA * Math.PI / 180;
			var curA:number = this.startFrom;
			curA = curA * Math.PI / 180;
			this.graphics.lineTo(this.basePos.x + this.a * Math.cos(curA), this.basePos.y + this.b * Math.sin(curA));
			for (var i:number = 0; i < n; ++i){
				curA += factor * angleA;
				var angleMid:number = curA - factor * angleA / 2;
				var bx:number = this.a / Math.cos(angleA / 2) * Math.cos(angleMid);
				var by:number = this.b / Math.cos(angleA / 2) * Math.sin(angleMid);
				var cx:number = this.a * Math.cos(curA);
				var cy:number = this.b * Math.sin(curA);
				this.graphics.curveTo(this.basePos.x + bx, this.basePos.y + by, this.basePos.x + cx, this.basePos.y + cy);
			}
			this.graphics.endFill();
		}
	}
}