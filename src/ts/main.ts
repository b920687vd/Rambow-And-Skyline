import * as Module from "./Module/Module";
import { PluginRandom } from "./Plugin/PluginRandom";

export module Game{
    export class Main{
        constructor(){
            console.log("Hello world!");
        }

        public Init(){
            console.log("Start Main Init");
            console.log("Has Export Still?")
        }
    }

    var main = new Main();
    var mgr:Module.ModuleMgr = new Module.ModuleMgr();
    var mod:Module.Module.Mod = new Module.Module.Mod();
    var testPlg:PluginRandom = new PluginRandom();
    mod.RegPlugin("head","SetPos",testPlg);
    mod.SetPos(1,1);
    main.Init();
}