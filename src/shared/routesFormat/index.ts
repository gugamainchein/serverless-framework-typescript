export function formatRoute(
  path: string,
  functionName: string,
  methodRoute: string,
  pathRoute: string
) {
  return {
    handler: `${path}/${functionName}`,
    events: [
      {
        http: {
          method: methodRoute,
          path: pathRoute,
          cors: true,
        },
      },
    ],
  };
}
