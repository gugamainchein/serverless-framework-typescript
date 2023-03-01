import { formatRoute } from "@shared/routesFormat";

export const readCustomer = formatRoute(
  "src/functions/customers",
  "read.handler",
  "get",
  "customers/read/{form}/{parameter}",
  "ICreateCustomer",
  "Clientes"
);

export const createCustomer = formatRoute(
  "src/functions/customers",
  "create.handler",
  "post",
  "customers/create",
  "IReadCustomer",
  "Clientes"
);

export const updateCustomer = formatRoute(
  "src/functions/customers",
  "update.handler",
  "put",
  "customers/update/{form}/{parameter}",
  "IUpdateCustomer",
  "Clientes"
);
