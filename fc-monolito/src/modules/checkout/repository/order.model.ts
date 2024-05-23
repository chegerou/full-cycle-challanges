import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

interface ClientData {
  id: string;
  name: string;
  email: string;
  address: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  client: ClientData;

  @Column({ allowNull: false })
  products: Product[];

  @Column({ allowNull: false })
  status: string;

  @Column({ allowNull: false })
  total: number;
}
