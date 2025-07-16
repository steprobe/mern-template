import mongoose, { Model, model, Schema, Types } from 'mongoose';
import UserDTO from './UserDTO';
import { USER_MODEL_NAME } from '../model-names';

interface IUser {
  _id: Types.ObjectId;
  firebaseUserId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatar?: string;
  isSuperUser: boolean;
  hasDevToolsAccess: boolean;
}

interface UserModel extends Model<IUser> {
  exposeById(id: mongoose.Types.ObjectId): Promise<UserDTO | null>;
  expose(user: IUser): Promise<UserDTO>;
}

const userSchema = new Schema<IUser, UserModel>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    firebaseUserId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    isSuperUser: { type: Boolean, default: false, required: true },
    hasDevToolsAccess: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const userDocumentToDTO = (user: IUser): UserDTO | null => {
  if (user) {
    return {
      id: user._id.toString(),
      firebaseId: user.firebaseUserId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      isSuperUser: user.isSuperUser,
      hasDevToolsAccess: user.hasDevToolsAccess,
    };
  }

  return null;
};

userSchema.static('expose', (user: IUser) =>
  user !== null ? userDocumentToDTO(user) : null
);

userSchema.static('exposeById', async (id: mongoose.Types.ObjectId) => {
  const schema = mongoose.model('user');
  const user = await schema.findById(id);
  return user !== null ? userDocumentToDTO(user) : null;
});

const User = model<IUser, UserModel>(USER_MODEL_NAME, userSchema);

export { User };
