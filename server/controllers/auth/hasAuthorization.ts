import { Request, Response, NextFunction } from 'express';
import { Request as JWTRequest } from 'express-jwt';
import { IUserProfile } from '../../../types/user-profile';

export const hasAuthorization = (
  req: Request & { profile: IUserProfile } & JWTRequest,
  res: Response,
  next: NextFunction
) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }
  next();
};
