import OrderItem from "./order_item";

export default class Order{

    private _id: string;
    private _custumerId: string;
    private _items: OrderItem[] = [];
    private _total: number;

    constructor(id: string, custumerId: string, items: OrderItem[]){
        this._id = id;
        this._custumerId = custumerId;
        this._items = items;
        this._total = this.total();


        this.validate();
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required.");
        }
        if(this._custumerId.length === 0){
            throw new Error("custumerId is required.");
        }
        if(this._items.length === 0){
            throw new Error("Items is required.");
        }
        if(this._items.some(item =>  item.quantity <= 0)){
            throw new Error("Quantity must be greater than zero.");
        }

    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}