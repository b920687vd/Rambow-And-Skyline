import { Module } from "../DataType/Module";

export module PluginRandom{
    export class RandPoint implements Module.Plugin{
        public Run(x:number,y:number):[number,number]{
            //...
            return [x+Math.random()*1,y+Math.random()*1];
        }
    }

    export class RandLine implements Module.Plugin{
        public Run(x:number):[number]{
            //...
            return [x+Math.random()*1];
        }
    }
}