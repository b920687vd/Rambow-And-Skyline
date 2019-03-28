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
var Module_1 = require("../Module/Module");
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
}(Module_1.ModPlugin));
exports.PluginRandom = PluginRandom;
