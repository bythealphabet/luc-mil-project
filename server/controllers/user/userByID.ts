import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model';
import { IUserProfile } from '../../../types/user-profile';
import { ObjectId } from 'mongoose';

export const userByID = async (
  req: Request & { profile: IUserProfile },
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: 'User not found',
      });
    req.profile = {
      _id: user._id as unknown as ObjectId,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};
