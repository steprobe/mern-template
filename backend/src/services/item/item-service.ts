import { ItemRepository } from '../../repositories/item/item-repository';
import ItemDTO from '../../models/item/ItemDTO';

export class ItemService {
  static async findById(itemId: string): Promise<ItemDTO> {
    return ItemRepository.findById(itemId);
  }

  static async findAll(): Promise<ItemDTO[]> {
    return ItemRepository.findAll();
  }

  static async create(name: string): Promise<ItemDTO> {
    return ItemRepository.create({ name });
  }
}
