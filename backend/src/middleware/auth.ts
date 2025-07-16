import { Request, Response, NextFunction } from 'express';
import { firebaseAuth } from '../firebase';
import { UserService } from '../services/user/user-service';

interface RequestUser extends Request {
  user?: {
    id: string;
    firebaseId: string;
    isSuperUser: boolean;
  };
}

const basicAuth = async (req: RequestUser, res: Response): Promise<boolean> => {
  const token = req.header('x-auth-token');
  if (token) {
    try {
      const decoded = await firebaseAuth.verifyIdToken(token ?? '');
      if (!decoded) {
        res.status(401).json({ message: 'invalid token' });
        return false;
      }

      const fbUser = await firebaseAuth.getUserByEmail(decoded.email ?? '');

      // User creation is done directly with firebase, so this might be the
      // first time we hear about this user on the server
      const user = await UserService.createIfRequired(fbUser);

      req.user = {
        firebaseId: user.firebaseId,
        isSuperUser: user.isSuperUser,
        id: user.id,
      };

      return true;
    } catch (err: any) {
      console.log(err);
      res.status(401).json({ message: 'invalid token' });
      return false;
    }
  } else {
    res
      .status(401)
      .json({ message: 'Please provide a token on header x-auth-token' });
    return false;
  }
};

const auth = async (req: RequestUser, res: Response, next: NextFunction) => {
  if (await basicAuth(req, res)) {
    next();
  }
};

const superUserAuth = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  if (await basicAuth(req, res)) {
    if (req.user?.isSuperUser) {
      next();
    } else {
      res
        .status(403)
        .json({ message: 'This resource requires super user privileges' });
    }
  }
};

export { RequestUser, auth, superUserAuth };
