const { createUser, deleteUser, getAllUsers, getUser, editUser } = require('../services/User');

 
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            return res.status(404).send(`<div>TODO</div>`);
        }

        res.send(`<div>TODO</div>`);
    } catch (error) {
        return res.status(500).send(`<div>TODO</div>`);
    }
};

const editUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(`<div>TODO</div>`);
        }

        if (!req.body.name || !req.body.email) {
            return res.status(400).send(`<div>TODO</div>`);
        }

        await editUser(req.params.id, req.body);
        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(`<div>TODO</div>`);
        }

        return res.send(getItemComponent(user));
    } catch (error) {
        return res.status(500).send('');
    }
};

const getEditUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(`<div>TODO</div>`);
        }

        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(`<div>TODO</div>`);
        }

        return res.send(`<div>TODO</div>`);
    } catch (error) {
        return res.status(500).send('');
    }
};

const createUserController = async (req, res) => {
    try {

        if (!req.body.name || !req.body.email) {
            return res.status(500).send(`<div>TODO</div>`);
        }

        const user = await createUser(req.body);

        if (!user) {
            return res.status(404).send(`<div>TODO</div>`);
        }

        return res.send(`<div>TODO</div>`);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`<div>TODO</div>`);
    }
};

const deleteUserController = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);

        if (!user) {
            return res.status(404).send(`<div>TODO</div>`);
        }
                
        return res.send('');
    } catch (error) {
        return res.status(204).send(`<div>TODO</div>`);
    }
};

const getSingleUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(`<div>TODO</div>`);
        }

        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(`<div>TODO</div>`);
        }

        res.send(`<div>TODO</div>`);
    } catch (error) {
        return res.status(500).send('');
    }
};

module.exports = {
    getAllUsersController,
    createUserController,
    deleteUserController,
    getEditUserController,
    getSingleUserController,
    editUserController,
};