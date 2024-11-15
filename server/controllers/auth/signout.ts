import { Request, Response } from 'express';

export const signout = (_: Request, res: Response) => {
  res.clearCookie('t');
  return res.status(200).json({
    message: 'signed out',
  });
};
