export const formatJSONResponse = (
  status: number,
  response: Record<string, unknown>
) => {
  return {
    statusCode: status,
    body: JSON.stringify(response),
  };
};
