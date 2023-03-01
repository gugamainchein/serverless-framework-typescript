import Chance from "chance";

import * as create from "../../../src/functions/customers/create";

const chance = new Chance();

describe("Create customers", () => {
  test("Method for creating customer", async () => {
    const body = {
      name: chance.name(),
      email: chance.email(),
      birthdate: chance.birthday({ string: true, american: false }),
      cellphone: chance.phone(),
      active: 1,
    };

    const result = await create.handler({
      body: JSON.stringify(body),
      headers: { Authorization: process.env.AUTH_HEADER },
    });

    expect(result.statusCode).toBe(201);
  });
});
