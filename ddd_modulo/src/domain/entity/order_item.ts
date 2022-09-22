export default class OrderItem{
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number){
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    getPrice(){
        return this._price;
    }

    validate(){
        if(this._id.length === 0){
            throw new Error("Id is required.");
        }
        if(this._name.length === 0){
            throw new Error("Name is required.");
        }
        if(this._price <= 0){
            throw new Error("Price must be than better of 0.");
        }
    }


}