import Address from "./address";

export default class Customer {
    private __id: string;
    private __name: string;
    private __address!: Address;
    private __active: boolean = false;

    constructor(id: string, name: string, address: Address){
        this.__id = id;
        this.__name = name;
        this.__address = address;

        this.validate();
    }

    changeName(name: string){
        this.__name = name;

        this.validate();
    }

    changeAddress(address: Address){
        this.__address = address;
    }

    activate() {
        if(this.__address === undefined){
            throw new Error("Address is mandatory to activate a customer.");
        }

        this.__active = true;
    }

    deactivate() {
        this.__active = false;
    }

    validate(){
        if(this.__name.length === 0){
            throw new Error("Name is required.");
        }

        if(this.__id.length === 0){
            throw new Error("Id is required.");
        }
    }

}