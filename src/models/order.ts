// models/order.ts
import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "@/lib/sequelize"

interface OrderAttributes {
  id: string
  user_id: string
  customer_id: string
  total_harga: number
  status: string
  payment_method: string
  midtrans_id?: string
  created_at?: Date
  updated_at?: Date
}

class Order
  extends Model<OrderAttributes, Optional<OrderAttributes, "id">>
  implements OrderAttributes
{
  public readonly id!: string
  public user_id!: string
  public customer_id!: string
  public total_harga!: number
  public status!: string
  public payment_method!: string
  public midtrans_id?: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    total_harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    midtrans_id: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
    paranoid: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
)

export default Order
