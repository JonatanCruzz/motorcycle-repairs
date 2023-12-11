import { Sequelize } from 'sequelize';
import { envs } from '../enviroment/enviroment.js';

export const sequelize = new Sequelize(envs.DB_URI, {
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export const authenticate = async () => {
    try {

        await sequelize.authenticate();
        console.log('✅✨ Connection has been established successfully.');

    } catch (error) {

        console.error('❌ Unable to connect to the database:', error.message);

    }
};

export const syncUp = async () => {
    try {

        await sequelize.sync();
        console.log('✅✨ All models were synchronized successfully.');

    } catch (error) {

        console.error('❌ Unable to synchronize the models:', error.message);

    }
};