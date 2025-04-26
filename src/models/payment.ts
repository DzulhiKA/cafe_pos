// models/payment.ts
import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "@/lib/sequelize"

interface PaymentAttributes {
  id: string
  order_id: string
  payment_type: string
  transaction_status: string
  midtrans_response?: object
  created_at?: Date
  updated_at?: Date
}

class Payment
  extends Model<PaymentAttributes, Optional<PaymentAttributes, "id">>
  implements PaymentAttributes
{
  public readonly id!: string
  public order_id!: string
  public payment_type!: string
  public transaction_status!: string
  public midtrans_response?: object

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Payment.init(
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
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    midtrans_response: {
      type: DataTypes.JSONB,
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
    modelName: "Payment",
    tableName: "payments",
    timestamps: true,
    paranoid: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
)

export default Payment
