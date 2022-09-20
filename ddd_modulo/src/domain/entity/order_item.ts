export default class OrderItem{
    private __id: string;
    private __name: string;
    private __price: number;

    constructor(id: string, name: string, price: number){
        this.__id = id;
        this.__name = name;
        this.__price = price;

        this.validate();
    }

    getPrice(){
        return this.__price;
    }

    validate(){
        if(this.__id.length === 0){
            throw new Error("Id is required.");
        }
        if(this.__name.length === 0){
            throw new Error("Name is required.");
        }
        if(this.__price <= 0){
            throw new Error("Price must be than better of 0.");
        }
    }


}