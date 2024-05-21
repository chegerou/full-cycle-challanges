import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface ItemsData {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: "invoice",
  timestamps: false,
  underscored: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  addressStreet: string;

  @Column({ allowNull: false })
  addressNumber: string;

  @Column({ allowNull: false })
  addressComplement: string;

  @Column({ allowNull: false })
  addressCity: string;

  @Column({ allowNull: false })
  addressState: string;

  @Column({ allowNull: false })
  addressZipCode: string;

  @Column({
    allowNull: false,
    type: DataType.JSON,
    get() {
      const rawItems = this.getDataValue("items");
      return rawItems.map((item: any) => ({
        id: item?._id?._id ? item._id._id : item.id,
        name: item?._name ? item._name : item.name,
        price: item?._price ? item._price : item.price,
        createdAt: item._createdAt, // assuming the response uses underscores
        updatedAt: item._updatedAt, // assuming the response uses underscores
      }));
    },
  })
  items: ItemsData[];
}
