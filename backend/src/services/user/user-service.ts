import { UserRecord } from 'firebase-admin/lib/auth';
import UserDTO from '../../models/user/UserDTO';
import { UserRepository } from '../../repositories/user/user-repository';

export class UserService {
  static async findByFirebaseId(firebaseId: string): Promise<UserDTO> {
    return UserRepository.findByFirebaseId(firebaseId);
  }

  static async update(
    firebaseId: string,
    updates: Partial<
      Omit<UserDTO, 'id' | 'firebaseId' | 'email' | 'isSuperUser'>
    >
  ): Promise<UserDTO> {
    const user = await UserRepository.findByFirebaseId(firebaseId);

    // Filter out any protected fields that might have been passed in
    const safeUpdates = {
      firstName: updates.firstName,
      lastName: updates.lastName,
      avatar: updates.avatar,
    };

    return UserRepository.update(user.id, safeUpdates);
  }

  static async createIfRequired(firebaseUser: UserRecord): Promise<UserDTO> {
    const existingUser = await UserRepository.findByFirebaseIdSafe(
      firebaseUser.uid
    );
    if (existingUser) {
      return existingUser;
    }

    // User doesn't exist, create new one
    const user = await UserRepository.create({
      firebaseUserId: firebaseUser.uid,
      email: firebaseUser.email || '',
    });

    return user;
  }

  static async findById(id: string): Promise<UserDTO> {
    return UserRepository.findById(id);
  }
}
