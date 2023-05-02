import { createAction } from "deox";

export const businessLogin = {
  request: createAction("business/LOGIN_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("business/LOGIN_SUCCESS", (res) => (data) => res(data)),
  fail: createAction("business/LOGIN_FAIL", (res) => (err) => res(err)),
};

export const customerLogin = {
  request: createAction("customer/LOGIN_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("customer/LOGIN_SUCCESS", (res) => (data) => res(data)),
  fail: createAction("customer/LOGIN_FAIL", (res) => (err) => res(err)),
  clearError: createAction("customer/LOGIN_CLEAR_ERROR", (res) => () => res()),
};

export const logoutAction = createAction("LOGOUT");

export const refreshTokens = createAction("TOKEN_REFRESH", (res) => (payload) =>
  res(payload)
);
