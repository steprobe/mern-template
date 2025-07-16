// import { expect } from 'chai';
// import { ItemService } from '../../../src/services/item/item-service';
import { connectToTestDb, closeTestDb } from '../../dbForTesting';

describe('Item Service', () => {
  before(async () => {
    await connectToTestDb();
  });

  after(async () => {
    await closeTestDb();
  });

  describe('create', () => {
    it('should create a new item', async () => {
      // Implementation will depend on your test setup
    });
  });

  describe('findAll', () => {
    it('should find all items', async () => {
      // Implementation will depend on your test setup
    });
  });

  describe('findById', () => {
    it('should find item by id', async () => {
      // Implementation will depend on your test setup
    });
  });
});
