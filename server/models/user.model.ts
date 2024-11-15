import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  resetPasswordLink: string;
  isVerified: boolean;
  hashed_password: string | undefined;
  salt: string | undefined;
  _password: string;
  authenticate: (plainText: string) => boolean;
  encryptPassword: (password: string) => string;
  makeSalt: () => string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, '* please fill a valid email address'],
      required: true,
    },
    resetPasswordLink: {
      data: String,
    },
    isVerified: { type: Boolean, default: false },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
  },
  { timestamps: true }
);

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path('hashed_password').validate(function () {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, '');

UserSchema.methods = {
  authenticate: function (plainText: string) {
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
  encryptPassword: function (password: string) {
    if (!password) return '';

    return bcrypt.hashSync(password, this.salt);
  },
  makeSalt: function () {
    return bcrypt.genSaltSync(10);
  },
};

export default model<IUser>('User', UserSchema);
