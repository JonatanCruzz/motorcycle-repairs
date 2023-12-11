import RepairService from "./repair.service.js";

export const validateRepairExist = async (req, res, next) => {
    const { id } = req.params;

    const repair = await RepairService.findOneRepair(id);

    if (!repair) {
        return res.status(404).json({
            status: 'Error',
            message: `Repair with id ${id} not found!😢`
        });
    }

    req.repair = repair;

    next();
};

export const validateRepair = async (req, res, next) => {
    const { date, motorsNumber, description } = req.body;

    if (!date || !motorsNumber || !description) {
        return res.status(400).json({
            status: 'Error',
            message: 'Please provide date, motorsNumber, description!😢'
        });
    }

    next();
};