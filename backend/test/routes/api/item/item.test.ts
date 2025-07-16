import * as chai from 'chai';
import chaiHttp, { request } from 'chai-http';
import { givenUserInDb } from '../../../utils/user-utils';
import { connectToTestDb, closeTestDb } from '../../../dbForTesting';
import app from '../../../../src/server';
import { FirebaseMock } from '../../../utils/firebase-mock';
import { Item } from '../../../../src/models/item/ItemSchema';

const { expect } = chai;
chai.use(chaiHttp);

describe('Items API', () => {
  const firebaseMock: FirebaseMock = new FirebaseMock();

  beforeEach(async () => {
    firebaseMock.before();
    await connectToTestDb();
    await Item.deleteMany({});
  });

  afterEach(async () => {
    await closeTestDb();
    firebaseMock.after();
  });

  describe('POST /api/items', () => {
    it('should require authentication', async () => {
      const res = await request.execute(app).post('/api/items').send({
        name: 'Test Item',
      });
      expect(res).to.have.status(401);
    });

    it('should create item when authenticated', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .post('/api/items')
        .send({
          name: 'Test Item',
        })
        .set('x-auth-token', testToken);

      expect(res).to.have.status(201);
      expect(res.body.name).to.equal('Test Item');
      expect(res.body).to.have.property('id');
    });

    it('should validate required fields', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .post('/api/items')
        .send({})
        .set('x-auth-token', testToken);

      expect(res).to.have.status(400);
    });
  });

  describe('GET /api/items', () => {
    it('should require authentication', async () => {
      const res = await request.execute(app).get('/api/items');
      expect(res).to.have.status(401);
    });

    it('should return empty array when no items exist', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .get('/api/items')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.empty;
    });

    it('should return all items when authenticated', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      // Create a test item first
      await request
        .execute(app)
        .post('/api/items')
        .send({ name: 'Test Item' })
        .set('x-auth-token', testToken);

      const res = await request
        .execute(app)
        .get('/api/items')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').with.lengthOf(1);
      expect(res.body[0].name).to.equal('Test Item');
    });
  });

  describe('GET /api/item/:itemId', () => {
    it('should require authentication', async () => {
      const res = await request
        .execute(app)
        .get('/api/item/123456789012345678901234');
      expect(res).to.have.status(401);
    });

    it('should return 404 for non-existent item', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .get('/api/item/123456789012345678901234')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(404);
    });

    it('should return item when authenticated and item exists', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      // Create an item first
      const createRes = await request
        .execute(app)
        .post('/api/items')
        .send({ name: 'Test Item' })
        .set('x-auth-token', testToken);

      const itemId = createRes.body.id;

      const res = await request
        .execute(app)
        .get(`/api/item/${itemId}`)
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body.name).to.equal('Test Item');
      expect(res.body.id).to.equal(itemId);
    });

    it('should validate item ID format', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .get('/api/item/invalid-id')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(400);
    });
  });
});
