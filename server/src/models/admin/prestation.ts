import { EPrestationType } from 'enums/common';
import mongoose from "mongoose";
import Joi from "joi";


export default mongoose.model(
  "Prestation",
  new mongoose.Schema(
    {
      name: String,
      cout: Number,
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
      type: {
        type: String,
        enum: [EPrestationType.EXTERNE, EPrestationType.INTERNE],
        default: EPrestationType.INTERNE,
      },
    },
    { timestamps: true }
  )
);

export const validatePrestation = (prestation) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    cout: Joi.number().required(),
    service: Joi.string().required(),
    type: Joi.string(),
  });

  return schema.validate(prestation);
};
