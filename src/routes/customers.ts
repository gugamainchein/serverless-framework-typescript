import { formatRoute } from "@shared/routesFormat";

export const readCustomer = formatRoute(
  "src/functions/customers",
  "read.get",
  "get",
  "customers/read/{form}/{parameter}"
);

export const createCustomer = formatRoute(
  "src/functions/customers",
  "create.post",
  "post",
  "customers/create"
);

export const updateCustomer = formatRoute(
  "src/functions/customers",
  "update.put",
  "put",
  "customers/update/{form}/{parameter}"
);
