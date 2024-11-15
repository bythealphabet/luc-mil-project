import { expressjwt, Request as JWTRequest } from 'express-jwt';
import { config } from '../../../config/config';

export const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'auth',
});
