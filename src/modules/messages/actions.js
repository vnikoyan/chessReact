import { createAction } from "deox";

export const request = {
  send: createAction("request/CLEAR_MESSAGES"),
  fail: createAction("request/REQUEST_FAIL", (res) => (data) => res(data)),
  success: createAction("request/REQUEST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  clear: createAction("request/CLEAR_MESSAGES"),
};
