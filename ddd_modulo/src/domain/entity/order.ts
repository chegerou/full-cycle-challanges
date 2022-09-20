import OrderItem from "./order_item";

export default class Order{

    private __id: string;
    private __custumerId: string;
    private __items: OrderItem[] = [];

    constructor(id: string, custumerId: string, items: OrderItem[]){
        this.__id = id;
        this.__custumerId = custumerId;
        this.__items = items;

        this.validate();
    }


    validate(){
        if(this.__id.length === 0){
            throw new Error("Id is required.");
        }

        if(this.__custumerId.length === 0){
            throw new Error("custumerId is required.");
        }

        if(this.__items.length === 0){
            throw new Error("Items is required.");
        }
    }

    total():number {
        return this.__items.reduce((acc, item) => acc + item.getPrice(), 0)
    }

}