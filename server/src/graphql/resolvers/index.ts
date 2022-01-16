import { AuthMutations } from "./auth";
import { UserQueries, UserMutations } from "./user";

const rootResolver = {
  Query: {
    ...UserQueries,
  },
  Mutation: {
    ...AuthMutations,
    ...UserMutations,
  },
};

export default rootResolver;
