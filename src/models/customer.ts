// models/customer.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/lib/sequelize';

interface CustomerAttributes {
    id: string;
    nama: string;
    no_hp: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
    
}

class Customer extends Model<CustomerAttributes, Optional<CustomerAttributes, 'id'>> implements CustomerAttributes {
    public readonly id!: string;
    public nama!: string;
    public no_hp!: string;
    public email!: string;
    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Customer.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
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
        modelName: 'Customer',
        tableName: 'customers',
        timestamps: true,
        paranoid: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Customer;
