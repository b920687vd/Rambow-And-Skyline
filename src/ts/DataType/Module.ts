export module Module {
    export class Mod {
        //...

        protected headPlugin: { [key: string]: Array<ModPlugin> } = {};
        protected tailPlugin: { [key: string]: Array<ModPlugin> } = {};

        public RegPlugin(type: "head" | "tail", api: string, plugin: ModPlugin) {
            let curList: { [key: string]: Array<ModPlugin> };
            curList = (type == "head") ? this.headPlugin : this.tailPlugin;
            if (!curList[api])
                curList[api] = new Array<ModPlugin>();
            curList[api].push(plugin);
        }

        public RegAPI<T extends Array<any>,P>(api:string,func:Function):(...arg:T)=>P{
            //...
            let mod = this;
            let apiArgs = new Array<any>();
            apiArgs.push(api);
            return (...arg:T)=>{
                apiArgs = apiArgs.concat(arg);
                let param = mod.RunHeadPlugin.apply(mod,apiArgs as [string,...any[]]);
                return func.apply(mod,param) as P;
            }
        }

        public Pid:(x:number,y:number)=>void  = this.RegAPI("SetPos",(x: number, y: number)=>{
            console.log("final", x, y);
        });

        protected RunHeadPlugin<T>(api: string, ...param: any[]): any[] {
            let args = param
            for (let i = 0; i < this.headPlugin[api].length; i++) {
                let plugin = this.headPlugin[api][i];
                args = plugin.Run.apply(this, args);
            }
            return args;
        }
    }
    export class ModPlugin {
        //...
        public Run(...param: any[]): Array<any> {
            //...
            return new Array();
        }
    }

    export class Signal {
        //...
    }

    export class ModMgr {

    }
}