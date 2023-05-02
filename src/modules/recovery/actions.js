import { createAction } from "deox";

export const findEmail = {
  request: createAction("recovery/FIND_USER", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("recovery/FIND_USER_SUCCESS", (res) => (email) =>
    res(email)
  ),
  fail: createAction("recovery/FIND_USER_FAIL", (res) => (err) => res(err)),
};

export const checkCode = {
  request: createAction("recovery/CHECK_CODE", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("recovery/CHECK_CODE_SUCCESS", (res) => (payload) =>
    res(payload)
  ),
  fail: createAction("recovery/CHECK_CODE_FAIL", (res) => (err) => res(err)),
};

export const setPassword = {
  request: createAction("recovery/SET_PASSWORD", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("recovery/SET_PASSWORD_SUCCESS"),
  fail: createAction("recovery/SET_PASSWORD_FAIL", (res) => (err) => res(err)),
};
