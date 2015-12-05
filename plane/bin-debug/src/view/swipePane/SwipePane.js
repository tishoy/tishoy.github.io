/**
 * Created by tishoy on 15/2/5.
 * 滑动面板基类
 */
var egret;
(function (egret) {
    var SwipePane = (function (_super) {
        __extends(SwipePane, _super);
        function SwipePane() {
            _super.call(this);
            this.touchTime = 0;
            this._space = 0;
            this._pageIndex = 0;
            this._numPage = 0;
            this._padding = 0;
            this._leading = 0;
            this._scrollEnabled = true;
            this.initView();
        }
        var __egretProto__ = SwipePane.prototype;
        __egretProto__.initView = function () {
            this.dragRect = new egret.Rectangle();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
        };
        __egretProto__.onRemoved = function (e) {
            this.onMouseUp();
        };
        __egretProto__.updateView = function () {
            this.graphics.clear();
            while (this.numChildren) {
                this.removeChildAt(0);
            }
            if (this._itemList == null || this._itemList.length == 0) {
                return;
            }
            this.updateItems();
        };
        __egretProto__.updateSpace = function () {
            //间距更新
        };
        __egretProto__.updateItems = function () {
        };
        __egretProto__.onMouseDown = function (e) {
            this._isDrag = false;
            this.touchTime = egret.getTimer();
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp, this);
        };
        __egretProto__.onMouseMove = function (e) {
        };
        __egretProto__.onMouseUp = function (e) {
            if (e === void 0) { e = null; }
            if (this.stage) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouseUp, this);
            }
        };
        __egretProto__.scrollToPage = function (pageIndex) {
            if (pageIndex === void 0) { pageIndex = 0; }
        };
        __egretProto__.onScrollUpdate = function () {
            this.scrollRect = this.dragRect;
            this.dispatchEvent(new egret.ScrollEvent(egret.ScrollEvent.SCROLL, this.position, 0, this.maxDragPosition));
        };
        __egretProto__.onScrollComplete = function () {
            this.touchEnabled = true;
            if (this.onScrollEnd != null) {
                this.onScrollEnd.apply(null, this.onScrollEndParams);
            }
        };
        __egretProto__.scrollTo = function (position, callback, params) {
            if (callback === void 0) { callback = null; }
            if (params === void 0) { params = null; }
            this.onScrollEnd = callback;
            this.onScrollEndParams = params;
        };
        __egretProto__.appendItem = function (item) {
            if (item == null) {
                return;
            }
            this._itemList.push(item);
            this.addChild(item);
            this.updateSpace();
        };
        __egretProto__.insertAt = function (item, index) {
            if (index === void 0) { index = 0; }
            if (item == null) {
                return;
            }
            this._itemList.splice(index, 0, item);
            this.addChildAt(item, index);
            this.updateSpace();
        };
        __egretProto__.removeAt = function (index) {
            if (index === void 0) { index = 0; }
            if (index >= 0 && index < this._itemList.length) {
                var item = (this._itemList[index]);
                this._itemList.splice(index, 1);
                if (item) {
                    this.removeChild(item);
                    this.updateSpace();
                }
            }
        };
        Object.defineProperty(__egretProto__, "itemList", {
            /**
             * 项列表
             */
            get: function () {
                return this._itemList;
            },
            set: function (value) {
                this._itemList = value;
                this.updateView();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "space", {
            /**
             * 项间距
             */
            get: function () {
                return this._space;
            },
            set: function (value) {
                this._space = value;
                this.updateSpace();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "lockToPage", {
            /**
             * 锁定到单页
             */
            get: function () {
                return this._lockToPage;
            },
            set: function (value) {
                this._lockToPage = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pageSize", {
            /**
             * 页面大小
             */
            get: function () {
                return this._pageSize;
            },
            set: function (value) {
                this._pageSize = value;
                this.dragRect.width = this._pageSize.x;
                this.dragRect.height = this._pageSize.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "pageIndex", {
            /**
             * 当前页索引，从0开始
             */
            get: function () {
                return this._pageIndex;
            },
            set: function (value) {
                this._pageIndex = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "numPage", {
            /**
             * 总页数
             */
            get: function () {
                return this._numPage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isDrag", {
            /**
             * 是否已经拖动，防止点击按钮拖动时也触发按钮的点击操作
             */
            get: function () {
                return this._isDrag;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "padding", {
            /**
             * 第一项和最后一项离页首和页尾的边距
             */
            get: function () {
                return this._padding;
            },
            set: function (value) {
                this._padding = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "leading", {
            /**
             * 前导量
             */
            get: function () {
                return this._leading;
            },
            set: function (value) {
                this._leading = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            /**
             * 滚动位置
             */
            get: function () {
                return 0;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxPosition", {
            /**
             * 最大滚动位置
             */
            get: function () {
                return this.maxDragPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "fullWidth", {
            /**
             * 内容宽度
             */
            get: function () {
                if (this._pageSize) {
                    return this._pageSize.x;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "fullHeight", {
            /**
             * 内容高度
             */
            get: function () {
                if (this._pageSize) {
                    return this._pageSize.y;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "scrollEnabled", {
            get: function () {
                return this._scrollEnabled;
            },
            set: function (value) {
                this._scrollEnabled = value;
                if (this._scrollEnabled) {
                    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
                }
                else {
                    this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "itemCount", {
            get: function () {
                if (this._itemList) {
                    return this._itemList.length;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        SwipePane.FAST_DRAG_TIME = 200;
        SwipePane.FAST_DRAG_DISTANCE = 50;
        return SwipePane;
    })(egret.Sprite);
    egret.SwipePane = SwipePane;
    SwipePane.prototype.__class__ = "egret.SwipePane";
})(egret || (egret = {}));
