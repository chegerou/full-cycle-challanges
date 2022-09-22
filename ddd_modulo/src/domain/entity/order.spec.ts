import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", ()=> {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required.");
    });

    it("should throw error when custumerId is empty", ()=> {
        expect(() => {
            let order = new Order("123", "", [])
        }).toThrowError("custumerId is required.");
    });

    it("should throw error when orderItems is empty", ()=> {
        expect(() => {
            let order = new Order("123", "123", [])
        }).toThrowError("Items is required.");
    });

    it("should calculate total", ()=> {
        const item = new OrderItem("1", "item 1", 100, "p1", 2);
        const item2 = new OrderItem("2", "item 2", 100, "p2", 2);
        const item3= new OrderItem("3", "item 3", 100, "p3", 2);

        let oldOrder = new Order("123", "123", [item]);

        let total = oldOrder.total();

        expect(200).toBe(total);

        let newOrder = new Order("123", "123", [item, item2, item3]);

        total = newOrder.total();

        expect(600).toBe(total);
    });

    it("should throw error if the item qtd is less or equal zero", ()=> {
        expect(() => {
            const item = new OrderItem("1", "item 1", 100, "p1", 0);
            let oldOrder = new Order("123", "123", [item]);
        }).toThrowError("Quantity must be greater than zero.");

    });

});