import express from 'express';
import { getUsers } from '../controllers/users';

const router = express.Router();

router.route('/').get(getUsers);

module.exports = router;
