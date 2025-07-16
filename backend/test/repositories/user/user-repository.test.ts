import * as chai from 'chai';
import { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mongoose from 'mongoose';
import { connectToTestDb, closeTestDb } from '../../dbForTesting';
import { UserRepository } from '../../../src/repositories/user/user-repository';
import { User } from '../../../src/models/user/UserSchema';
import { UserNotFoundError } from '../../../src/errors/user-errors';

chai.use(chaiAsPromised);

describe('UserRepository', () => {
  before(async () => {
    await connectToTestDb();
  });

  after(async () => {
    await closeTestDb();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const user = await UserRepository.create({
      firebaseUserId: 'firebase123',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      hasDevToolsAccess: false,
    });
    expect(user).to.have.property('id');
    expect(user.email).to.equal('test@example.com');
    expect(user.hasDevToolsAccess).to.equal(false);
  });

  it('should find a user by ID', async () => {
    const created = await UserRepository.create({
      firebaseUserId: 'firebase456',
      email: 'test2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      hasDevToolsAccess: true,
    });
    const found = await UserRepository.findById(created.id);
    expect(found.email).to.equal('test2@example.com');
    expect(found.hasDevToolsAccess).to.equal(true);
  });

  it('should throw UserNotFoundError for invalid ID', async () => {
    await expect(UserRepository.findById('invalid')).to.be.rejectedWith(
      UserNotFoundError
    );
  });

  it('should throw UserNotFoundError if not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await expect(UserRepository.findById(fakeId)).to.be.rejectedWith(
      UserNotFoundError
    );
  });

  it('should find a user by firebaseId', async () => {
    const firebaseId = 'firebase789';
    await UserRepository.create({
      firebaseUserId: firebaseId,
      email: 'test3@example.com',
      firstName: 'Bob',
      lastName: 'Jones',
      hasDevToolsAccess: false,
    });
    const found = await UserRepository.findByFirebaseId(firebaseId);
    expect(found.firstName).to.equal('Bob');
    expect(found.hasDevToolsAccess).to.equal(false);
  });

  it('should throw UserNotFoundError if firebaseId not found', async () => {
    await expect(
      UserRepository.findByFirebaseId('nonexistent')
    ).to.be.rejectedWith(UserNotFoundError);
  });

  it('should update a user', async () => {
    const created = await UserRepository.create({
      firebaseUserId: 'firebase101',
      email: 'test4@example.com',
      firstName: 'Alice',
      lastName: 'Brown',
      hasDevToolsAccess: false,
    });
    const updated = await UserRepository.update(created.id, {
      firstName: 'Updated Name',
      hasDevToolsAccess: true,
    });
    expect(updated.firstName).to.equal('Updated Name');
    expect(updated.hasDevToolsAccess).to.equal(true);
  });

  it('should throw UserNotFoundError if update not found', async () => {
    const fakeId = new mongoose.Types.ObjectId().toString();
    await expect(
      UserRepository.update(fakeId, { firstName: 'New Name' })
    ).to.be.rejectedWith(UserNotFoundError);
  });

  it('should find a user by firebaseId safely', async () => {
    const firebaseId = 'firebase202';
    await UserRepository.create({
      firebaseUserId: firebaseId,
      email: 'test5@example.com',
      firstName: 'Charlie',
      lastName: 'Wilson',
      hasDevToolsAccess: true,
    });
    const found = await UserRepository.findByFirebaseIdSafe(firebaseId);
    expect(found?.firstName).to.equal('Charlie');
    expect(found?.hasDevToolsAccess).to.equal(true);
  });

  it('should return null for safe find if firebaseId not found', async () => {
    const found = await UserRepository.findByFirebaseIdSafe('nonexistent');
    expect(found).to.be.equal(null);
  });
});
