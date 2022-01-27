import Centre, { validateCentre } from "../../models/admin/centre";
import { pick } from "lodash";
import { checkValidID } from "../../utils/objectID";
import { MyError } from "../../utils/errors";
import { EServerErrors } from "../../enums/errors";

const CentreQueries = {
  centres: async (p, { pageSize = 10, after }) => {
    const centres = await Centre.find()
      .skip(after)
      .limit(pageSize)
      .lean();
    if (!centres) throw new MyError(`Centre ${EServerErrors.NOT_FOUND}`);
    return centres;
  },
  centre: async (parent, { centreID }) => {
    // centreID checking
    if (!checkValidID(centreID)) throw new Error(EServerErrors.INVALID_ID);

    const centre = await Centre.findOne({ _id: centreID }).lean();
    if (!centre) throw new MyError(`Centre ${EServerErrors.NOT_FOUND}`);
    return centre;
  },
};

const CentreMutations = {
  createCentre: async (parent, { newCentre }: any) => {
    const { error } = validateCentre(newCentre);
    if (error) throw new MyError(error.details[0].message);

    const centre = new Centre(
      pick(newCentre, [
        "name",
        "location"
      ])
    );
    return await Centre.create(centre);
  },
  updateCentre: async (parent, { centreID, updatedCentre }: any) => {
    if (!checkValidID(centreID)) throw new MyError(EServerErrors.INVALID_ID);

    const { error } = validateCentre(updatedCentre);
    if (error) throw new MyError(error.details[0].message);

    const centre = await Centre.findByIdAndUpdate(
      centreID,
      pick(updatedCentre, [
        "name",
        "location"
      ]),
      { new: true }
    );

    if (!centre) throw new MyError(`Centre ${EServerErrors.UPDATE_FAILED}`);
    return centre;
  },
};

export { CentreQueries, CentreMutations };
