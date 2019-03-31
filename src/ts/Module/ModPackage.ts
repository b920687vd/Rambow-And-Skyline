import { Module } from "../DataType/Module";

enum PackageAPI{
    HasItem = "HasItem"
}

export class ModPackege extends Module.Mod{
    constructor(){
        super();
        //..
    }

    private itemPack:{[key:string]:number} = {};

    public HasItem:(name:string)=>boolean = this.RegAPI(PackageAPI.HasItem,(name:string):boolean=>{
        //...
        if(!this.itemPack.hasOwnProperty(name))
            return false;
        if(this.itemPack[name] == 0)
            return false;
        return true;
    });
}