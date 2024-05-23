import { Sequelize } from "sequelize-typescript";
import OrderModel from "./order.model";
import OrderRepository from "./order.respository";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";
import exp from "constants";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      define: {
        underscored: false,
      },
    });

    await sequelize.addModels([OrderModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a order", async () => {
    const repository = new OrderRepository();
    const order = new Order({
      id: new Id("1o"),
      client: new Client({
        id: new Id("1c"),
        name: "Client 1",
        email: "x@x.com",
        address: "123456789",
      }),
      products: [
        new Product({
          id: new Id("1p"),
          name: "Product 1",
          salesPrice: 10,
          description: "Product 1 description",
        }),
        new Product({
          id: new Id("2p"),
          name: "Product 2",
          salesPrice: 20,
          description: "Product 2 description",
        }),
      ],
    });
    await repository.addOrder(order);

    const orderModel = await OrderModel.findOne({ where: { id: "1o" } });
    expect(orderModel.products.length).toBe(2);
    expect(orderModel.total).toBe(30);
    expect(orderModel.status).toBe("pending");
    expect(orderModel.id).toBe(order.id.id);
    expect(orderModel.client.id).toBe(order.client.id.id);
    expect(orderModel.client.name).toBe(order.client.name);
    expect(orderModel.client.email).toBe(order.client.email);
    expect(orderModel.client.address).toBe(order.client.address);
  });

  it("should find a order", async () => {
    await OrderModel.create({
      id: "1o",
      client: {
        id: "1c",
        name: "Client 1",
        email: "x@x.com",
        address: "123456789",
      },
      total: 30,
      status: "pending",
      products: [
        {
          id: "1p",
          name: "Product 1",
          salesPrice: 10,
          description: "Product 1 description",
        },
        {
          id: "2p",
          name: "Product 2",
          salesPrice: 20,
          description: "Product 2 description",
        },
      ],
    });

    const repository = new OrderRepository();
    const order = await repository.findOrder("1o");
    expect(order.id.id).toBe("1o");
    expect(order.total).toBe(30);
    expect(order.status).toBe("pending");
    expect(order.client.id.id).toBe("1c");
    expect(order.client.name).toBe("Client 1");
    expect(order.client.email).toBe("x@x.com");
    expect(order.client.address).toBe("123456789");
    expect(order.products.length).toBe(2);
    expect(order.products[0].id.id).toBe("1p");
    expect(order.products[0].name).toBe("Product 1");
    expect(order.products[0].description).toBe("Product 1 description");
    expect(order.products[0].salesPrice).toBe(10);
    expect(order.products[1].id.id).toBe("2p");
    expect(order.products[1].name).toBe("Product 2");
    expect(order.products[1].description).toBe("Product 2 description");
    expect(order.products[1].salesPrice).toBe(20);
  });
});
