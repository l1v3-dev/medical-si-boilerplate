import Prestation, { validatePrestation } from "../../models/admin/prestation";
import { pick } from "lodash";
import { checkValidID } from "../../utils/objectID";
import { MyError } from "../../utils/errors";
import { EServerErrors } from "../../enums/errors";

const PrestationQueries = {
  prestations: async (p, { pageSize = 10, after }) => {
    const prestation = await Prestation.find({ deleted: false })
      .skip(after)
      .limit(pageSize)
      .lean();
    if (!prestation) throw new MyError(`Prestation ${EServerErrors.NOT_FOUND}`);
    return prestation;
  },
  prestation: async (parent, { prestationID }) => {
    // prestationID checking
    if (!checkValidID(prestationID)) throw new Error(EServerErrors.INVALID_ID);

    const prestation = await Prestation.findOne({ _id: prestationID, deleted: false }).lean();
    if (!prestation) throw new MyError(`Prestation ${EServerErrors.NOT_FOUND}`);
    return prestation;
  },
};

const PrestationMutations = {
  createPrestation: async (parent, { newPrestation }: any) => {
    const { error } = validatePrestation(newPrestation);
    if (error) throw new MyError(error.details[0].message);

    const prestation = new Prestation(
      pick(newPrestation, [
        "name",
        "centre",
        "porte",
        "type",
        "prestations",
      ])
    );
    return await Prestation.create(prestation);
  },
  updatePrestation: async (parent, { prestationID, updatedPrestation }: any) => {
    if (!checkValidID(prestationID)) throw new MyError(EServerErrors.INVALID_ID);

    const { error } = validatePrestation(updatedPrestation);
    if (error) throw new MyError(error.details[0].message);

    const prestation = await Prestation.findByIdAndUpdate(
      prestationID,
      pick(updatedPrestation, [
        "name",
        "centre",
        "porte",
        "type",
        "prestations",
        "deleted",
      ]),
      { new: true }
    );

    if (!prestation) throw new MyError(`Prestation ${EServerErrors.UPDATE_FAILED}`);
    return prestation;
  },
};

export { PrestationQueries, PrestationMutations };
