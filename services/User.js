const UserModel = require("../models/User");

const getAllUsers = async () => {
    try {
        const users = await UserModel.find();
        return users;
    } catch (error) {
        console.log(error);
        return;
    }
};

const getUser = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        console.log(error);
        return;
    }
}

const createUser = async (user) => {
    try {
        const userCreated = await UserModel.create(user);
        return userCreated;
    } catch (error) {
        console.log(error);
        return;
    }
};

const deleteUser = async (id) => {
    try {
        const userDeleted = await UserModel.findByIdAndDelete(id);
        return userDeleted;
    } catch (error) {
        return;
    }
};

const editUser = async (id, user) => {
    try {
        const userEdited = await UserModel.findByIdAndUpdate(id, user);
        return userEdited;
    } catch (error) {
        return;
    }
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    getUser,
    editUser,
};