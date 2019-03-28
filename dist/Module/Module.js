"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var ModuleMgr_1 = require("./ModuleMgr");
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
                    var args = mod.EnterHeadPlugin("SetPos", x, y);
                    mod.setPos.apply(mod, args);
                };
            },
            enumerable: true,
            configurable: true
        });
        Mod.prototype.setPos = function (x, y) {
            console.log("final", x, y);
        };
        Mod.prototype.EnterHeadPlugin = function (api) {
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
    var Manager = new ModuleMgr_1.ModuleMgr();
})(Module = exports.Module || (exports.Module = {}));
exports.default = Module;
__export(require("./ModuleMgr"));
__export(require("./ModPlugin"));
