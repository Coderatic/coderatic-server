import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { MongoCursorInUseError } from "mongodb";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  hashed_password: string;
  first_name?: string;
  last_name?: string;
  password: string;
  hashPassword: (plainText: string) => string;
  authenticate: (plainText: string) => Promise<boolean>;
  virtual();
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
      max: 32,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      max: 32,
    },
    hashed_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(async function (this: IUser, plainText: string) {
    this.hashed_password = await this.hashPassword(plainText);
  })
  .get(function () {
    return this.hashed_password;
  });

UserSchema.pre("save", function (this: IUser, next) {
  if (this.isModified("hashed_password"))
    this.hashed_password = bcrypt.hashSync(this.hashed_password, 10);
  next();
});

UserSchema.methods = {
  hashPassword: async function (plainText: string) {
    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    return await bcrypt.hash(plainText, salt);
  },
  authenticate: async function (plainText: string) {
    return bcrypt.compare(plainText, this.hashed_password);
  },
};

export default mongoose.model<IUser>("User", UserSchema);
