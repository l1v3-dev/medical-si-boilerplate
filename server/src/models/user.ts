import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "../config";
import { EUserGenre, EUserRole } from "../enums/common";

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    sexe: { type: String, enum: [EUserGenre.FEMALE, EUserGenre.MALE] },
    image: [String],
    role: {
      type: String,
      enum: [EUserRole.ADMIN, EUserRole.CUSTOMER, EUserRole.SELLER],
      default: EUserRole.CUSTOMER,
    },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const user: any = this;
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      sexe: user.sexe,
    },
    config.jwtSecret
  );
  return token;
};

userSchema.pre("save", function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user: any = this;

  if (!user.password) {
    next();
  }

  bcrypt.genSalt(10, (error: any, salt: string): void => {
    if (error) {
      throw new Error(error);
    } else {
      bcrypt.hash(user.password, salt, (err: any, hashed: string) => {
        if (err) {
          return next(err);
        }
        user.password = hashed;
        next();
      });
    }
  });
});

export const validateUser = (user) => {
  const schema = Joi.object({
    firstname: Joi.string().min(3).max(25),
    lastname: Joi.string().min(3).max(25),
    username: Joi.string().min(5).max(15),
    password: Joi.string().alphanum().min(8).max(50),
    // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    image: Joi.array().items(Joi.string()),
    role: Joi.string(),
    deleted: Joi.boolean(),
  });

  return schema.validate(user);
};

export default mongoose.model("User", userSchema);
