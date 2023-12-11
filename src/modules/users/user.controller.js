import UserServices from './user.service.js';
import { generateJWT } from '../../config/plugins/generate-jwt.plugin.js';
import { encryptedPassword, verifyPassword } from '../../config/plugins/encripted-password.plugin.js';
import { validateLogin, validatePartialUser, validateUser } from './user.schema.js';
import UserService from './user.service.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { AppError } from '../../common/errors/appError.js';

// register
export const register = catchAsync(async (req, res) => {

    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'Fail',
            message: 'Validation error',
            errors: errorMessages
        });
    }

    const emailExists = await UserServices.findOneUserByEmail(userData.email);

    if (emailExists)
        return next(new AppError(`User with email ${userData.email} already exists!😢`, 409));

    const hashedPassword = await encryptedPassword(userData.password);
    userData.password = hashedPassword;

    const newUser = await UserServices.register(userData);

    return res.status(201).json({
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: newUser.status,
        },
        status: 'Success',
        message: 'User created successfully!🥳✨',
    });
});

// login
export const login = catchAsync(async (req, res, next) => {

    const { hasError, errorMessages, userData } = validateLogin(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const user = await UserService.findOneUserByEmail(userData.email);

    if (!user)
        return next(new AppError('This account does not exist😢', 409));

    if (user.status === 'disable')
        return next(new AppError('This account is disabled😢', 403));

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    );

    if (!isCorrectPassword)
        return next(new AppError('Incorrect email or password', 401));

    const token = await generateJWT(user.id);

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        },
        status: 'Success',
        message: 'User logged in successfully!🥳✨',
    });

});

// findAll
export const findAllUsers = catchAsync(async (req, res) => {
    try {

        const users = await UserServices.findAllUsers();

        return res.status(200).json({
            data: users,
            status: 'Success',
            message: 'Users founded successfully!🥳✨',
        });

    } catch (error) {

        console.error('Error:', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });
    }
});

// findOne
export const findOneUser = catchAsync(async (req, res) => {

    const { user } = req;

    return res.status(200).json({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        },
        status: 'Success',
        message: 'Users founded successfully!🥳✨',
    });
});

// update
export const updateUser = catchAsync(async (req, res) => {

    const { user } = req;
    const { hasError, errorMessages, userData } = validatePartialUser(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        });
    }

    const userUpdated = await UserServices.updateUser(user, userData)

    return res.status(201).json({
        data: userUpdated,
        status: 'Success',
        message: 'User updated successfully!🥳✨',
    });

});

// delete
export const removeUser = catchAsync(async (req, res) => {

    const { user } = req;

    await UserServices.deleteUser(user);

    return res.status(200).json({
        status: 'Success',
        message: 'User deleted successfully!🥳✨'
    });

});