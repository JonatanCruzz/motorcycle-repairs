import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: false,
        validate: {
            isIn: {
                args: [['client', 'employee']],
                msg: 'Role must be either "client" or "employee".'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('available', 'disable'),
        allowNull: false,
        defaultValue: 'available'
    }
});

export default Users;