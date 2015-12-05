var egret;
(function (egret) {
    var CooldownEffect = (function (_super) {
        __extends(CooldownEffect, _super);
        /**
         * 技能冷却效果类
         * @param w 宽或椭圆的a * 2
         * @param h 高或椭圆的b * 2
         * @param $bRect 矩形还是圆形，true为矩形，false为圆形
         * @param $isHighLight 是否剩余的比过去的时间亮
         */
        function CooldownEffect(w, h, isRect, isHighLight) {
            if (h === void 0) { h = 0; }
            if (isRect === void 0) { isRect = true; }
            if (isHighLight === void 0) { isHighLight = false; }
            _super.call(this);
            this.color = 0x000000; // 颜色
            this.alphaC = 0.6; // 透明度
            this.isAnti = false; // 是否逆时针（剩余的比过去的时间亮）
            this.isRect = false; // 是否矩形
            this.startFrom = 270; // 从270度开始画
            this.delay = 0; // 延迟时间，负数表示已经过了多久（单位：毫秒）
            this.duration = 0; // CD时间，单位：毫秒
            this.isCooling = false; // 是否正在冷却
            this.startTime = 0; // 开始冷却的时刻
            this.touchChildren = false;
            this.touchEnabled = false;
            this.isRect = isRect;
            this.isAnti = isHighLight;
            this.setSize(w, h);
        }
        var __egretProto__ = CooldownEffect.prototype;
        __egretProto__.setSize = function (w, h) {
            h == 0 && (h = w);
            if (this.isRect) {
                this.a = w * Math.SQRT1_2;
                this.b = h * Math.SQRT1_2;
            }
            else {
                this.a = w * 0.5;
                this.b = h * 0.5;
            }
            this.basePos = new egret.Point(w * 0.5, h * 0.5);
            this.rect = new egret.Rectangle(0, 0, w, h);
            this.scrollRect = this.rect;
        };
        /**
         * 开始冷却
         * @param $duration 冷却周期（单位：毫秒）
         * @param $delay 延迟时间，负数表示已经过了多久（单位：毫秒）
         * @param $enforce 强制刷新时间
         */
        __egretProto__.start = function ($duration, $delay, $enforce) {
            if ($delay === void 0) { $delay = 0; }
            if ($enforce === void 0) { $enforce = false; }
            var time = egret.getTimer();
            if (!$enforce && this.isCooling) {
                if (($duration + $delay) < (this.duration + this.delay - (time - this.startTime))) {
                    // 如果新的冷却时间比原来的还短，不更新
                    return;
                }
                this.stop();
            }
            this.duration = $duration;
            this.delay = $delay;
            this.startTime = time;
            this.isCooling = true;
            this.addEventListener(egret.Event.ENTER_FRAME, this.draw, this);
            this.dispatchEvent(new egret.Event(CooldownEffect.COOLDOWN_START)); //派发事件
        };
        /**
         * 停止冷却
         */
        __egretProto__.stop = function () {
            this.isCooling = false;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.draw, this);
            this.dispatchEvent(new egret.Event(CooldownEffect.COOLDOWN_END)); //派发事件
        };
        /**
         * 清除效果，停止冷却
         */
        __egretProto__.reset = function () {
            this.stop();
            this.clear();
        };
        /**
         * 清除效果
         */
        __egretProto__.clear = function () {
            this.graphics.clear();
        };
        __egretProto__.draw = function (e) {
            this.clear();
            var timePast = egret.getTimer() - this.startTime - this.delay;
            if (timePast >= this.duration) {
                // 冷却结束
                this.stop();
                return;
            }
            else if (timePast <= 0) {
                var angle = 0;
            }
            else {
                angle = timePast * 360 / this.duration;
            }
            this.drawBack();
            this.drawAngle(angle);
        };
        __egretProto__.drawBack = function () {
            this.graphics.beginFill(0xffcccc, 0);
            if (this.isRect) {
                this.graphics.drawRect(0, 0, this.rect.width, this.rect.height);
            }
            else {
                this.graphics.drawEllipse(0, 0, this.rect.width, this.rect.height);
            }
            this.graphics.endFill();
        };
        /**
         * 画一个角度的图形
         * @param angle 这个角度是顺时针算的。逆时针是360-angle
         */
        __egretProto__.drawAngle = function (angle) {
            !this.isAnti && (angle = 360 - angle);
            this.drawSector(angle, this.isAnti);
        };
        /**
         * 画椭圆扇形
         * @param angle 角度
         * @param anti 是否逆时针
         */
        __egretProto__.drawSector = function (angle, anti) {
            if (anti === void 0) { anti = false; }
            var factor = 1;
            anti || (factor = -1);
            this.graphics.beginFill(this.color, this.alphaC);
            this.graphics.lineStyle(0, this.color, 0);
            this.graphics.moveTo(this.basePos.x, this.basePos.y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n = Math.ceil(Math.abs(angle) / 45);
            var angleA = angle / n;
            angleA = angleA * Math.PI / 180;
            var curA = this.startFrom;
            curA = curA * Math.PI / 180;
            this.graphics.lineTo(this.basePos.x + this.a * Math.cos(curA), this.basePos.y + this.b * Math.sin(curA));
            for (var i = 0; i < n; ++i) {
                curA += factor * angleA;
                var angleMid = curA - factor * angleA / 2;
                var bx = this.a / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = this.b / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = this.a * Math.cos(curA);
                var cy = this.b * Math.sin(curA);
                this.graphics.curveTo(this.basePos.x + bx, this.basePos.y + by, this.basePos.x + cx, this.basePos.y + cy);
            }
            this.graphics.endFill();
        };
        CooldownEffect.COOLDOWN_END = "eventEnd"; //结束事件
        CooldownEffect.COOLDOWN_START = "eventStart"; //开始事件
        return CooldownEffect;
    })(egret.Sprite);
    egret.CooldownEffect = CooldownEffect;
    CooldownEffect.prototype.__class__ = "egret.CooldownEffect";
})(egret || (egret = {}));
