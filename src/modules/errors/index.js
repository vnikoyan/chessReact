import { createAction } from "deox";

export const processRequestError = createAction(
  "errors/PROCESS_REQUEST_ERROR",
  (resolve) => (payload) => resolve(payload)
);
