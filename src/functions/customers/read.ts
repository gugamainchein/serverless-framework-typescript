import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { authValidator } from "../../shared/authValidate";
import { findAllItems, findItemByParameter } from "../../model/dynamodb";
import { formatJSONResponse } from "../../libs/api-gateway";
import { getHeaderKeys, getPathKeys } from "./shared/getKeys";

export const handler = async (
  event: Pick<APIGatewayProxyEvent, "pathParameters" | "headers">
): Promise<APIGatewayProxyResult> => {
  const { form, parameter } = getPathKeys(event.pathParameters);
  const { Authorization } = getHeaderKeys(event.headers);
  const dynamodbTable = process.env.STAGE + "-customers";

  try {
    const headerValidate = authValidator(Authorization, "readCustomer");

    if ((await headerValidate).isPermited.status === 401)
      return formatJSONResponse(401, {
        message: "user does not permited exec this action",
      });

    const readMethods = {
      all: async () => await findAllItems(dynamodbTable),
      param: async () =>
        await findItemByParameter({
          table: dynamodbTable,
          filterParameter: form,
          filterParameterValue:
            typeof Number(parameter) === "number"
              ? parseInt(parameter)
              : parameter,
        }),
    };

    const response =
      form === "all" ? await readMethods.all() : await readMethods.param();

    console.log(response);

    return formatJSONResponse(200, {
      message: response,
    });
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, {
      message: e,
    });
  }
};
