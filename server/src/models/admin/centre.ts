import mongoose from "mongoose";
import Joi from "joi";

export default mongoose.model(
  "Centre",
  new mongoose.Schema(
    {
      name: String,
      location: String,
    },
    { timestamps: true }
  )
);

export const validateCentre = (centre) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
  });

  return schema.validate(centre);
};
