import { Module } from "../DataType/Module";

enum PackageAPI{
    HasItem = "HasItem",
    AddItem = "AddItem",
    GetPackageData = "GetPackageData",
    CostItem = "CostItem",
    GetItemNum = "GetItemNum"
}

export class ModPackege extends Module.Mod{
    constructor(){
        super();
        //..
    }

    private itemPack:{[key:string]:number} = {};

    public HasItem:(itemName:string)=>boolean = this.RegAPI(PackageAPI.HasItem,(itemName:string):boolean=>{
        //...
        if(!this.itemPack.hasOwnProperty(itemName))
            return false;
        if(this.itemPack[itemName] == 0)
            return false;
        return true;
    });

    public AddItem:(item:string,num:number)=>number = this.RegAPI(PackageAPI.AddItem,(item:string,num:number):number=>{
        if(!this.itemPack.hasOwnProperty(item))
            this.itemPack[item] = 0;
        this.itemPack[item]+=num;
        return this.itemPack[item];
    })

    public CostItem:(item:string,num:number)=>number = this.RegAPI(PackageAPI.CostItem,(item:string,num:number):number=>{
        if(!this.itemPack.hasOwnProperty(item))
            this.itemPack[item] = 0;
        this.itemPack[item]-=num;
        if(this.itemPack[item]<0){
            console.warn("ModPackage::CostItem/nCost Item Num is more than the item you have!");
            this.itemPack[item] = 0;
        }
        return this.itemPack[item];
    })

    public GetItemNum:(item:string)=>number = this.RegAPI(PackageAPI.GetItemNum,(item:string):number=>{
        if(!this.itemPack.hasOwnProperty(item))
            this.itemPack[item] = 0;
        return this.itemPack[item];
    })

    public GetPackageData:()=>{[key:string]:number} = this.RegAPI(PackageAPI.GetPackageData,():{[key:string]:number}=>{
        //.../*
        return this.itemPack;
    })
}