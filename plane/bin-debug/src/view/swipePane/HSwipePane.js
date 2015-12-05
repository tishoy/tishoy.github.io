/**
 * Created by tishoy on 15/2/5.
 * 横向滑动面板
 */
var egret;
(function (egret) {
    var HSwipePane = (function (_super) {
        __extends(HSwipePane, _super);
        function HSwipePane() {
            _super.call(this);
            this._fullWidth = 0;
        }
        var __egretProto__ = HSwipePane.prototype;
        __egretProto__.updateItems = function () {
            var item;
            var count = 0;
            var width = 0;
            for (var i = 0; i < this._itemList.length; ++i) {
                item = this._itemList[i];
                if (item) {
                    item.x = this._padding + this._space * count;
                    item.y = this._leading;
                    this.addChild(item);
                    width = item.x + item.width;
                    ++count;
                }
            }
            this.drawBackgroundAndUpdateSize(width);
        };
        __egretProto__.updateSpace = function () {
            if (this.numChildren == 0) {
                return;
            }
            this.graphics.clear();
            var width = 0;
            var item;
            for (var i = 0; i < this.numChildren; ++i) {
                item = this.getChildAt(i);
                item.x = this._space * i;
                item.y = this._leading;
            }
            width = item.x + item.width;
            this.drawBackgroundAndUpdateSize(width);
        };
        __egretProto__.drawBackgroundAndUpdateSize = function (width) {
            this._fullWidth = width;
            if (this._pageSize == null) {
                return;
            }
            this.scrollRect = null;
            this.graphics.beginFill(0, 0);
            this.graphics.drawRect(0, 0, width + this._padding, this._pageSize.y);
            this.graphics.endFill();
            this._numPage = Math.ceil(width / this._pageSize.x);
            if (this._lockToPage) {
                this.maxDragPosition = this._numPage * this._pageSize.x;
            }
            else {
                this.maxDragPosition = Math.max(width + this._padding - this._pageSize.x, 0);
            }
            if (this.dragRect.right > width) {
                this.dragRect.x = this.maxDragPosition;
            }
            if (this.dragRect.x < 0) {
                this.dragRect.x = 0;
            }
            this.scrollRect = this.dragRect;
            if (this._lockToPage) {
                this.scrollToPage(Math.round(this.dragRect.x / this._pageSize.x));
            }
            this.dispatchEvent(new egret.ScrollEvent(egret.ScrollEvent.SCROLL, this.dragRect.x, 0, this.maxDragPosition));
        };
        __egretProto__.onMouseDown = function (e) {
            _super.prototype.onMouseDown.call(this, e);
            this.startPosition = e.stageX;
            this.dragPosition = this.startPosition + this.dragRect.x;
        };
        __egretProto__.onMouseMove = function (e) {
            this.dragRect.x = this.dragPosition - e.stageX;
            if (this.dragRect.x < 0) {
                this.dragRect.x = this.dragRect.x >> 3;
            }
            else if (this.dragRect.x > this.maxDragPosition) {
                this.dragRect.x = this.maxDragPosition + ((this.dragRect.x - this.maxDragPosition) >> 3);
            }
            this.scrollRect = this.dragRect;
            this.dispatchEvent(new egret.ScrollEvent(egret.ScrollEvent.SCROLL, this.dragRect.x, 0, this.maxDragPosition));
        };
        __egretProto__.onMouseUp = function (e) {
            if (e === void 0) { e = null; }
            _super.prototype.onMouseUp.call(this, e);
            var dragDistance = 0;
            if (e) {
                dragDistance = this.startPosition - e.stageX;
                this._isDrag = Math.abs(dragDistance) > 50;
                if (egret.getTimer() - this.touchTime < egret.SwipePane.FAST_DRAG_TIME && Math.abs(dragDistance) > egret.SwipePane.FAST_DRAG_DISTANCE) {
                    if (this._lockToPage) {
                        this.scrollToPage(e.stageX > this.startPosition ? this._pageIndex - 1 : this._pageIndex + 1);
                    }
                    else {
                        this.scrollTo(this.dragRect.x + dragDistance * 3);
                    }
                    return;
                }
            }
            if (this._lockToPage) {
                this.scrollToPage(Math.round(this.dragRect.x / this._pageSize.x));
            }
            else {
                this.scrollTo(this.dragRect.x);
            }
        };
        __egretProto__.scrollToPage = function (pageIndex) {
            if (pageIndex === void 0) { pageIndex = 0; }
            if (pageIndex < 0) {
                pageIndex = 0;
            }
            else if (pageIndex >= this._numPage) {
                pageIndex = this._numPage - 1;
            }
            this._pageIndex = pageIndex;
            this.touchEnabled = false;
            egret.Tween.get(this.dragRect).to({ x: this._pageIndex * this._pageSize.x }, 300).call(this.onScrollUpdate, this).call(this.onScrollComplete, this);
        };
        __egretProto__.scrollTo = function (position, callback, params) {
            if (callback === void 0) { callback = null; }
            if (params === void 0) { params = null; }
            _super.prototype.scrollTo.call(this, position, callback, params);
            if (position < 0) {
                position = 0;
            }
            else if (position > this.maxDragPosition) {
                position = this.maxDragPosition;
            }
            if (this.dragRect.x == position) {
                if (callback != null) {
                    callback.apply(null, params);
                }
                return;
            }
            this.touchEnabled = false;
            egret.Tween.get(this.dragRect).to({ x: position }, 300).call(this.onScrollUpdate, this).call(this.onScrollComplete, this);
        };
        Object.defineProperty(__egretProto__, "position", {
            get: function () {
                return this.dragRect.x;
            },
            set: function (value) {
                if (value < 0) {
                    value = 0;
                }
                else if (value > this.maxDragPosition) {
                    value = this.maxDragPosition;
                }
                this.dragRect.x = value;
                this.scrollRect = this.dragRect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxPosition", {
            get: function () {
                return this.maxDragPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "fullWidth", {
            get: function () {
                return this._fullWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pageIndex", {
            set: function (value) {
                if (value < 0) {
                    value = 0;
                }
                else if (value >= this._numPage) {
                    value = this._numPage - 1;
                }
                this._pageIndex = value;
                this.dragRect.x = this._pageIndex * this._pageSize.x;
                this.scrollRect = this.dragRect;
            },
            enumerable: true,
            configurable: true
        });
        return HSwipePane;
    })(egret.SwipePane);
    egret.HSwipePane = HSwipePane;
    HSwipePane.prototype.__class__ = "egret.HSwipePane";
})(egret || (egret = {}));
