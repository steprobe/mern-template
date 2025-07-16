import { expect } from 'chai';
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { UserRecord } from 'firebase-admin/lib/auth';
import { UserService } from '../../../src/services/user/user-service';
import { givenUserInDb } from '../../utils/user-utils';
import { closeTestDb, connectToTestDb } from '../../dbForTesting';
import { UserNotFoundError } from '../../../src/errors/user-errors';

chai.use(chaiAsPromised);

describe('UserService', () => {
  beforeEach(async () => {
    await connectToTestDb();
  });

  afterEach(async () => {
    await closeTestDb();
  });

  describe('findByFirebaseId', () => {
    it('should throw UserNotFoundError for non-existent user', async () => {
      await expect(
        UserService.findByFirebaseId('non-existent-id')
      ).to.be.rejectedWith(UserNotFoundError);
    });

    it('should return user for existing firebaseId', async () => {
      const testUser = await givenUserInDb(false);
      const result = await UserService.findByFirebaseId(testUser.firebaseId);

      expect(result).to.not.equal(null);
      expect(result?.id).to.equal(testUser.id);
      expect(result?.email).to.equal(testUser.email);
      expect(result?.firebaseId).to.equal(testUser.firebaseId);
    });
  });

  describe('update', () => {
    it('should throw UserNotFoundError for non-existent user', async () => {
      await expect(
        UserService.update('non-existent-id', {
          firstName: 'New Name',
        })
      ).to.be.rejectedWith(UserNotFoundError);
    });

    it('should update user fields correctly', async () => {
      const user = await givenUserInDb(false);
      const updates = {
        firstName: 'New First Name',
        lastName: 'New Last Name',
        avatar: 'https://example.com/avatar.jpg',
      };

      const result = await UserService.update(user.firebaseId, updates);
      expect(result.firstName).to.equal(updates.firstName);
      expect(result.lastName).to.equal(updates.lastName);
      expect(result.avatar).to.equal(updates.avatar);
    });

    it('should not update protected fields', async () => {
      const testUser = await givenUserInDb(false);
      const originalEmail = testUser.email;
      const originalIsSuperUser = testUser.isSuperUser;

      const updates = {
        email: 'new@email.com',
        isSuperUser: true,
      } as any;

      const result = await UserService.update(testUser.firebaseId, updates);
      expect(result.email).to.equal(originalEmail);
      expect(result.isSuperUser).to.equal(originalIsSuperUser);
    });
  });

  describe('createIfRequired', () => {
    it('should create new user when user does not exist', async () => {
      const mockFirebaseUser = {
        uid: 'new-firebase-uid',
        email: 'new@example.com',
        displayName: 'New User',
      } as UserRecord;

      const result = await UserService.createIfRequired(mockFirebaseUser);
      expect(result).to.not.equal(null);
      expect(result?.firebaseId).to.equal(mockFirebaseUser.uid);
      expect(result?.email).to.equal(mockFirebaseUser.email);
    });

    it('should return existing user when user already exists', async () => {
      const testUser = await givenUserInDb(false);
      const mockFirebaseUser = {
        uid: testUser.firebaseId,
        email: testUser.email,
        displayName: 'Existing User',
      } as UserRecord;

      const result = await UserService.createIfRequired(mockFirebaseUser);
      expect(result).to.not.equal(null);
      expect(result?.id).to.equal(testUser.id);
      expect(result?.email).to.equal(testUser.email);
    });
  });

  describe('findById', () => {
    it('should throw UserNotFoundError for non-existent user', async () => {
      await expect(UserService.findById('non-existent-id')).to.be.rejectedWith(
        UserNotFoundError
      );
    });

    it('should return user for existing id', async () => {
      const testUser = await givenUserInDb(false);
      const result = await UserService.findById(testUser.id);
      expect(result).to.not.equal(null);
      expect(result.id).to.equal(testUser.id);
      expect(result.email).to.equal(testUser.email);
      expect(result.firebaseId).to.equal(testUser.firebaseId);
    });
  });
});
