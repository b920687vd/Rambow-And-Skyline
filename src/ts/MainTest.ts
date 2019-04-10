import { Module } from "./DataType/Module";
import { PluginRandom } from "./Plugin/PluginRandom";
import { ModPackege } from "./Module/ModPackage";

export function MainTest() {
    console.group("Main Test");
    pluginTest();
    packageTest();
    console.groupEnd();
}

function pluginTest() {
    var mgr: Module.ModMgr = new Module.ModMgr();
    var mod: Module.Mod = new Module.Mod();
    var testPlg: PluginRandom.RandPoint = new PluginRandom.RandPoint();
    mod.RegPlugin("head", "SetPos", testPlg);
}

function packageTest() {
    //...
    console.group("Test--Mod Package--Begin");
    var pack: ModPackege = new ModPackege();
    var strCloth: string = "cloth";
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

    console.group("Package Data")
    console.table(pack.GetPackageData());
    console.groupEnd();
    
    console.groupEnd();
}