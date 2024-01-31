const { createUser, deleteUser, getAllUsers, getUser, editUser } = require('../services/User');

const getUserComponent = (user) => `
    <li class="bg-white rounded-md p-2 flex my-3 w-[60%] group/item hover:bg-slate-100">
        <div class="w-[60%]">
            <p>
                Nombre: ${user.name}
            </p>
            <p>
                Email: ${user.email}
            </p>
        </div>
        <div class="w-[40%] flex justify-end items-center">
            <button 
                class="rounded-md px-3 py-1 font-medium text-slate-800 invisible group/edit group-hover/item:visible hover:bg-slate-200"
                hx-get="http://localhost:3001/users/edit/${user.id}"
            >
                Edit
            </button>
            <button 
                class="rounded-md px-3 py-1 font-medium text-red-700 invisible group/edit group-hover/item:visible hover:bg-red-100"
                hx-delete="http://localhost:3001/users/${user.id}"
                hx-confirm="¿Estás seguro de eliminar a ${user.name}?"
            >
                Delete
            </button>
        </div>
    </li>
`;

const getEditUserComponent = (user) => `
    <li class="bg-white rounded-md p-2 flex my-3 w-[60%] group/item hover:bg-slate-100">
        <div class="w-[60%]">
            <p>
                Nombre: <input class="border-slate-200 border-2 placeholder-slate-200 p-1 h-8 rounded-sm focus:outline-none focus:ring" name="name" value="${user.name}" />
            </p>
            <p class="mt-2">
                Email: <input class="border-slate-200 border-2 placeholder-slate-200 p-1 h-8 rounded-sm focus:outline-none focus:ring" name="email" value="${user.email}" />
            </p>
        </div>
        <div class="w-[40%] flex justify-end items-center">
            <button 
                class="rounded-md px-3 py-1 font-medium text-green-700 hover:bg-slate-200"
                hx-put="http://localhost:3001/users/${user.id}"
                hx-confirm="¿Estás seguro de querer editar el usuario?"
                hx-include="closest li"
            >
                Confirmar
            </button>
            <button 
                class="rounded-md px-3 py-1 font-medium text-red-700 hover:bg-red-100"
                hx-get="http://localhost:3001/users/${user.id}"
            >
                Cancelar
            </button>
        </div>
    </li>
`;

const getErrorComponent = (erroMsg) => `<p class="text-red-500 font-semibold">${erroMsg}</p>`;
 
const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            return res.status(404).send(getErrorComponent('No se ha podido cargar los usuarios, intente de nuevo'));
        }

        return res.send(`
            <ul hx-swap="outerHTML swap:1s" hx-target="closest li">
                ${users.map(user => getUserComponent(user)).join('')}
            </ul>
        `);
    } catch (error) {
        return res.status(500).send(getErrorComponent('Ha ocurrido un error inesperado, intente de nuevo mas tarde'));
    }
};

const editUserController = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).send(getErrorComponent('El id del usuario debe enviarse'));
        }

        if (!req.body.name || !req.body.email) {
            return res.status(400).send(getErrorComponent('El nombre y el email son requeridos'));
        }

        await editUser(req.params.id, req.body);
        const user = await getUser(req.params.id);

        if (!user) {
            return res.status(404).send(getErrorComponent('El usuario no existe'));
        }

        return res.send(getUserComponent(user));
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

        return res.send(getEditUserComponent(user));
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

        return res.send(getUserComponent(user));
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

        res.send(getUserComponent(user));
    } catch (error) {
        console.log(error)
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