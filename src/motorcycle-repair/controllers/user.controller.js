const UserServices = require('../services/user.service');

// create
const createUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const emailExists = await UserServices.findOneUserByEmail(email);

        if (emailExists) {
            return res.status(409).json({
                status: 'Fail',
                message: `User with email ${email} already exists!😢`
            });
        }

        const newUser = await UserServices.createUser({
            name,
            email,
            password,
            role
        });

        return res.status(201).json({
            status: 'Success',
            data: newUser,
            message: 'User created successfully!🥳✨',
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
const findAllUsers = async (req, res) => {
    try {

        const users = await UserServices.findAllUsers();

        if (!users) {
            return res.status(404).json({
                status: 'Fail',
                message: 'Users not found!😢'
            });
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Users founded successfully!🥳✨',
            data: users
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
const findOneUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await UserServices.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                message: `User with ${id} not found 😢`
            })
        }

        return res.status(200).json({
            status: 'Success',
            message: 'Users founded successfully!🥳✨',
            user
        })

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
const updateUser = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        const user = await UserServices.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                message: `User with id ${id} not found 😢`
            })
        }

        const userUpdated = await UserServices.updateUser(user, {
            name,
            email
        })

        return res.status(201).json({
            status: 'Success',
            message: 'User updated successfully!🥳✨',
            data: userUpdated
        });

    } catch (error) {

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });
    }
};

// delete
const removeUser = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await UserServices.findOneUser(id);

        if (!user) {
            return res.status(404).json({
                message: `User with ${id} not found 😢`
            })
        }

        await UserServices.deleteUser(user);

        return res.status(200).json({
            status: 'Success',
            message: 'User deleted successfully!🥳✨'
        })

    } catch (error) {

        console.error('Error:', error);

        return res.status(500).json({
            status: 'Fail',
            message: 'Something went wrong!😭',
            error
        });
    }
};

module.exports = {
    createUser,
    findAllUsers,
    findOneUser,
    updateUser,
    removeUser
}