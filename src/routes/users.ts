import express from 'express';
import { getUsers, createUser, updateUser } from '../controllers/users';

const router = express.Router();

router.route('/').get(getUsers).post(createUser).put(updateUser);

module.exports = router;
