(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module;
(function (Module) {
    var Mod = /** @class */ (function () {
        function Mod() {
            //...
            this.headPlugin = {};
            this.tailPlugin = {};
        }
        Mod.prototype.RegPlugin = function (type, api, plugin) {
            var curList;
            curList = (type == "head") ? this.headPlugin : this.tailPlugin;
            if (!curList[api])
                curList[api] = new Array();
            curList[api].push(plugin);
        };
        Mod.prototype.RegAPI = function (api, func) {
            //...
            var mod = this;
            var apiArgs = new Array();
            apiArgs.push(api);
            return function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i] = arguments[_i];
                }
                apiArgs = apiArgs.concat(arg);
                var param = mod.RunHeadPlugin.apply(mod, apiArgs);
                return func.apply(mod, param);
            };
        };
        Mod.prototype.RunHeadPlugin = function (api) {
            var param = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                param[_i - 1] = arguments[_i];
            }
            var args = param;
            if (!this.headPlugin[api])
                return args;
            for (var i = 0; i < this.headPlugin[api].length; i++) {
                var plugin = this.headPlugin[api][i];
                args = plugin.Run.apply(this, args);
            }
            return args;
        };
        return Mod;
    }());
    Module.Mod = Mod;
    var ModPlugin = /** @class */ (function () {
        function ModPlugin() {
        }
        //...
        ModPlugin.prototype.Run = function () {
            var param = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                param[_i] = arguments[_i];
            }
            //...
            return new Array();
        };
        return ModPlugin;
    }());
    Module.ModPlugin = ModPlugin;
    var Signal = /** @class */ (function () {
        function Signal() {
        }
        return Signal;
    }());
    Module.Signal = Signal;
    var ModMgr = /** @class */ (function () {
        function ModMgr() {
        }
        return ModMgr;
    }());
    Module.ModMgr = ModMgr;
})(Module = exports.Module || (exports.Module = {}));
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module_1 = require("./DataType/Module");
var PluginRandom_1 = require("./Plugin/PluginRandom");
var ModPackage_1 = require("./Module/ModPackage");
function MainTest() {
    console.group("Main Test");
    pluginTest();
    packageTest();
    console.groupEnd();
}
exports.MainTest = MainTest;
function pluginTest() {
    var mgr = new Module_1.Module.ModMgr();
    var mod = new Module_1.Module.Mod();
    var testPlg = new PluginRandom_1.PluginRandom.RandPoint();
    mod.RegPlugin("head", "SetPos", testPlg);
}
function packageTest() {
    //...
    console.group("Test--Mod Package--Begin");
    var pack = new ModPackage_1.ModPackege();
    var strCloth = "cloth";
    console.group("Num Begin");
    console.log("has %s? ", strCloth, pack.HasItem(strCloth));
    console.log("how much %s? ", strCloth, pack.GetItemNum(strCloth));
    console.groupEnd();
    console.group("Now Add 1 %s", strCloth);
    pack.AddItem(strCloth, 1);
    console.log("has %s? ", strCloth, pack.HasItem(strCloth));
    console.log("how much %s? ", strCloth, pack.GetItemNum(strCloth));
    console.groupEnd();
    console.group("Now cost 1 %s", strCloth);
    pack.CostItem(strCloth, 1);
    console.log("has %s? ", strCloth, pack.HasItem(strCloth));
    console.log("how much %s? ", strCloth, pack.GetItemNum(strCloth));
    console.groupEnd();
    console.group("Package Data");
    console.table(pack.GetPackageData());
    console.groupEnd();
    console.groupEnd();
}
},{"./DataType/Module":1,"./Module/ModPackage":3,"./Plugin/PluginRandom":4}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Module_1 = require("../DataType/Module");
var PackageAPI;
(function (PackageAPI) {
    PackageAPI["HasItem"] = "HasItem";
    PackageAPI["AddItem"] = "AddItem";
    PackageAPI["GetPackageData"] = "GetPackageData";
    PackageAPI["CostItem"] = "CostItem";
    PackageAPI["GetItemNum"] = "GetItemNum";
})(PackageAPI || (PackageAPI = {}));
var ModPackege = /** @class */ (function (_super) {
    __extends(ModPackege, _super);
    function ModPackege() {
        var _this = _super.call(this) || this;
        _this.itemPack = {};
        _this.HasItem = _this.RegAPI(PackageAPI.HasItem, function (itemName) {
            //...
            if (!_this.itemPack.hasOwnProperty(itemName))
                return false;
            if (_this.itemPack[itemName] == 0)
                return false;
            return true;
        });
        _this.AddItem = _this.RegAPI(PackageAPI.AddItem, function (item, num) {
            if (!_this.itemPack.hasOwnProperty(item))
                _this.itemPack[item] = 0;
            _this.itemPack[item] += num;
            return _this.itemPack[item];
        });
        _this.CostItem = _this.RegAPI(PackageAPI.CostItem, function (item, num) {
            if (!_this.itemPack.hasOwnProperty(item))
                _this.itemPack[item] = 0;
            _this.itemPack[item] -= num;
            if (_this.itemPack[item] < 0) {
                console.warn("ModPackage::CostItem/nCost Item Num is more than the item you have!");
                _this.itemPack[item] = 0;
            }
            return _this.itemPack[item];
        });
        _this.GetItemNum = _this.RegAPI(PackageAPI.GetItemNum, function (item) {
            if (!_this.itemPack.hasOwnProperty(item))
                _this.itemPack[item] = 0;
            return _this.itemPack[item];
        });
        _this.GetPackageData = _this.RegAPI(PackageAPI.GetPackageData, function () {
            //.../*
            return _this.itemPack;
        });
        return _this;
        //..
    }
    return ModPackege;
}(Module_1.Module.Mod));
exports.ModPackege = ModPackege;
},{"../DataType/Module":1}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Module_1 = require("../DataType/Module");
var PluginRandom;
(function (PluginRandom) {
    var RandPoint = /** @class */ (function (_super) {
        __extends(RandPoint, _super);
        function RandPoint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RandPoint.prototype.Run = function (x, y) {
            //...
            return [x + Math.random() * 1, y + Math.random() * 1];
        };
        return RandPoint;
    }(Module_1.Module.ModPlugin));
    PluginRandom.RandPoint = RandPoint;
    var RandLine = /** @class */ (function (_super) {
        __extends(RandLine, _super);
        function RandLine() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RandLine.prototype.Run = function (x) {
            //...
            return [x + Math.random() * 1];
        };
        return RandLine;
    }(Module_1.Module.ModPlugin));
    PluginRandom.RandLine = RandLine;
})(PluginRandom = exports.PluginRandom || (exports.PluginRandom = {}));
},{"../DataType/Module":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainTest_1 = require("./MainTest");
var Game;
(function (Game) {
    var Main = /** @class */ (function () {
        function Main() {
            console.log("Hello world!");
        }
        Main.prototype.Init = function () {
            console.log("Start Main Init");
            console.log("Has Export Still?");
        };
        return Main;
    }());
    Game.Main = Main;
    var main = new Main();
    main.Init();
    MainTest_1.MainTest();
})(Game = exports.Game || (exports.Game = {}));
},{"./MainTest":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvRGF0YVR5cGUvTW9kdWxlLnRzIiwic3JjL3RzL01haW5UZXN0LnRzIiwic3JjL3RzL01vZHVsZS9Nb2RQYWNrYWdlLnRzIiwic3JjL3RzL1BsdWdpbi9QbHVnaW5SYW5kb20udHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBYyxNQUFNLENBcURuQjtBQXJERCxXQUFjLE1BQU07SUFDaEI7UUFBQTtZQUNJLEtBQUs7WUFFSyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztZQUNyRCxlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQWdDbkUsQ0FBQztRQTlCVSx1QkFBUyxHQUFoQixVQUFpQixJQUFxQixFQUFFLEdBQVcsRUFBRSxNQUFpQjtZQUNsRSxJQUFJLE9BQTRDLENBQUM7WUFDakQsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVNLG9CQUFNLEdBQWIsVUFBc0MsR0FBVSxFQUFDLElBQWE7WUFDMUQsS0FBSztZQUNMLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztZQUNmLElBQUksT0FBTyxHQUFHLElBQUksS0FBSyxFQUFPLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixPQUFPO2dCQUFDLGFBQVE7cUJBQVIsVUFBUSxFQUFSLHFCQUFRLEVBQVIsSUFBUTtvQkFBUix3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LENBQUM7SUFDdEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1osbUJBQVEsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxFQWZhLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQWVqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBtb2R1bGUgTW9kdWxlIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNb2Qge1xyXG4gICAgICAgIC8vLi4uXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBoZWFkUGx1Z2luOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PE1vZFBsdWdpbj4gfSA9IHt9O1xyXG4gICAgICAgIHByb3RlY3RlZCB0YWlsUGx1Z2luOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PE1vZFBsdWdpbj4gfSA9IHt9O1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVnUGx1Z2luKHR5cGU6IFwiaGVhZFwiIHwgXCJ0YWlsXCIsIGFwaTogc3RyaW5nLCBwbHVnaW46IE1vZFBsdWdpbikge1xyXG4gICAgICAgICAgICBsZXQgY3VyTGlzdDogeyBba2V5OiBzdHJpbmddOiBBcnJheTxNb2RQbHVnaW4+IH07XHJcbiAgICAgICAgICAgIGN1ckxpc3QgPSAodHlwZSA9PSBcImhlYWRcIikgPyB0aGlzLmhlYWRQbHVnaW4gOiB0aGlzLnRhaWxQbHVnaW47XHJcbiAgICAgICAgICAgIGlmICghY3VyTGlzdFthcGldKVxyXG4gICAgICAgICAgICAgICAgY3VyTGlzdFthcGldID0gbmV3IEFycmF5PE1vZFBsdWdpbj4oKTtcclxuICAgICAgICAgICAgY3VyTGlzdFthcGldLnB1c2gocGx1Z2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWdBUEk8VCBleHRlbmRzIEFycmF5PGFueT4sUD4oYXBpOnN0cmluZyxmdW5jOkZ1bmN0aW9uKTooLi4uYXJnOlQpPT5Qe1xyXG4gICAgICAgICAgICAvLy4uLlxyXG4gICAgICAgICAgICBsZXQgbW9kID0gdGhpcztcclxuICAgICAgICAgICAgbGV0IGFwaUFyZ3MgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgICAgICBhcGlBcmdzLnB1c2goYXBpKTtcclxuICAgICAgICAgICAgcmV0dXJuICguLi5hcmc6VCk9PntcclxuICAgICAgICAgICAgICAgIGFwaUFyZ3MgPSBhcGlBcmdzLmNvbmNhdChhcmcpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtID0gbW9kLlJ1bkhlYWRQbHVnaW4uYXBwbHkobW9kLGFwaUFyZ3MgYXMgW3N0cmluZywuLi5hbnlbXV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobW9kLHBhcmFtKSBhcyBQO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgUnVuSGVhZFBsdWdpbjxUPihhcGk6IHN0cmluZywgLi4ucGFyYW06IGFueVtdKTogYW55W10ge1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHBhcmFtXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5oZWFkUGx1Z2luW2FwaV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhlYWRQbHVnaW5bYXBpXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsdWdpbiA9IHRoaXMuaGVhZFBsdWdpblthcGldW2ldO1xyXG4gICAgICAgICAgICAgICAgYXJncyA9IHBsdWdpbi5SdW4uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZFBsdWdpbiB7XHJcbiAgICAgICAgLy8uLi5cclxuICAgICAgICBwdWJsaWMgUnVuKC4uLnBhcmFtOiBhbnlbXSk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgICAgICAvLy4uLlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaWduYWwge1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vZE1nciB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4vRGF0YVR5cGUvTW9kdWxlXCI7XHJcbmltcG9ydCB7IFBsdWdpblJhbmRvbSB9IGZyb20gXCIuL1BsdWdpbi9QbHVnaW5SYW5kb21cIjtcclxuaW1wb3J0IHsgTW9kUGFja2VnZSB9IGZyb20gXCIuL01vZHVsZS9Nb2RQYWNrYWdlXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWFpblRlc3QoKSB7XHJcbiAgICBjb25zb2xlLmdyb3VwKFwiTWFpbiBUZXN0XCIpO1xyXG4gICAgcGx1Z2luVGVzdCgpO1xyXG4gICAgcGFja2FnZVRlc3QoKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGx1Z2luVGVzdCgpIHtcclxuICAgIHZhciBtZ3I6IE1vZHVsZS5Nb2RNZ3IgPSBuZXcgTW9kdWxlLk1vZE1ncigpO1xyXG4gICAgdmFyIG1vZDogTW9kdWxlLk1vZCA9IG5ldyBNb2R1bGUuTW9kKCk7XHJcbiAgICB2YXIgdGVzdFBsZzogUGx1Z2luUmFuZG9tLlJhbmRQb2ludCA9IG5ldyBQbHVnaW5SYW5kb20uUmFuZFBvaW50KCk7XHJcbiAgICBtb2QuUmVnUGx1Z2luKFwiaGVhZFwiLCBcIlNldFBvc1wiLCB0ZXN0UGxnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGFja2FnZVRlc3QoKSB7XHJcbiAgICAvLy4uLlxyXG4gICAgY29uc29sZS5ncm91cChcIlRlc3QtLU1vZCBQYWNrYWdlLS1CZWdpblwiKTtcclxuICAgIHZhciBwYWNrOiBNb2RQYWNrZWdlID0gbmV3IE1vZFBhY2tlZ2UoKTtcclxuICAgIHZhciBzdHJDbG90aDogc3RyaW5nID0gXCJjbG90aFwiO1xyXG4gICAgY29uc29sZS5ncm91cChcIk51bSBCZWdpblwiKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaGFzICVzPyBcIiwgc3RyQ2xvdGgsIHBhY2suSGFzSXRlbShzdHJDbG90aCkpO1xyXG4gICAgY29uc29sZS5sb2coXCJob3cgbXVjaCAlcz8gXCIsIHN0ckNsb3RoLCBwYWNrLkdldEl0ZW1OdW0oc3RyQ2xvdGgpKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuXHJcbiAgICBjb25zb2xlLmdyb3VwKFwiTm93IEFkZCAxICVzXCIsIHN0ckNsb3RoKTtcclxuICAgIHBhY2suQWRkSXRlbShzdHJDbG90aCwgMSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImhhcyAlcz8gXCIsIHN0ckNsb3RoLCBwYWNrLkhhc0l0ZW0oc3RyQ2xvdGgpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaG93IG11Y2ggJXM/IFwiLCBzdHJDbG90aCwgcGFjay5HZXRJdGVtTnVtKHN0ckNsb3RoKSk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcblxyXG4gICAgY29uc29sZS5ncm91cChcIk5vdyBjb3N0IDEgJXNcIiwgc3RyQ2xvdGgpO1xyXG4gICAgcGFjay5Db3N0SXRlbShzdHJDbG90aCwgMSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImhhcyAlcz8gXCIsIHN0ckNsb3RoLCBwYWNrLkhhc0l0ZW0oc3RyQ2xvdGgpKTtcclxuICAgIGNvbnNvbGUubG9nKFwiaG93IG11Y2ggJXM/IFwiLCBzdHJDbG90aCwgcGFjay5HZXRJdGVtTnVtKHN0ckNsb3RoKSk7XHJcbiAgICBjb25zb2xlLmdyb3VwRW5kKCk7IFxyXG5cclxuICAgIGNvbnNvbGUuZ3JvdXAoXCJQYWNrYWdlIERhdGFcIilcclxuICAgIGNvbnNvbGUudGFibGUocGFjay5HZXRQYWNrYWdlRGF0YSgpKTtcclxuICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgIFxyXG4gICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uL0RhdGFUeXBlL01vZHVsZVwiO1xyXG5cclxuZW51bSBQYWNrYWdlQVBJe1xyXG4gICAgSGFzSXRlbSA9IFwiSGFzSXRlbVwiLFxyXG4gICAgQWRkSXRlbSA9IFwiQWRkSXRlbVwiLFxyXG4gICAgR2V0UGFja2FnZURhdGEgPSBcIkdldFBhY2thZ2VEYXRhXCIsXHJcbiAgICBDb3N0SXRlbSA9IFwiQ29zdEl0ZW1cIixcclxuICAgIEdldEl0ZW1OdW0gPSBcIkdldEl0ZW1OdW1cIlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kUGFja2VnZSBleHRlbmRzIE1vZHVsZS5Nb2R7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8uLlxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXRlbVBhY2s6e1trZXk6c3RyaW5nXTpudW1iZXJ9ID0ge307XHJcblxyXG4gICAgcHVibGljIEhhc0l0ZW06KGl0ZW1OYW1lOnN0cmluZyk9PmJvb2xlYW4gPSB0aGlzLlJlZ0FQSShQYWNrYWdlQVBJLkhhc0l0ZW0sKGl0ZW1OYW1lOnN0cmluZyk6Ym9vbGVhbj0+e1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgaWYoIXRoaXMuaXRlbVBhY2suaGFzT3duUHJvcGVydHkoaXRlbU5hbWUpKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5pdGVtUGFja1tpdGVtTmFtZV0gPT0gMClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcHVibGljIEFkZEl0ZW06KGl0ZW06c3RyaW5nLG51bTpudW1iZXIpPT5udW1iZXIgPSB0aGlzLlJlZ0FQSShQYWNrYWdlQVBJLkFkZEl0ZW0sKGl0ZW06c3RyaW5nLG51bTpudW1iZXIpOm51bWJlcj0+e1xyXG4gICAgICAgIGlmKCF0aGlzLml0ZW1QYWNrLmhhc093blByb3BlcnR5KGl0ZW0pKVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1QYWNrW2l0ZW1dID0gMDtcclxuICAgICAgICB0aGlzLml0ZW1QYWNrW2l0ZW1dKz1udW07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVBhY2tbaXRlbV07XHJcbiAgICB9KVxyXG5cclxuICAgIHB1YmxpYyBDb3N0SXRlbTooaXRlbTpzdHJpbmcsbnVtOm51bWJlcik9Pm51bWJlciA9IHRoaXMuUmVnQVBJKFBhY2thZ2VBUEkuQ29zdEl0ZW0sKGl0ZW06c3RyaW5nLG51bTpudW1iZXIpOm51bWJlcj0+e1xyXG4gICAgICAgIGlmKCF0aGlzLml0ZW1QYWNrLmhhc093blByb3BlcnR5KGl0ZW0pKVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1QYWNrW2l0ZW1dID0gMDtcclxuICAgICAgICB0aGlzLml0ZW1QYWNrW2l0ZW1dLT1udW07XHJcbiAgICAgICAgaWYodGhpcy5pdGVtUGFja1tpdGVtXTwwKXtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiTW9kUGFja2FnZTo6Q29zdEl0ZW0vbkNvc3QgSXRlbSBOdW0gaXMgbW9yZSB0aGFuIHRoZSBpdGVtIHlvdSBoYXZlIVwiKTtcclxuICAgICAgICAgICAgdGhpcy5pdGVtUGFja1tpdGVtXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1QYWNrW2l0ZW1dO1xyXG4gICAgfSlcclxuXHJcbiAgICBwdWJsaWMgR2V0SXRlbU51bTooaXRlbTpzdHJpbmcpPT5udW1iZXIgPSB0aGlzLlJlZ0FQSShQYWNrYWdlQVBJLkdldEl0ZW1OdW0sKGl0ZW06c3RyaW5nKTpudW1iZXI9PntcclxuICAgICAgICBpZighdGhpcy5pdGVtUGFjay5oYXNPd25Qcm9wZXJ0eShpdGVtKSlcclxuICAgICAgICAgICAgdGhpcy5pdGVtUGFja1tpdGVtXSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVBhY2tbaXRlbV07XHJcbiAgICB9KVxyXG5cclxuICAgIHB1YmxpYyBHZXRQYWNrYWdlRGF0YTooKT0+e1trZXk6c3RyaW5nXTpudW1iZXJ9ID0gdGhpcy5SZWdBUEkoUGFja2FnZUFQSS5HZXRQYWNrYWdlRGF0YSwoKTp7W2tleTpzdHJpbmddOm51bWJlcn09PntcclxuICAgICAgICAvLy4uLi8qXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVBhY2s7XHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4uL0RhdGFUeXBlL01vZHVsZVwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBQbHVnaW5SYW5kb217XHJcbiAgICBleHBvcnQgY2xhc3MgUmFuZFBvaW50IGV4dGVuZHMgTW9kdWxlLk1vZFBsdWdpbntcclxuICAgICAgICBwdWJsaWMgUnVuKHg6bnVtYmVyLHk6bnVtYmVyKTpbbnVtYmVyLG51bWJlcl17XHJcbiAgICAgICAgICAgIC8vLi4uXHJcbiAgICAgICAgICAgIHJldHVybiBbeCtNYXRoLnJhbmRvbSgpKjEseStNYXRoLnJhbmRvbSgpKjFdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUmFuZExpbmUgZXh0ZW5kcyBNb2R1bGUuTW9kUGx1Z2lue1xyXG4gICAgICAgIHB1YmxpYyBSdW4oeDpudW1iZXIpOltudW1iZXJde1xyXG4gICAgICAgICAgICAvLy4uLlxyXG4gICAgICAgICAgICByZXR1cm4gW3grTWF0aC5yYW5kb20oKSoxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tIFwiLi9EYXRhVHlwZS9Nb2R1bGVcIjtcclxuaW1wb3J0IHsgUGx1Z2luUmFuZG9tIH0gZnJvbSBcIi4vUGx1Z2luL1BsdWdpblJhbmRvbVwiO1xyXG5pbXBvcnQgeyBNb2RQYWNrZWdlIH0gZnJvbSBcIi4vTW9kdWxlL01vZFBhY2thZ2VcIjtcclxuaW1wb3J0IHsgTWFpblRlc3QgfSBmcm9tIFwiLi9NYWluVGVzdFwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBHYW1lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydCBNYWluIEluaXRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGFzIEV4cG9ydCBTdGlsbD9cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1haW4gPSBuZXcgTWFpbigpO1xyXG4gICAgbWFpbi5Jbml0KCk7XHJcbiAgICBNYWluVGVzdCgpO1xyXG59Il19
