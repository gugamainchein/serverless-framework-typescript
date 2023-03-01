import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { authValidator } from "../../shared/authValidate";
import { createItem, findItemByParameter } from "../../model/dynamodb";
import { formatJSONResponse } from "../../libs/api-gateway";
import { getBodyKeys, getHeaderKeys } from "./shared/getKeys";

export const handler = async (
  event: Pick<APIGatewayProxyEvent, "body" | "headers">
): Promise<APIGatewayProxyResult> => {
  const body = getBodyKeys(event.body);
  const { Authorization } = getHeaderKeys(event.headers);
  const dynamodbTable = process.env.STAGE + "-customers";

  try {
    const headerValidate = authValidator(Authorization, "createCustomer");

    if ((await headerValidate).isPermited.status === 401)
      return formatJSONResponse(401, {
        message: "user does not permited exec this action",
      });

    const checkCustomerExists = await findItemByParameter({
      table: dynamodbTable,
      filterParameter: "email",
      filterParameterValue: body.email,
    });

    if (checkCustomerExists.Items.length === 0) {
      await createItem({
        table: dynamodbTable,
        body,
      });

      return formatJSONResponse(201, {
        message: "customer created",
      });
    } else {
      return formatJSONResponse(401, {
        message: "customer already exist",
      });
    }
  } catch (e) {
    console.log(e);
    return formatJSONResponse(500, {
      message: e,
    });
  }
};
