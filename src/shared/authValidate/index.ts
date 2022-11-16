import { z } from "zod";
import jwt_decode from "jwt-decode";
import { findItemByParameter } from "../../model/dynamodb";

export async function permissionsValidator(
  permissionId: string,
  action: string
) {
  const permissionItemsKeys = z.object({
    permissions: z.any(),
  });

  const findPermission = await findItemByParameter({
    table: process.env.STAGE + "-permissions",
    filterParameter: "id",
    filterParameterValue: permissionId,
  });

  const permissionParams = permissionItemsKeys.parse(findPermission.Items);
  const permissionsValue = permissionParams.permissions;

  return permissionsValue.includes(action)
    ? {
        status: 200,
      }
    : {
        status: 403,
      };
}

export async function authValidator(auth: string, action: string) {
  const decodedValidate = z.object({
    googleId: z.string(),
    name: z.string(),
    picture: z.string().url(),
    email: z.string().email(),
    permissionId: z.string(),
  });

  const decoded = jwt_decode(auth);
  const decodedParse = decodedValidate.parse(decoded);
  const isPermited = await permissionsValidator(
    decodedParse.permissionId,
    action
  );

  return {
    jwtDecode: decodedParse,
    isPermited: isPermited,
  };
}
