import mongoose from "mongoose";

export const checkValidID = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
