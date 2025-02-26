import {
    Sequelize,
} from 'sequelize';
import mysql2 from 'mysql2';


export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    logging: console.log,
    maxConcurrentQueries: 100,
    dialectModule: mysql2,
    dialect: 'mysql',
    dialectOptions: {
        ssl: 'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: 'en'
});
