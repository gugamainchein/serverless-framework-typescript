import Chance from "chance";

import * as update from "../../../src/functions/customers/update";

const chance = new Chance();

describe("Update customer", () => {
  it("Method for update customer", async () => {
    const body = {
      name: chance.name(),
      email: chance.email(),
      birthdate: chance.birthday({ string: true, american: false }),
      cellphone: chance.phone(),
      active: 0,
    };

    const result = await update.handler({
      body: JSON.stringify(body),
      pathParameters: { form: "email", parameter: "had@luz.ke" },
      headers: { Authorization: process.env.AUTH_HEADER },
    });

    expect(result.statusCode).toBe(200);
  });
});
