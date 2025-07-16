import { Types } from 'mongoose';
import { User } from '../../models/user/UserSchema';
import UserDTO from '../../models/user/UserDTO';
import { UserNotFoundError } from '../../errors/user-errors';

export class UserRepository {
  static async findById(id: string): Promise<UserDTO> {
    if (!Types.ObjectId.isValid(id)) {
      throw new UserNotFoundError(id);
    }

    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    return User.expose(user);
  }

  static async findByFirebaseId(firebaseId: string): Promise<UserDTO> {
    const user = await this.findByFirebaseIdInternal(firebaseId);
    if (!user) {
      throw new UserNotFoundError(firebaseId);
    }
    return user;
  }

  static async findByFirebaseIdSafe(
    firebaseId: string
  ): Promise<UserDTO | null> {
    return this.findByFirebaseIdInternal(firebaseId);
  }

  static async create(data: {
    firebaseUserId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    isSuperUser?: boolean;
    hasDevToolsAccess?: boolean;
  }): Promise<UserDTO> {
    const user = new User(data);
    const savedUser = await user.save();
    return User.expose(savedUser);
  }

  static async update(id: string, updates: Partial<UserDTO>): Promise<UserDTO> {
    if (!Types.ObjectId.isValid(id)) {
      throw new UserNotFoundError(id);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      throw new UserNotFoundError(id);
    }

    return User.expose(user);
  }

  private static async findByFirebaseIdInternal(
    firebaseId: string
  ): Promise<UserDTO | null> {
    const user = await User.findOne({ firebaseUserId: firebaseId });
    if (!user) {
      return null;
    }
    return User.expose(user);
  }
}
