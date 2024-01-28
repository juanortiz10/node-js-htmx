const express = require('express');

const {
    createUserController,
    deleteUserController,
    getAllUsersController,
    getEditUserController,
    getSingleUserController,
    editUserController,
} = require('../controllers/User');

const router = express.Router();

router.get('/', getAllUsersController);
router.get('/:id', getSingleUserController);
router.get('/edit/:id', getEditUserController);

router.post('/', createUserController);

router.put('/:id', editUserController);

router.delete('/:id', deleteUserController);

module.exports = router;