import { User } from '../../src/models/user/UserSchema';
import UserDTO from '../../src/models/user/UserDTO';

async function givenUserInDb(
  isSuperUser: boolean,
  seed?: string
): Promise<UserDTO> {
  const ts = seed || Date.now().toString();
  const email = `user-${ts}@castallapp.com`;
  const user = await User.create({
    firebaseUserId: `firebase-uid-${ts}`,
    email,
    firstName: `First-${ts}`,
    lastName: `Last-${ts}`,
    avatar: `https://example.com/avatar-${ts}.jpg`,
    isSuperUser,
    hasDevToolsAccess: false,
  });

  return User.expose(user);
}

export { givenUserInDb };
