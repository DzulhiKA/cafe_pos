// models/orderItem.ts
import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "@/lib/sequelize"

interface OrderItemAttributes {
  id: string
  order_id: string
  menu_id: string
  jumlah: number
  harga_satuan: number
  subtotal: number
  created_at?: Date
  updated_at?: Date
}

class OrderItem
  extends Model<OrderItemAttributes, Optional<OrderItemAttributes, "id">>
  implements OrderItemAttributes
{
  public readonly id!: string
  public order_id!: string
  public menu_id!: string
  public jumlah!: number
  public harga_satuan!: number
  public subtotal!: number

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

OrderItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    menu_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    jumlah: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga_satuan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: true,
    paranoid: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
)

export default OrderItem
