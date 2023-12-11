import RepairService from './repair.service.js';
import { validatePartialRepair, validateRepair } from './repair.schema.js';
import UserService from '../users/user.service.js';
import { catchAsync } from '../../common/errors/catchAsync.js';

// create
export const createRepair = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, repairData } = validateRepair(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'Error',
            message: errorMessages
        });
    }

    const user = await UserService.findOneUser(repairData.userId);

    if (!user)
        return next(new AppError(`User with id ${repairData.userId} not found`, 404));

    if (user.status === 'disable')
        return next(new AppError(`User with id ${repairData.userId} is disable`, 401));

    const newRepair = await RepairService.createRepair(repairData);

    return res.status(201).json({
        status: 'Success',
        data: {
            id: newRepair.id,
            date: newRepair.date,
            motorsNumber: newRepair.motorsNumber,
            description: newRepair.description,
            status: newRepair.status,
            userId: newRepair.userId,
        },
        message: 'Repair created successfully!🥳✨',
    });
});

// findAll
export const findAllRepairs = catchAsync(async (req, res) => {

    const repairs = await RepairService.findAllRepairs();

    return res.status(200).json({
        status: 'Success',
        data: repairs,
        message: 'Repairs founded successfully!🥳✨',
    });
});

// findOne
export const findOneRepair = catchAsync(async (req, res) => {

    const { repair } = req;

    return res.status(200).json({
        data: {
            id: repair.id,
            date: repair.date,
            motorsNumber: repair.motorsNumber,
            description: repair.description,
            status: repair.status,
            userId: repair.userId,
        },
        status: 'Success',
        message: 'Repair founded successfully!🥳✨',
    });

});

// update
export const updateRepair = catchAsync(async (req, res) => {

    const { repair } = req;
    const { hasError, errorMessages, repairData } = validatePartialRepair(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'Error',
            message: errorMessages,
        });
    }

    const repairUpdated = await RepairService.updateRepair(repair, repairData);

    return res.status(200).json({
        data: repairUpdated,
        status: 'Success',
        message: 'Repair updated successfully!🥳✨',
    });
});

// delete
export const removeRepair = catchAsync(async (req, res) => {

        const { repair } = req;

        if (repair.status === 'completed') {
           return next(new AppError(`Repair with id ${repair.id} is completed`, 401));
        }

        await RepairService.deleteRepair(repair);

        return res.status(200).json({
            status: 'Success',
            message: 'Repair deleted successfully!🥳✨',
        });

});
