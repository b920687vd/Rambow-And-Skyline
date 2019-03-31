import { Module } from "./DataType/Module";
import { PluginRandom } from "./Plugin/PluginRandom";

export module Game {
    export class Main {
        constructor() {
            console.log("Hello world!");
        }

        public Init() {
            console.log("Start Main Init");
            console.log("Has Export Still?")
        }
    }

    var main = new Main();
    var mgr: Module.ModMgr = new Module.ModMgr();
    var mod: Module.Mod = new Module.Mod();
    var testPlg: PluginRandom.RandPoint = new PluginRandom.RandPoint();

    mod.RegPlugin("head", "SetPos", testPlg);
    main.Init();
}