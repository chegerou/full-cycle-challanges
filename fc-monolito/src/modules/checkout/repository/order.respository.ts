import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
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
  async findOrder(id: string): Promise<Order> {
    const orderModel = await OrderModel.findByPk(id);

    return new Order({
      id: new Id(orderModel.id),
      client: new Client({
        id: new Id(orderModel.client.id),
        name: orderModel.client.name,
        email: orderModel.client.email,
        address: orderModel.client.address,
      }),
      products: orderModel.products.map(
        (p) =>
          new Product({
            id: new Id(p.id),
            name: p.name,
            description: p.description,
            salesPrice: p.salesPrice,
          })
      ),
      status: orderModel.status,
    });
  }
}
