import { Sequelize } from "sequelize"
import pg from "pg";
import { logError, logSuccess } from "./logging";

const dbURL = process.env.DB_URL || 'postgres://user:password@localhost:5432/mydb'
export const isProduction = process.env.NODE_ENV === 'production'

const getDialectOptions = () => {
    return isProduction ? {
        ssl: {
            require: true,
            rejectUnauthorized: true
        }
    } : {};
}

export const sequelize = new Sequelize(dbURL, {
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
    dialectOptions: getDialectOptions(),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export const checkDatabaseConnection = async () => {
    try {
        await sequelize.authenticate()
        logSuccess('Connection to the database has been established successfully.')
    } catch (error) {
        logError('Unable to connect to the database:', error)
        process.exit(1)
    }
}