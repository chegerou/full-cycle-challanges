import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./order.model";

export default class OrderRepository implements CheckoutGateway {
  async addOrder(input: Order): Promise<void> {
    await OrderModel.create({
      id: input.id.id,
      client: {
        id: input.client.id.id,
        name: input.client.name,
        email: input.client.email,
        address: input.client.address,
      },
      products: input.products.map((p) => ({
        id: p.id.id,
        name: p.name,
        description: p.description,
        salesPrice: p.salesPrice,
      })),
      status: input.status,
      total: input.total,
    });
  }
  findOrder(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}
