import { pick } from "lodash";
import faker from "@faker-js/faker";
import Service from "models/admin/service";

export const createServices = async (nb: number, centre: string) => {
  const list = [];
  for (let i = 0; i < nb; i++) {
    list.push({
      name: faker.commerce.department(),
      centre,
      porte: Math.floor(Math.random() * 10) + 1,
      type: "3rd",
      prestations: []
    });
  }
  return await seed(list);
}

const seed = async (servicesList: any) => {
  let i = 0;
  const result = [];
  await Service.deleteMany();
  do {
    const newService = new Service(
      pick(servicesList[i], [
        "name",
        "centre",
        "porte",
        "type",
        "prestations",
      ])
    );

    await Service.create(newService);
    result.push(newService);

    i++;
  } while (i < servicesList.length);

  return result;
};