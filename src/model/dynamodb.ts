import { z } from "zod";
import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";

const dynamodb = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION_LOCATION,
});

export async function findItemByParameter(params: Object) {
  const objectItemsValidate = z.object({
    table: z.string(),
    filterParameter: z.string(),
    filterParameterValue: z.any(),
  });

  const scanParams = objectItemsValidate.parse(params);

  return await dynamodb
    .scan({
      TableName: scanParams.table,
      FilterExpression: `${scanParams.filterParameter} = :parameter`,
      ExpressionAttributeValues: {
        ":parameter": scanParams.filterParameterValue,
      },
    })
    .promise();
}

export async function createItem(params: Object) {
  const objectItemsValidate = z.object({
    id: z.string().uuid().default(v4()),
    table: z.string(),
    body: z.any(),
  });

  const putParams = objectItemsValidate.parse(params);
  putParams.body.id = putParams.id;
  putParams.body.createdAt = new Date().toLocaleString("pt-BR");
  putParams.body.updatedAt = new Date().toLocaleString("pt-BR");

  return await dynamodb
    .put({
      TableName: putParams.table,
      Item: putParams.body,
    })
    .promise();
}

export async function findAllItems(tableName: string) {
  const params = {
    TableName: tableName,
    ExclusiveStartKey: null,
  };

  const scanResults = { Items: [] };
  let items;

  do {
    items = await dynamodb.scan(params).promise();
    items.Items.forEach((item) => scanResults.Items.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof items.LastEvaluatedKey !== "undefined");

  return scanResults;
}

export async function updateItem(params: Object) {
  const objectItemsValidate = z.object({
    id: z.string().uuid(),
    table: z.string(),
    body: z.any(),
  });

  const putParams = objectItemsValidate.parse(params);
  putParams.body.updatedAt = new Date().toLocaleString("pt-BR");

  let newBody = {};
  for (let keysBody of Object.keys(putParams.body)) {
    newBody[keysBody] = {
      Action: "PUT",
      Value: putParams.body[keysBody],
    };
  }

  return await dynamodb
    .update({
      Key: { id: putParams.id },
      TableName: putParams.table,
      AttributeUpdates: newBody,
    })
    .promise();
}
