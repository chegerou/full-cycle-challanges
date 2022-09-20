//Objeto de Valor - Não pode ser alterado.
export default class Address{
   private __street: string = "";
   private __number: number = 0;
   private __zip: string = "";
   private __active: boolean = false;

   constructor(street: string,number: number, zip: string){
     this.__street = street;
     this.__number = number;
     this.__zip = zip;

     this.validate();
   }

   validate(){
    if(this.__street.length === 0){
        throw new Error("street is required.")
    }
    if(this.__number <= 0){
        throw new Error("number is required.")
    }
    if(this.__zip.length === 0){
        throw new Error("zipcode is required.")
    }
   }



}