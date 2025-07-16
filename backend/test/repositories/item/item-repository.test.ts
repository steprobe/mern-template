import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import { ItemRepository } from '../../../src/repositories/item/item-repository';
import { Item } from '../../../src/models/item/ItemSchema';
import { ItemNotFoundError } from '../../../src/errors/errors';
import { closeTestDb, connectToTestDb } from '../../dbForTesting';

use(chaiAsPromised);

describe('ItemRepository', () => {
  before(async () => {
    await connectToTestDb();
  });

  after(async () => {
    await closeTestDb();
  });

  beforeEach(async () => {
    await Item.deleteMany({});
  });

  it('should create an item', async () => {
    const item = await ItemRepository.create({ name: 'Test Item' });
    expect(item).to.have.property('id');
    expect(item.name).to.equal('Test Item');
  });

  it('should find an item by ID', async () => {
    const created = await ItemRepository.create({ name: 'Test Item' });
    const found = await ItemRepository.findById(created.id);
    expect(found.name).to.equal('Test Item');
  });

  it('should throw ItemNotFoundError for invalid ID', async () => {
    await expect(ItemRepository.findById('invalid')).to.be.rejectedWith(
      ItemNotFoundError
    );
  });

  it('should throw ItemNotFoundError if not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await expect(ItemRepository.findById(fakeId)).to.be.rejectedWith(
      ItemNotFoundError
    );
  });

  it('should find all items', async () => {
    await ItemRepository.create({ name: 'Item 1' });
    await ItemRepository.create({ name: 'Item 2' });
    const result = await ItemRepository.findAll();
    expect(result).to.have.length(2);
    expect(result.map((i) => i.name))
      .to.include('Item 1')
      .and.include('Item 2');
  });
});
