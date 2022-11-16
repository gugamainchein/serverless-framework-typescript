import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { authValidator } from "../../shared/authValidate";
import { findItemByParameter, updateItem } from "../../model/dynamodb";
import { formatJSONResponse } from "../../libs/api-gateway";
import { middyfy } from "../../libs/lambda";
import { getBodyKeys, getHeaderKeys, getPathKeys } from "./shared/getKeys";

export const put = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { form, parameter } = getPathKeys(event.pathParameters);
    const body = getBodyKeys(event.body);
    const { Authorization } = getHeaderKeys(event.headers);
    const dynamodbTable = process.env.STAGE + "-customers";

    try {
      const headerValidate = authValidator(Authorization, "updateCustomer");

      if ((await headerValidate).isPermited === 401)
        return formatJSONResponse(401, {
          message: "user does not permited exec this action",
        });

      const findItemToUpdate = await findItemByParameter({
        table: dynamodbTable,
        filterParameter: form,
        filterParameterValue: parameter,
      });

      if (findItemToUpdate.Items.length > 0) {
        await updateItem({
          table: dynamodbTable,
          id: findItemToUpdate.Items[0].id,
          body,
        });

        return formatJSONResponse(200, {
          message: "customer updated",
        });
      } else {
        return formatJSONResponse(404, {
          message: "customer does not exist",
        });
      }
    } catch (e) {
      console.log(e);
      return formatJSONResponse(500, {
        message: e,
      });
    }
  }
);
