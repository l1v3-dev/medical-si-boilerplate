// import faker from "faker/locale/fr";
import { pick } from "lodash";
import User from "../models/admin/user";
import { EUserGenre, EUserRole } from "../enums/common";

export const createUsers = async (nb: number) => {
  const list = [];
  for (let i = 0; i < nb; i++) {
    list.push({
      lastname: `rakoto_${i}`,
      firstname: `arivelo_${i}`,
      sexe: i % 2 === 0 ? EUserGenre.MALE : EUserGenre.FEMALE,
      tel: "0323214568",
      email: "arivelo@gmail.com",
      password: "arivelolive3306",
      role: EUserRole.CUSTOMER,
    });
  }
  return await seed(list);
  // return list;
};

const seed = async (usersList: any) => {
  let i = 0;
  const result = [];
  await User.deleteMany();
  do {
    const person = await User.findOne({ email: usersList[i].email });
    if (!person) {
      const newUser = new User(
        pick(usersList[i], [
          "firstname",
          "lastname",
          "sexe",
          "age",
          "email",
          "tel",
          "password",
          "image",
          "role",
        ])
      );

      await User.create(newUser);
      result.push(newUser);
    }

    i++;
  } while (i < usersList.length);

  return result;
};
