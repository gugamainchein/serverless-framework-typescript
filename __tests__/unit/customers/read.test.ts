import * as read from "../../../src/functions/customers/read";

describe("Read all customers", () => {
  it("Method for read all customers", async () => {
    const result = await read.handler({
      pathParameters: { form: "all", parameter: "0" },
      headers: { Authorization: process.env.AUTH_HEADER },
    });

    expect(result.statusCode).toBe(200);
  });
});

describe("Read unique customer", () => {
  it("Method for read customer by email", async () => {
    const result = await read.handler({
      pathParameters: {
        form: "email",
        parameter: "gustavo.mainchein@example.com",
      },
      headers: { Authorization: process.env.AUTH_HEADER },
    });

    expect(result.statusCode).toBe(200);
  });

  it("Method for read customers by cellphone", async () => {
    const result = await read.handler({
      pathParameters: {
        form: "cellphone",
        parameter: "(705) 678-8035",
      },
      headers: { Authorization: process.env.AUTH_HEADER },
    });

    expect(result.statusCode).toBe(200);
  });
});
