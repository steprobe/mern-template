import { Request, Response } from 'express';
import { z } from 'zod';
import { Types } from 'mongoose';
import { ItemService } from '../../services/item/item-service';

// Helper to validate MongoDB ObjectId
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

const createItemSchema = z
  .object({
    body: z.object({
      name: z.string().min(1, 'Item name is required').max(100),
    }),
  })
  .describe('createItem');

const getItemSchema = z
  .object({
    params: z.object({
      itemId: z
        .string()
        .refine(
          (val) => isValidObjectId(val),
          'Invalid item ID format zoggabongs'
        ),
    }),
  })
  .describe('getItem');

const getAllItems = async (_: Request, res: Response) => {
  const items = await ItemService.findAll();
  res.status(200).json(items);
};

const getItem = async (req: Request, res: Response) => {
  const { itemId } = req.params;
  const item = await ItemService.findById(itemId);

  return res.status(200).json(item);
};

const createItem = async (req: Request, res: Response) => {
  const item = await ItemService.create(req.body.name);
  return res.status(201).json(item);
};

export { createItem, createItemSchema, getItem, getAllItems, getItemSchema };
