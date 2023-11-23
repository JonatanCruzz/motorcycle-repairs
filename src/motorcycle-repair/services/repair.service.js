const { where } = require('sequelize');
const RepairModel = require('../models/repair.model');

class RepairService {

    static async createRepair(data) {
        return await RepairModel.create(data);
    }

    static async findAllRepairs() {
        return await RepairModel.findAll({
            where: {
                status: 'pending'
            }
        });
    }

    static async findOneRepair(id) {
        return await RepairModel.findOne({
            where: {
                id,
                status: 'pending'
            }
        });
    }

    static async findOneRepairByStatus(id) {
        return await RepairModel.findByPk(id);
    }

    static async updateRepair(repair) {
        return await repair.update({
            status: 'completed'
        });
    }

    static async deleteRepair(repair) {
        return await repair.update({
            status: 'cancelled'
        });
    };
};

module.exports = RepairService;