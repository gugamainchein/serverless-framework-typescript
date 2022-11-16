const Axios = require("axios");

const Chance = require("chance");
const chance = new Chance();

describe("Update customer", () => {
  it("Method for update customer", async () => {
    const [form, parameter] = ["email", "had@luz.ke"];

    const body = {
      name: chance.name(),
      email: chance.email(),
      birthdate: chance.birthday({ string: true, american: false }),
      cellphone: chance.phone(),
      active: 0,
    };

    const result = await Axios.put(
      process.env.API_URL + "/customers/update/" + form + "/" + parameter,
      body,
      {
        headers: {
          Authorization: process.env.AUTH_HEADER,
        },
      }
    );

    expect(result.status).toBe(200);
  });
});
