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
        const item = new OrderItem("1", "item 1", 100);
        const item2 = new OrderItem("2", "item 2", 100);
        const item3= new OrderItem("3", "item 3", 100);

        let oldOrder = new Order("123", "123", [item]);

        let total = oldOrder.total();

        expect(100).toBe(total);

        let newOrder = new Order("123", "123", [item, item2, item3]);

        total = newOrder.total();

        expect(300).toBe(total);
    });
});