import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  hashed_password: string;
  profile: string;
  salt?: string;
  resetCode?: string;
  role: number;
  resetPasswordLink: {
    data: string;
    default: string;
  };
  authenticate: (plainText: string) => boolean;
  hashPassword: (password: string) => string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    first_name: String,
    last_name: String,
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
      max: 32,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
      lowercase: true,
      max: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    salt: String,
    resetCode: "",
    role: {
      type: Number,
      default: 0,
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

UserSchema.methods = {
  authenticate: function (plainText: string) {
    return this.hashPassword(plainText) === this.hashed_password;
  },

  hashPassword: function (password: string) {
    if (!password) return "";
    try {
      const salt = bcrypt.genSaltSync(10); // Generate a salt
      return bcrypt.hashSync(password, salt); // Generate a hashed password
    } catch (error) {
      console.error(error);
      return "";
    }
  },
};

UserSchema.virtual("password")
  .set(function (password: string) {
    this.hashed_password = password;
    this.hashed_password = this.hashPassword(password);
  })
  .get(function () {
    return this.hashed_password;
  });

export default mongoose.model<IUser>("User", UserSchema);
