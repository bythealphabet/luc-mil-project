import { ObjectId } from 'mongoose';

export interface IUserProfile {
  _id: ObjectId;
  name: string;
  email: string;
}
