import { pick } from "lodash";
import faker from "@faker-js/faker";
import Centre from "../models/admin/centre";

const seed = async (centresList: any) => {
  let i = 0;
  const result = [];
  await Centre.deleteMany();
  do {
    const newCentre = new Centre(
      pick(centresList[i], [
        "name",
        "location"
      ])
    );

    await Centre.create(newCentre);
    result.push(newCentre);

    i++;
  } while (i < centresList.length);

  return result;
};

export const createCentre = async (nb: number) => {
  const list = [];
  for (let i = 0; i < nb; i++) {
    list.push({
      name: faker.company.companyName(),
      location: faker.address.city.name
    });
  }
  return await seed(list);
};