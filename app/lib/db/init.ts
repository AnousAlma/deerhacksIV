import EventPost from "./models/post";
import EventTag from "./models/tag";
import { sequelize } from './config';

const isDev = process.env.NODE_ENV === 'development'

const initializeDatabase = async () => {
    try {
        // Test the DB connection
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        EventPost.sync({ alter: isDev, force: isDev })
        EventTag.sync({ alter: isDev, force: isDev })

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

export default initializeDatabase;