import { Module } from "./DataType/Module";
import { PluginRandom } from "./Plugin/PluginRandom";
import { ModPackege } from "./Module/ModPackage";
import { MainTest } from "./MainTest";

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
    main.Init();
    MainTest();
}