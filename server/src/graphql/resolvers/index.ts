import { UserQueries, UserMutations } from "./user";

const rootResolver = {
  Query: {
    ...UserQueries,
  },
  Mutation: {
    ...UserMutations,
  },
};

export default rootResolver;
