import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/lib/sequelize';

interface UserAttributes {
    id: string;
    username: string;
    name: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

class User extends Model<UserAttributes, Optional<UserAttributes, 'id'>> implements UserAttributes {
    public readonly id!: string;
    public username!: string;
    public name!: string;
    public password!: string;
    public role!: string;
    
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public readonly deleted_at!: Date | null;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
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
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
    }
);

export default User;