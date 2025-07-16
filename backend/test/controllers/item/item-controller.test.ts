import { use } from 'chai';
import chaiHttp from 'chai-http';
import { connectToTestDb, closeTestDb } from '../../dbForTesting';

use(chaiHttp);

describe('Item Controller', () => {
  before(async () => {
    await connectToTestDb();
  });

  after(async () => {
    await closeTestDb();
  });

  describe('POST /items', () => {
    it('should create a new item', async () => {
      // Implementation will depend on your test setup
      // This is a basic structure for now
    });
  });

  describe('GET /items', () => {
    it('should get all items', async () => {
      // Implementation will depend on your test setup
    });
  });

  describe('GET /item/:itemId', () => {
    it('should get item by id', async () => {
      // Implementation will depend on your test setup
    });
  });
});
