import User, { validateUser } from "../../models/admin/user";
import { pick } from "lodash";
import { checkValidID } from "../../utils/objectID";
import { MyError } from "../../utils/errors";
import { EServerErrors } from "../../enums/errors";

const UserQueries = {
  users: async (p, { pageSize = 10, after }) => {
    const users = await User.find({ deleted: false })
      .skip(after)
      .limit(pageSize)
      .lean();
    if (!users) throw new MyError(`Users ${EServerErrors.NOT_FOUND}`);
    return users;
  },
  user: async (parent, { userID }) => {
    // userID checking
    if (!checkValidID(userID)) throw new Error(EServerErrors.INVALID_ID);

    const user = await User.findOne({ _id: userID, deleted: false }).lean();
    if (!user) throw new MyError(`User ${EServerErrors.NOT_FOUND}`);
    return user;
  },
};

const UserMutations = {
  createUser: async (parent, { newUser }: any) => {
    const { error } = validateUser(newUser);
    if (error) throw new MyError(error.details[0].message);

    const user = new User(
      pick(newUser, [
        "firstname",
        "lastname",
        "username",
        "password",
        "image",
        "role",
      ])
    );
    return await User.create(user);
  },
  updateUser: async (parent, { userID, updatedUser }: any) => {
    if (!checkValidID(userID)) throw new MyError(EServerErrors.INVALID_ID);

    const { error } = validateUser(updatedUser);
    if (error) throw new MyError(error.details[0].message);

    const user = await User.findByIdAndUpdate(
      userID,
      pick(updatedUser, [
        "firstname",
        "lastname",
        "username",
        "password",
        "image",
        "role",
        "deleted",
      ]),
      { new: true }
    );

    if (!user) throw new MyError(`User ${EServerErrors.UPDATE_FAILED}`);
    return user;
  },
};

export { UserQueries, UserMutations };
