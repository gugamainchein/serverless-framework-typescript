const Axios = require("axios");

const Chance = require("chance");
const chance = new Chance();

describe("Create customers", () => {
  it("Method for creating customer", async () => {
    const body = {
      name: chance.name(),
      email: chance.email(),
      birthdate: chance.birthday({ string: true, american: false }),
      cellphone: chance.phone(),
      active: 1,
    };

    const result = await Axios.post(
      process.env.API_URL + "/customers/create",
      body,
      {
        headers: {
          Authorization: process.env.AUTH_HEADER,
        },
      }
    );

    expect(result.status).toBe(201);
  });
});
