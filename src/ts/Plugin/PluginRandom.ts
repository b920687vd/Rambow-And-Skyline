import { Module } from "../DataType/Module";

export class PluginRandom extends Module.ModPlugin{
    public Run(x:number,y:number):[number,number]{
        //...
        return [x+Math.random()*1,y+Math.random()*1];
    }
}