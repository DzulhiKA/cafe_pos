// models/menu.ts
import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "@/lib/sequelize"

interface MenuAttributes {
  id: string
  nama_menu: string
  deskripsi?: string
  kategori_id: string
  harga: number
  stok: number
  gambar_url?: string
  created_at?: Date
  updated_at?: Date
}

class Menu
  extends Model<MenuAttributes, Optional<MenuAttributes, "id">>
  implements MenuAttributes
{
  public readonly id!: string
  public nama_menu!: string
  public deskripsi?: string
  public kategori_id!: string
  public harga!: number
  public stok!: number
  public gambar_url?: string

  public readonly created_at!: Date
  public readonly updated_at!: Date
}

Menu.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nama_menu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deskripsi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    kategori_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    harga: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gambar_url: {
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
    modelName: "Menu",
    tableName: "menus",
    timestamps: true,
    paranoid: true,
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
)

export default Menu
