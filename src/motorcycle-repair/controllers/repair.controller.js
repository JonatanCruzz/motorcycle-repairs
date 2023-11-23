const RepairService = require('../services/repair.service');
const UserService = require('../services/user.service');

// create
const createRepair = async (req, res) => {
    try {

        const { date, userId } = req.body;

        const user = await UserService.findOneUser(userId);

        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: `User with id ${userId} not found 😢!`
            });
        }

        if (user.status === 'disable') {
            return res.status(409).json({
                status: 'Fail',
                message: `User with id ${userId} disable 😖`
            });
        }

        const newRepair = await RepairService.createRepair({
            date,
            userId
        });

        return res.status(201).json({
            status: 'Success',
            data: newRepair,
            message: 'Repair created successfully!🥳✨',
        });

    } catch (error) {

        console.error('Error: ', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });

    }
};

// findAll
const findAllRepairs = async (req, res) => {
    try {

        const repairs = await RepairService.findAllRepairs();

        if (!repairs) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Repairs not found!😢'
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: repairs,
            message: 'Repairs founded successfully!🥳✨',
        });

    } catch (error) {

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });

    }
};

// findOne
const findOneRepair = async (req, res) => {
    try {

        const { id } = req.params;

        const repair = await RepairService.findOneRepair(id);

        if (!repair) {
            return res.status(404).json({
                status: 'Fail',
                message: `Repair with id ${id} not found!😢`
            });
        }

        return res.status(200).json({
            status: 'Success',
            data: repair,
            message: 'Repair founded successfully!🥳✨',
        });

    } catch (error) {

        console.error('Error:', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });
    }
};

// update
const updateRepair = async (req, res) => {
    try {
        const { id } = req.params;

        const repair = await RepairService.findOneRepair(id);

        if (!repair) {
            return res.status(404).json({
                status: 'Fail',
                message: `Repair with id ${id} not found!😢`
            });
        }

        await RepairService.updateRepair(repair);

        return res.status(200).json({
            status: 'Success',
            message: 'Repair updated successfully!🥳✨',
        });

    } catch (error) {

        console.error('Error: ', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });

    }
};

// delete
const removeRepair = async (req, res) => {

    try {
        const { id } = req.params;

        const repair = await RepairService.findOneRepairByStatus(id);

        if (!repair) {
            return res.status(404).json({
                status: 'Fail',
                message: `Repair with ${id} not found!😢`
            });
        }

        if (repair.status === 'completed') {
            return res.status(409).json({
                status: 'Fail',
                message: 'Repair already completed!😇'
            });
        }

        await RepairService.deleteRepair(repair);

        return res.status(200).json({
            status: 'Success',
            message: 'Repair deleted successfully!🥳✨',
        });

    } catch (error) {

        console.error('Error: ', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });

    }
};

module.exports = {
    createRepair,
    findAllRepairs,
    findOneRepair,
    updateRepair,
    removeRepair
};