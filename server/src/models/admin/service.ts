import mongoose from "mongoose";
import Joi from "joi";

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Centre",
    },
    porte: Number,
    type: String,
    prestations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prestation",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);

export const validateService = (service) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    centre: Joi.string().required(),
    porte: Joi.number().required(),
    type: Joi.string(),
    prestations: Joi.array().items(Joi.string()),
  });

  return schema.validate(service);
};
