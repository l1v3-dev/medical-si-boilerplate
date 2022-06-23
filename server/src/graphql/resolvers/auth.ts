import Joi from "joi";
import { compare } from "bcrypt";
import config from "config";
import User from "models/admin/user";
import { MyError } from "utils/errors";
import { EAuthenticationError } from "enums/errors";
import { createUsers } from "mocks/users";
import { createCentre } from "mocks/centre";

const AuthMutations = {
  login: async (p, { loginParams }: any, { res }) => {
    // ==== check login credentials
    const { error } = validateLoginParams(loginParams);
    if (error) throw new MyError(error.details[0].message);

    const { email, tel, password } = loginParams;

    const user = await User.findOne({
      $or: [{ email }, { tel }],
    });

    if (!user)
      throw new MyError(`Login ${EAuthenticationError.INVALID_CREDENTIALS}`);

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      user.connexionAttempts += 1;
      // await user.save();
      throw new MyError(`Password ${EAuthenticationError.INVALID_CREDENTIALS}`);
    }
    // ==== check login credentials
    const { jwtSecret, tokenLife, refreshTokenKey, refreshTokenLife } = config;
    const accessToken = user.generateAuthToken(jwtSecret, tokenLife);
    const refreshToken = user.generateAuthToken(
      refreshTokenKey,
      refreshTokenLife
    );
    user.refreshToken = refreshToken;
    // TODO: implement this security feature to avoid brute force
    await user.save();

    // res.cookie = { ...res.cookie, accessToken, refreshToken };

    return { accessToken, refreshToken };
  },
  seed: async (p, { nbUsers }: any) => {
    const newUsers = await createUsers(nbUsers);
    await createCentre(3);
    console.log("Seed completed successfully...");
    return newUsers;
  },
};

function validateLoginParams(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50),
    tel: Joi.string(),
    password: Joi.string().min(8).max(255).required(),
  });
  return schema.validate(user);
}

// function validateRegisterParams(user) {
//   const schema = Joi.object({
//     category: Joi.string().required(),
//     firstname: Joi.string().required(),
//     lastname: Joi.string().required(),
//     email: Joi.string().required(),
//     tel: Joi.string().required(),
//     password: Joi.string().required(),
//     desiredProject: Joi.array().items(Joi.string()),
//     type: Joi.string(),
//   });

//   return schema.validate(user);
// }

export { AuthMutations };
