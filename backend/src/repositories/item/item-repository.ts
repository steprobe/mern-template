import { Types } from 'mongoose';
import { ItemNotFoundError } from '../../errors/errors';
import ItemDTO from '../../models/item/ItemDTO';
import { Item } from '../../models/item/ItemSchema';

export class ItemRepository {
  static async findById(id: string): Promise<ItemDTO> {
    if (!Types.ObjectId.isValid(id)) {
      throw new ItemNotFoundError(`Invalid item ID: ${id}`);
    }

    const item = await Item.findById(id);
    if (!item) {
      throw new ItemNotFoundError(`Item not found with ID: ${id}`);
    }

    return Item.expose(item);
  }

  static async create(data: { name: string }): Promise<ItemDTO> {
    const item = await Item.create(data);
    return Item.expose(item);
  }

  static async findAll(): Promise<ItemDTO[]> {
    const items = await Item.find();
    return Promise.all(items.map((item) => Item.expose(item)));
  }
}
