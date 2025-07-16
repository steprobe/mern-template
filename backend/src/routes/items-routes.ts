import express from 'express';
import { validate } from '../validation/validate';
import { use } from './utils';
import { auth } from '../middleware/auth';
import {
  createItem,
  createItemSchema,
  getAllItems,
  getItem,
  getItemSchema,
} from '../controllers/item/item-controller';

const r = express.Router();

const itemsMnt = '/items';
r.post(itemsMnt, [auth, validate(createItemSchema)], use(createItem));
r.get(itemsMnt, [auth], use(getAllItems));

const itemMnt = '/item/:itemId';
r.get(itemMnt, [auth, validate(getItemSchema)], use(getItem));

export default r;
