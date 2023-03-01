export function formatRoute(
  path: string,
  functionName: string,
  methodRoute: string,
  pathRoute: string,
  bodyParams: "ICreateCustomer" | "IReadCustomer" | "IUpdateCustomer",
  swaggerTags: string
) {
  return {
    handler: `${path}/${functionName}`,
    events: [
      {
        http: {
          method: methodRoute,
          path: pathRoute,
          cors: true,
          bodyType: bodyParams,
          swaggerTags: swaggerTags,
        },
      },
    ],
  };
}
