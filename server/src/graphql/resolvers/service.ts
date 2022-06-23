import Service, { validateService } from "models/admin/service";
import { pick } from "lodash";
import { checkValidID } from "utils/objectID";
import { MyError } from "utils/errors";
import { EServerErrors } from "enums/errors";

const ServiceQueries = {
  services: async (p, { pageSize = 10, after }) => {
    const services = await Service.find({ deleted: false })
      .skip(after)
      .limit(pageSize)
      .lean();
    if (!services) throw new MyError(`Service ${EServerErrors.NOT_FOUND}`);
    return services;
  },
  service: async (parent, { serviceID }) => {
    // serviceID checking
    if (!checkValidID(serviceID)) throw new Error(EServerErrors.INVALID_ID);

    const service = await Service.findOne({ _id: serviceID, deleted: false }).lean();
    if (!service) throw new MyError(`Service ${EServerErrors.NOT_FOUND}`);
    return service;
  },
};

const ServiceMutations = {
  createService: async (parent, { newService }: any) => {
    const { error } = validateService(newService);
    if (error) throw new MyError(error.details[0].message);

    const service = new Service(
      pick(newService, [
        "name",
        "centre",
        "porte",
        "type",
        "prestations",
      ])
    );
    return await Service.create(service);
  },
  updateService: async (parent, { serviceID, updatedService }: any) => {
    if (!checkValidID(serviceID)) throw new MyError(EServerErrors.INVALID_ID);

    const { error } = validateService(updatedService);
    if (error) throw new MyError(error.details[0].message);

    const service = await Service.findByIdAndUpdate(
      serviceID,
      pick(updatedService, [
        "name",
        "centre",
        "porte",
        "type",
        "prestations",
        "deleted",
      ]),
      { new: true }
    );

    if (!service) throw new MyError(`Service ${EServerErrors.UPDATE_FAILED}`);
    return service;
  },
};

export { ServiceQueries, ServiceMutations };
