import * as chai from 'chai';
import chaiHttp, { request } from 'chai-http';
import { givenUserInDb } from '../../../utils/user-utils';
import { closeTestDb, connectToTestDb } from '../../../dbForTesting';
import app from '../../../../src/server';
import { FirebaseMock } from '../../../utils/firebase-mock';

const { expect } = chai;
chai.use(chaiHttp);

describe('User management', () => {
  const firebaseMock: FirebaseMock = new FirebaseMock();

  beforeEach(async () => {
    firebaseMock.before();
    await connectToTestDb();
  });

  afterEach(async () => {
    await closeTestDb();
    firebaseMock.after();
  });

  describe('Get a user', () => {
    it('Get a user without token should be denied', async () => {
      const res = await request.execute(app).get('/api/user');
      expect(res).to.have.status(401);
    });

    it('Get a user as a regular user should be correct', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .get('/api/user')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(testUser.id);
      expect(res.body.email).to.equal(testUser.email);
      expect(res.body.firebaseId).to.equal(testUser.firebaseId);
      expect(res.body.isSuperUser).to.equal(testUser.isSuperUser);
    });

    it('Get a user as a super user should be correct', async () => {
      const testUser = await givenUserInDb(true);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .get('/api/user')
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body.id).to.equal(testUser.id);
      expect(res.body.email).to.equal(testUser.email);
      expect(res.body.firebaseId).to.equal(testUser.firebaseId);
      expect(res.body.isSuperUser).to.equal(testUser.isSuperUser);
    });
  });

  describe('Update a user', () => {
    it('Updating a user without token should be denied', async () => {
      const res = await request.execute(app).put('/api/user');
      expect(res).to.have.status(401);
    });

    it('Updating a user as a regular user should be correct', async () => {
      const testUser = await givenUserInDb(false);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .put('/api/user')
        .send({ firstName: 'updated' })
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body.firstName).to.equal('updated');
    });

    it('Updating a user as a super user should be correct', async () => {
      const testUser = await givenUserInDb(true);
      const testToken = 'mock-token';
      firebaseMock.mock(testToken, testUser.email, testUser.firebaseId);

      const res = await request
        .execute(app)
        .put('/api/user')
        .send({ firstName: 'updated' })
        .set('x-auth-token', testToken);

      expect(res).to.have.status(200);
      expect(res.body.firstName).to.equal('updated');
    });
  });
});
