const Axios = require("axios");

describe("Read all customers", () => {
  it("Method for read all customers", async () => {
    const [form, parameter] = ["all", "0"];

    const result = await Axios.get(
      process.env.API_URL + "/customers/read/" + form + "/" + parameter,
      {
        headers: {
          Authorization: process.env.AUTH_HEADER,
        },
      }
    );

    expect(result.status).toBe(200);
  });
});

describe("Read unique customer", () => {
  it("Method for read customer by email", async () => {
    const [form, parameter] = ["email", "gustavo.mainchein@example.com"];

    const result = await Axios.get(
      process.env.API_URL + "/customers/read/" + form + "/" + parameter,
      {
        headers: {
          Authorization: process.env.AUTH_HEADER,
        },
      }
    );

    expect(result.status).toBe(200);
  });

  it("Method for read customers by cellphone", async () => {
    const [form, parameter] = ["cellphone", "(705) 678-8035"];

    const result = await Axios.get(
      process.env.API_URL + "/customers/read/" + form + "/" + parameter,
      {
        headers: {
          Authorization: process.env.AUTH_HEADER,
        },
      }
    );

    expect(result.status).toBe(200);
  });
});
