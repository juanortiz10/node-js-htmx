const { get } = require('mongoose');
const { createUser, deleteUser, getAllUsers, getUser, editUser } = require('../services/User');

const getEditItemComponent = (user) => (`
    <li class="bg-white rounded-md p-2 flex flex-row my-3 w-[60%]">
        <div class="w-[60%]">
            <p>Nombre: <input class="rounded-md border-2 border-slate-500 w-full px-2 py-1" name="name" value="${user.name}"/></p>
            <p>Email: <input class="rounded-md border-2 border-slate-500 w-full px-2 py-1" name="email" value="${user.email}"/></p>
        </div>
        <div class="w-[40%] flex justify-end cursor-pointer items-center">
            <button
                class="rounded-md px-3 py-1 hover:bg-slate-200 text-green-700 mr-2 font-medium" 
                hx-put="http://localhost:3001/users/${user.id}"
                hx-include="closest li"
                hx-confirm="¿Estás seguro de editar el usuario?"
            >
                Confirmar
            </button>
            <button
                class="rounded-md px-3 py-1 text-red-700 mr-3 font-medium hover:bg-red-100"
                hx-get="http://localhost:3001/users/${user.id}"
            >
                Cancel
            </button>
        </div>
    </li>   
`);

const getItemComponent = (user) => (`
    <li id="list" class="bg-white rounded-md p-2 flex flex-row my-3 w-[60%] group/item hover:bg-slate-100">
        <div class="w-[50%]">
            <p>Nombre: ${user.name}</p>
            <p>Email: ${user.email}</p>
        </div>
        <div class="w-[50%] flex justify-end cursor-pointer items-center">
            <button 
                class="rounded-md px-3 py-1 text-slate-800 font-medium group/edit invisible hover:bg-slate-200 group-hover/item:visible"
                hx-get="http://localhost:3001/users/edit/${user.id}"
            >
                Edit
            </button>
            <button 
                class="rounded-md px-3 py-1 text-red-700 mr-3 font-medium group/edit invisible hover:bg-red-100 group-hover/item:visible"
                hx-delete="http://localhost:3001/users/${user.id}"
                hx-confirm="¿Estás seguro de eliminar a ${user.name}?"
            >
                Delete
            </button>
        </div>
    </li>
`);

const getErrorComponent = (errorMsg) => (`<p class="text-red-500 font-semibold">${errorMsg}</p>`);

const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            return res.status(404).send(getErrorComponent("No se han encontrado usuarios"));
        }

        res.send(`
            <ul hx-swap="outerHTML swap:1s" hx-target="closest li">
                ${users.map((user) => getItemComponent(user)).join('')}
            </ul>
        `);
    } catch (error) {
        return res.status(500).send(getErrorComponent("Ha ocurrido un error al cargar los usuarios"));
    }
};

const editUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(getErrorComponent("El ID es requerido"));
        }

        if (!req.body.name || !req.body.email) {
            return res.status(400).send(getErrorComponent("El nombre y el email son obligatorios"));
        }

        await editUser(req.params.id, req.body);
        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(getErrorComponent("No se ha encontrado el usuario"));
        }

        return res.send(getItemComponent(user));
    } catch (error) {
        return res.status(500).send('');
    }
};

const getEditUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(getErrorComponent("El ID es requerido"));
        }

        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(getErrorComponent("No se ha encontrado el usuario"));
        }

        return res.send(getEditItemComponent(user));
    } catch (error) {
        return res.status(500).send('');
    }
};

const createUserController = async (req, res) => {
    try {

        if (!req.body.name || !req.body.email) {
            return res.status(500).send(getErrorComponent("El nombre y el email son obligatorios"));
        }

        const user = await createUser(req.body);

        if (!user) {
            return res.status(404).send(getErrorComponent("No se ha podido crear el usuario, el usuario no existe"));
        }

        return res.send(getItemComponent(user));
    } catch (error) {
        console.error(error);
        return res.status(500).send(getErrorComponent("No se ha podido crear el usuario, intenta de nuevo"));
    }
};

const deleteUserController = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
                
        return res.send('');
    } catch (error) {
        return res.status(204).json({ error: error });
    }
};

const getSingleUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(getErrorComponent("El ID es requerido"));
        }

        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(getErrorComponent("No se ha encontrado el usuario"));
        }

        res.send(getItemComponent(user));
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