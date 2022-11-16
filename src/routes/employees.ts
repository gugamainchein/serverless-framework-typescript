import { formatRoute } from "@shared/routesFormat";

export const readEmployees = formatRoute(
  "src/functions/employees",
  "read.get",
  "get",
  "employees/read/{form}/{parameter}"
);

export const createEmployees = formatRoute(
  "src/functions/employees",
  "create.post",
  "post",
  "employees/create"
);

export const updateEmployees = formatRoute(
  "src/functions/employees",
  "update.put",
  "put",
  "employees/update/{form}/{parameter}"
);
