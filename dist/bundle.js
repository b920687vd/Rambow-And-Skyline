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
        Object.defineProperty(Mod.prototype, "SetPos", {
            get: function () {
                //...
                var mod = this;
                return function (x, y) {
                    var args = mod.RunHeadPlugin("SetPos", x, y);
                    mod.setPos.apply(mod, args);
                };
            },
            enumerable: true,
            configurable: true
        });
        Mod.prototype.setPos = function (x, y) {
            console.log("final", x, y);
        };
        Mod.prototype.RunHeadPlugin = function (api) {
            var param = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                param[_i - 1] = arguments[_i];
            }
            var args = param;
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
    var ModuleMgr = /** @class */ (function () {
        function ModuleMgr() {
        }
        return ModuleMgr;
    }());
    Module.ModuleMgr = ModuleMgr;
})(Module = exports.Module || (exports.Module = {}));
},{}],2:[function(require,module,exports){
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
var PluginRandom = /** @class */ (function (_super) {
    __extends(PluginRandom, _super);
    function PluginRandom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PluginRandom.prototype.Run = function (x, y) {
        //...
        return [x + Math.random() * 1, y + Math.random() * 1];
    };
    return PluginRandom;
}(Module_1.Module.ModPlugin));
exports.PluginRandom = PluginRandom;
},{"../DataType/Module":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Module_1 = require("./DataType/Module");
var PluginRandom_1 = require("./Plugin/PluginRandom");
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
    var mgr = new Module_1.Module.ModuleMgr();
    var mod = new Module_1.Module.Mod();
    var testPlg = new PluginRandom_1.PluginRandom();
    mod.RegPlugin("head", "SetPos", testPlg);
    mod.SetPos(2, 2);
    main.Init();
})(Game = exports.Game || (exports.Game = {}));
},{"./DataType/Module":1,"./Plugin/PluginRandom":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvRGF0YVR5cGUvTW9kdWxlLnRzIiwic3JjL3RzL1BsdWdpbi9QbHVnaW5SYW5kb20udHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBYyxNQUFNLENBb0RuQjtBQXBERCxXQUFjLE1BQU07SUFDaEI7UUFBQTtZQUNJLEtBQUs7WUFFSyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztZQUNyRCxlQUFVLEdBQXdDLEVBQUUsQ0FBQztRQStCbkUsQ0FBQztRQTdCVSx1QkFBUyxHQUFoQixVQUFpQixJQUFxQixFQUFFLEdBQVcsRUFBRSxNQUFpQjtZQUNsRSxJQUFJLE9BQTRDLENBQUM7WUFDakQsT0FBTyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBYSxDQUFDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELHNCQUFXLHVCQUFNO2lCQUFqQjtnQkFDSSxLQUFLO2dCQUNMLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztnQkFDZixPQUFPLFVBQUMsQ0FBUyxFQUFFLENBQVM7b0JBQ3hCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQW1CLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUF3QixDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQztZQUNOLENBQUM7OztXQUFB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SUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2hCLENBQUMsRUFuQmEsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBbUJqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBtb2R1bGUgTW9kdWxlIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNb2Qge1xyXG4gICAgICAgIC8vLi4uXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBoZWFkUGx1Z2luOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PE1vZFBsdWdpbj4gfSA9IHt9O1xyXG4gICAgICAgIHByb3RlY3RlZCB0YWlsUGx1Z2luOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PE1vZFBsdWdpbj4gfSA9IHt9O1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVnUGx1Z2luKHR5cGU6IFwiaGVhZFwiIHwgXCJ0YWlsXCIsIGFwaTogc3RyaW5nLCBwbHVnaW46IE1vZFBsdWdpbikge1xyXG4gICAgICAgICAgICBsZXQgY3VyTGlzdDogeyBba2V5OiBzdHJpbmddOiBBcnJheTxNb2RQbHVnaW4+IH07XHJcbiAgICAgICAgICAgIGN1ckxpc3QgPSAodHlwZSA9PSBcImhlYWRcIikgPyB0aGlzLmhlYWRQbHVnaW4gOiB0aGlzLnRhaWxQbHVnaW47XHJcbiAgICAgICAgICAgIGlmICghY3VyTGlzdFthcGldKVxyXG4gICAgICAgICAgICAgICAgY3VyTGlzdFthcGldID0gbmV3IEFycmF5PE1vZFBsdWdpbj4oKTtcclxuICAgICAgICAgICAgY3VyTGlzdFthcGldLnB1c2gocGx1Z2luKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2V0UG9zKCk6ICh4OiBudW1iZXIsIHk6IG51bWJlcikgPT4gdm9pZCB7XHJcbiAgICAgICAgICAgIC8vLi4uXHJcbiAgICAgICAgICAgIGxldCBtb2QgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gKHg6IG51bWJlciwgeTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJncyA9IG1vZC5SdW5IZWFkUGx1Z2luPFtudW1iZXIsIG51bWJlcl0+KFwiU2V0UG9zXCIsIHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgbW9kLnNldFBvcy5hcHBseShtb2QsIGFyZ3MgYXMgW251bWJlciwgbnVtYmVyXSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgc2V0UG9zKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluYWxcIiwgeCwgeSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgUnVuSGVhZFBsdWdpbjxUPihhcGk6IHN0cmluZywgLi4ucGFyYW06IGFueVtdKTogYW55W10ge1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHBhcmFtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWFkUGx1Z2luW2FwaV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbHVnaW4gPSB0aGlzLmhlYWRQbHVnaW5bYXBpXVtpXTtcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSBwbHVnaW4uUnVuLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNb2RQbHVnaW4ge1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgcHVibGljIFJ1biguLi5wYXJhbTogYW55W10pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICAgICAgLy8uLi5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgICAgICAvLy4uLlxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb2R1bGVNZ3Ige1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi9EYXRhVHlwZS9Nb2R1bGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbHVnaW5SYW5kb20gZXh0ZW5kcyBNb2R1bGUuTW9kUGx1Z2lue1xyXG4gICAgcHVibGljIFJ1bih4Om51bWJlcix5Om51bWJlcik6W251bWJlcixudW1iZXJde1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgcmV0dXJuIFt4K01hdGgucmFuZG9tKCkqMSx5K01hdGgucmFuZG9tKCkqMV07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tIFwiLi9EYXRhVHlwZS9Nb2R1bGVcIjtcclxuaW1wb3J0IHsgUGx1Z2luUmFuZG9tIH0gZnJvbSBcIi4vUGx1Z2luL1BsdWdpblJhbmRvbVwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBHYW1lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBNYWluIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgSW5pdCgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdGFydCBNYWluIEluaXRcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGFzIEV4cG9ydCBTdGlsbD9cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1haW4gPSBuZXcgTWFpbigpO1xyXG4gICAgdmFyIG1ncjogTW9kdWxlLk1vZHVsZU1nciA9IG5ldyBNb2R1bGUuTW9kdWxlTWdyKCk7XHJcbiAgICB2YXIgbW9kOiBNb2R1bGUuTW9kID0gbmV3IE1vZHVsZS5Nb2QoKTtcclxuICAgIHZhciB0ZXN0UGxnOiBQbHVnaW5SYW5kb20gPSBuZXcgUGx1Z2luUmFuZG9tKCk7XHJcbiAgICBtb2QuUmVnUGx1Z2luKFwiaGVhZFwiLCBcIlNldFBvc1wiLCB0ZXN0UGxnKTtcclxuICAgIG1vZC5TZXRQb3MoMiwgMik7XHJcbiAgICBtYWluLkluaXQoKTtcclxufSJdfQ==
