import { AuthMutations } from "./auth";
import { UserQueries, UserMutations } from "./user";
import { CentreQueries, CentreMutations } from "./centre";

const rootResolver = {
  Query: {
    ...UserQueries,
    ...CentreQueries
  },
  Mutation: {
    ...AuthMutations,
    ...UserMutations,
    ...CentreMutations
  },
};

export default rootResolver;
