const UserModel = require('../models/user.model');

class UserService {

    static async createUser(data) {
        return await UserModel.create(data);
    }

    static async findAllUsers() {
        return await UserModel.findAll();
    }

    static async findOneUser(id) {
        return await UserModel.findByPk(id);
    }

    static async findOneUserByEmail(email) {
        return await UserModel.findOne({
            where: { email }
        });
    }

    static async updateUser(user, data) {
        return await user.update(data);
    }

    static async deleteUser(user) {
        return await user.update({
            status: 'disable'
        });
    };
};

module.exports = UserService;