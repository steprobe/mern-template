import express from 'express';
import { validate } from '../validation/validate';
import { use } from './utils';
import {
  createItem,
  createItemSchema,
  getAllItems,
  getItem,
  getItemSchema,
} from '../controllers/item/item-controller';

const r = express.Router();

const itemsMnt = '/items';
r.post(itemsMnt, [validate(createItemSchema)], use(createItem));
r.get(itemsMnt, use(getAllItems));

const itemMnt = '/item/:itemId';
r.get(itemMnt, [validate(getItemSchema)], use(getItem));

export default r;
