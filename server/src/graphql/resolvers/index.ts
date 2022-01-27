import { AuthMutations } from "./auth";
import { UserQueries, UserMutations } from "./user";
import { CentreQueries, CentreMutations } from "./centre";
import { ServiceQueries, ServiceMutations } from "./service";
import { PrestationQueries, PrestationMutations } from "./prestation";

const rootResolver = {
  Query: {
    ...CentreQueries,
    ...PrestationQueries,
    ...ServiceQueries,
    ...UserQueries,
  },
  Mutation: {
    ...AuthMutations,
    ...CentreMutations,
    ...PrestationMutations,
    ...ServiceMutations,
    ...UserMutations,
  },
};

export default rootResolver;
