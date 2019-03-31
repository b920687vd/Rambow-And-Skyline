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
            this.Pid = this.RegAPI("SetPos", function (x, y) {
                console.log("final", x, y);
            });
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
    var testPlg = new PluginRandom_1.PluginRandom.RandPoint();
    mod.RegPlugin("head", "SetPos", testPlg);
    mod.Pid(2, 2);
    //mod.SetPos(2, 2);
    main.Init();
})(Game = exports.Game || (exports.Game = {}));
},{"./DataType/Module":1,"./Plugin/PluginRandom":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvdHMvRGF0YVR5cGUvTW9kdWxlLnRzIiwic3JjL3RzL1BsdWdpbi9QbHVnaW5SYW5kb20udHMiLCJzcmMvdHMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBYyxNQUFNLENBdURuQjtBQXZERCxXQUFjLE1BQU07SUFDaEI7UUFBQTtZQUNJLEtBQUs7WUFFSyxlQUFVLEdBQXdDLEVBQUUsQ0FBQztZQUNyRCxlQUFVLEdBQXdDLEVBQUUsQ0FBQztZQXNCeEQsUUFBRyxHQUE4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxVQUFDLENBQVMsRUFBRSxDQUFTO2dCQUM5RSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFVUCxDQUFDO1FBaENVLHVCQUFTLEdBQWhCLFVBQWlCLElBQXFCLEVBQUUsR0FBVyxFQUFFLE1BQWlCO1lBQ2xFLElBQUksT0FBNEMsQ0FBQztZQUNqRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFhLENBQUM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRU0sb0JBQU0sR0FBYixVQUFzQyxHQUFVLEVBQUMsSUFBYTtZQUMxRCxLQUFLO1lBQ0wsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSSxLQUFLLEVBQU8sQ0FBQztZQUMv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QUMzQyxzREFBcUQ7QUFFckQsSUFBYyxJQUFJLENBcUJqQjtBQXJCRCxXQUFjLElBQUk7SUFDZDtRQUNJO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBRU0sbUJBQUksR0FBWDtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLFNBQUksT0FTaEIsQ0FBQTtJQUVELElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDdEIsSUFBSSxHQUFHLEdBQXFCLElBQUksZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25ELElBQUksR0FBRyxHQUFlLElBQUksZUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZDLElBQUksT0FBTyxHQUEyQixJQUFJLDJCQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2IsbUJBQW1CO0lBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNoQixDQUFDLEVBckJhLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQXFCakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgbW9kdWxlIE1vZHVsZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTW9kIHtcclxuICAgICAgICAvLy4uLlxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgaGVhZFBsdWdpbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxNb2RQbHVnaW4+IH0gPSB7fTtcclxuICAgICAgICBwcm90ZWN0ZWQgdGFpbFBsdWdpbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxNb2RQbHVnaW4+IH0gPSB7fTtcclxuXHJcbiAgICAgICAgcHVibGljIFJlZ1BsdWdpbih0eXBlOiBcImhlYWRcIiB8IFwidGFpbFwiLCBhcGk6IHN0cmluZywgcGx1Z2luOiBNb2RQbHVnaW4pIHtcclxuICAgICAgICAgICAgbGV0IGN1ckxpc3Q6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8TW9kUGx1Z2luPiB9O1xyXG4gICAgICAgICAgICBjdXJMaXN0ID0gKHR5cGUgPT0gXCJoZWFkXCIpID8gdGhpcy5oZWFkUGx1Z2luIDogdGhpcy50YWlsUGx1Z2luO1xyXG4gICAgICAgICAgICBpZiAoIWN1ckxpc3RbYXBpXSlcclxuICAgICAgICAgICAgICAgIGN1ckxpc3RbYXBpXSA9IG5ldyBBcnJheTxNb2RQbHVnaW4+KCk7XHJcbiAgICAgICAgICAgIGN1ckxpc3RbYXBpXS5wdXNoKHBsdWdpbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVnQVBJPFQgZXh0ZW5kcyBBcnJheTxhbnk+LFA+KGFwaTpzdHJpbmcsZnVuYzpGdW5jdGlvbik6KC4uLmFyZzpUKT0+UHtcclxuICAgICAgICAgICAgLy8uLi5cclxuICAgICAgICAgICAgbGV0IG1vZCA9IHRoaXM7XHJcbiAgICAgICAgICAgIGxldCBhcGlBcmdzID0gbmV3IEFycmF5PGFueT4oKTtcclxuICAgICAgICAgICAgYXBpQXJncy5wdXNoKGFwaSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoLi4uYXJnOlQpPT57XHJcbiAgICAgICAgICAgICAgICBhcGlBcmdzID0gYXBpQXJncy5jb25jYXQoYXJnKTtcclxuICAgICAgICAgICAgICAgIGxldCBwYXJhbSA9IG1vZC5SdW5IZWFkUGx1Z2luLmFwcGx5KG1vZCxhcGlBcmdzIGFzIFtzdHJpbmcsLi4uYW55W11dKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jLmFwcGx5KG1vZCxwYXJhbSkgYXMgUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBpZDooeDpudW1iZXIseTpudW1iZXIpPT52b2lkICA9IHRoaXMuUmVnQVBJKFwiU2V0UG9zXCIsKHg6IG51bWJlciwgeTogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsXCIsIHgsIHkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgUnVuSGVhZFBsdWdpbjxUPihhcGk6IHN0cmluZywgLi4ucGFyYW06IGFueVtdKTogYW55W10ge1xyXG4gICAgICAgICAgICBsZXQgYXJncyA9IHBhcmFtXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWFkUGx1Z2luW2FwaV0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbHVnaW4gPSB0aGlzLmhlYWRQbHVnaW5bYXBpXVtpXTtcclxuICAgICAgICAgICAgICAgIGFyZ3MgPSBwbHVnaW4uUnVuLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNb2RQbHVnaW4ge1xyXG4gICAgICAgIC8vLi4uXHJcbiAgICAgICAgcHVibGljIFJ1biguLi5wYXJhbTogYW55W10pOiBBcnJheTxhbnk+IHtcclxuICAgICAgICAgICAgLy8uLi5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2lnbmFsIHtcclxuICAgICAgICAvLy4uLlxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb2R1bGVNZ3Ige1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IE1vZHVsZSB9IGZyb20gXCIuLi9EYXRhVHlwZS9Nb2R1bGVcIjtcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGx1Z2luUmFuZG9te1xyXG4gICAgZXhwb3J0IGNsYXNzIFJhbmRQb2ludCBleHRlbmRzIE1vZHVsZS5Nb2RQbHVnaW57XHJcbiAgICAgICAgcHVibGljIFJ1bih4Om51bWJlcix5Om51bWJlcik6W251bWJlcixudW1iZXJde1xyXG4gICAgICAgICAgICAvLy4uLlxyXG4gICAgICAgICAgICByZXR1cm4gW3grTWF0aC5yYW5kb20oKSoxLHkrTWF0aC5yYW5kb20oKSoxXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJhbmRMaW5lIGV4dGVuZHMgTW9kdWxlLk1vZFBsdWdpbntcclxuICAgICAgICBwdWJsaWMgUnVuKHg6bnVtYmVyKTpbbnVtYmVyXXtcclxuICAgICAgICAgICAgLy8uLi5cclxuICAgICAgICAgICAgcmV0dXJuIFt4K01hdGgucmFuZG9tKCkqMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSBcIi4vRGF0YVR5cGUvTW9kdWxlXCI7XHJcbmltcG9ydCB7IFBsdWdpblJhbmRvbSB9IGZyb20gXCIuL1BsdWdpbi9QbHVnaW5SYW5kb21cIjtcclxuXHJcbmV4cG9ydCBtb2R1bGUgR2FtZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWFpbiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGQhXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEluaXQoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3RhcnQgTWFpbiBJbml0XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhhcyBFeHBvcnQgU3RpbGw/XCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtYWluID0gbmV3IE1haW4oKTtcclxuICAgIHZhciBtZ3I6IE1vZHVsZS5Nb2R1bGVNZ3IgPSBuZXcgTW9kdWxlLk1vZHVsZU1ncigpO1xyXG4gICAgdmFyIG1vZDogTW9kdWxlLk1vZCA9IG5ldyBNb2R1bGUuTW9kKCk7XHJcbiAgICB2YXIgdGVzdFBsZzogUGx1Z2luUmFuZG9tLlJhbmRQb2ludCA9IG5ldyBQbHVnaW5SYW5kb20uUmFuZFBvaW50KCk7XHJcblxyXG4gICAgbW9kLlJlZ1BsdWdpbihcImhlYWRcIiwgXCJTZXRQb3NcIiwgdGVzdFBsZyk7XHJcbiAgICBtb2QuUGlkKDIsMik7XHJcbiAgICAvL21vZC5TZXRQb3MoMiwgMik7XHJcbiAgICBtYWluLkluaXQoKTtcclxufSJdfQ==
