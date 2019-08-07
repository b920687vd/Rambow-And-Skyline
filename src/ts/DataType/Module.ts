export module Module {
    export class Mod {
        //...

        /**
         * 头插列表字典
         * 包含所有接口的处理插件
         */
        protected headPlugin: { [key: string]: Array<Plugin> } = {};
        /**
         * 尾插列表字典
         * 包含所有事件、信号的处理插件
         */
        protected tailPlugin: { [key: string]: Array<Plugin> } = {};

        /**
         * 将插件注册到对应接口、信号上
         * 调用该接口时会预先调用该接口的所有头插来处理输入参数
         * 该模块生成的信号会调用所有尾插进行响应处理
         * @param type 注册插件的类型，是头插（接口输入处理）还是尾插（已生成信号反应）
         * @param api 插件要注册的目标接口名
         * @param plugin 要注册的插件对象
         */
        public RegPlugin(type: "head" | "tail", api: string, plugin: Plugin) {
            let curList: { [key: string]: Array<Plugin> };
            curList = (type == "head") ? this.headPlugin : this.tailPlugin;
            if (!curList[api])
                curList[api] = new Array<Plugin>();
            curList[api].push(plugin);
        }

        /**
         * 供函数自己注册接口的函数，返回一个完整的接口函数
         * 将一个函数注册为指定接口的处理函数
         * @param api 接口名
         * @param func 处理函数
         */
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

        protected RunHeadPlugin<T>(api: string, ...param: any[]): any[] {
            let args = param
            if (!this.headPlugin[api])
                return args;
            for (let i = 0; i < this.headPlugin[api].length; i++) {
                let plugin = this.headPlugin[api][i];
                args = plugin.Run.apply(this, args);
            }
            return args;
        }
    }
    export interface Plugin {
        //...
        Run(...param: any[]): Array<any>;
    }

    export class Signal {
        //...
    }

    export class ModMgr {

    }
}