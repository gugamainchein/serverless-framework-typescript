import { z } from "zod";

export function getBodyKeys(body: Object) {
  const bodyExpectedKeys = z.object({
    name: z.string(),
    email: z.string().email(),
    birthdate: z.string(),
    cellphone: z.string(),
    active: z.number(),
  });

  return bodyExpectedKeys.parse(body);
}

export function getHeaderKeys(headers: Object) {
  const headersExpectedKeys = z.object({
    Authorization: z.string(),
  });

  return headersExpectedKeys.parse(headers);
}

export function getPathKeys(path: Object) {
  const pathExpectedKeys = z.object({
    form: z.string(),
    parameter: z.string(),
  });

  return pathExpectedKeys.parse(path);
}
