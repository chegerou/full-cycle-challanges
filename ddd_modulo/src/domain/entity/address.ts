//Objeto de Valor - Não pode ser alterado.
export default class Address{
   private __street: string = "";
   private __number: number = 0;
   private __zip: string = "";
   private __city: string = "";
   private __active: boolean = false;

   constructor(street: string,number: number, zip: string, city: string){
     this.__street = street;
     this.__number = number;
     this.__zip = zip;
     this.__city = city;

     this.validate();
   }

   validate(): boolean{
    
    if(this.__street.length === 0){
        throw new Error("street is required.")
    }
    if(this.__number <= 0){
        throw new Error("number is required.")
    }
    if(this.__zip.length === 0){
        throw new Error("zipcode is required.")
    }
    if(this.__city.length === 0){
        throw new Error("city is required.")
    }

    return true;
   }

}