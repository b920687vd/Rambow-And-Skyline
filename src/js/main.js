"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Module = __importStar(require("./Module/Module"));
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
    var mgr = new Module.ModuleMgr();
    var mod = new Module.Module.Mod();
    var testPlg = new PluginRandom_1.PluginRandom();
    mod.RegPlugin("head", "SetPos", testPlg);
    mod.SetPos(1, 1);
    main.Init();
})(Game = exports.Game || (exports.Game = {}));
