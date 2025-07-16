import mongoose, { Model, model, Schema, Types } from 'mongoose';
import ItemDTO from './ItemDTO';
import { ITEM_MODEL_NAME } from '../model-names';

interface IItem {
  _id: Types.ObjectId;
  name: string;
}

interface ItemModel extends Model<IItem> {
  exposeById(id: mongoose.Types.ObjectId): Promise<ItemDTO>;

  expose(category: IItem): Promise<ItemDTO>;
}

const itemSchema = new Schema<IItem, ItemModel>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const itemToDTO = (item: IItem): ItemDTO | null => {
  if (item) {
    return {
      id: item._id.toString(),
      name: item.name,
    };
  }
  return null;
};

itemSchema.static('expose', async (item: IItem) =>
  item !== null ? itemToDTO(item) : null
);

itemSchema.static('exposeById', async (id: mongoose.Types.ObjectId) => {
  const schema = mongoose.model(ITEM_MODEL_NAME);
  const item = await schema.findById(id);
  return item !== null ? itemToDTO(item) : null;
});

const Item = model<IItem, ItemModel>(ITEM_MODEL_NAME, itemSchema);

export { Item, IItem };
