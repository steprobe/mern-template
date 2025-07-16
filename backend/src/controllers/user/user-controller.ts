import { Response } from 'express';
import { z } from 'zod';
import { RequestUser } from '../../middleware/auth';
import { UserService } from '../../services/user/user-service';

const updateUserSchema = z
  .object({
    body: z.object({
      firstName: z.string().min(1).max(100).optional(),
      lastName: z.string().min(1).max(100).optional(),
      avatar: z.string().url().optional(),
      preferences: z
        .object({
          notifications: z.boolean().optional(),
          theme: z.enum(['light', 'dark']).optional(),
        })
        .optional(),
    }),
  })
  .describe('updateUser');

const updateUser = async (req: RequestUser, res: Response) => {
  const userFirebaseId = req.user?.firebaseId;

  const { firstName, lastName, avatar } = req.body;
  const updates = {
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(avatar !== undefined && { avatar }),
  };

  const updatedUser = await UserService.update(userFirebaseId!!, updates);
  return res.status(200).json(updatedUser);
};

const getUser = async (req: RequestUser, res: Response) => {
  const userFirebaseId = req.user?.firebaseId;

  const user = await UserService.findByFirebaseId(userFirebaseId!!);
  return res.status(200).json(user);
};

export { getUser, updateUser, updateUserSchema };
