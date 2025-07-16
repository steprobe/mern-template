import express from 'express';
import { auth } from '../middleware/auth';
import {
  getUser,
  updateUser,
  updateUserSchema,
} from '../controllers/user/user-controller';
import { validate } from '../validation/validate';
import { use } from './utils';

const r = express.Router();

const userMnt = '/user';
r.get(userMnt, [auth], use(getUser));
r.put(userMnt, [auth, validate(updateUserSchema)], use(updateUser));

export default r;
