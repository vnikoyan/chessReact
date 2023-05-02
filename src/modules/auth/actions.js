import { createAction } from "deox";

export const signUp = {
  request: createAction("user/REGISTER_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("user/REGISTER_SUCCESS", (res) => (data) => res(data)),
  fail: createAction("user/REGISTER_FAIL", (res) => (err) => res(err)),
  clearError: createAction("user/LOGIN_CLEAR_ERROR", (res) => () => res()),
  clearSuccessMessage: createAction(
    "user/LOGIN_CLEAR_SUCCESS_MESSAGE",
    (res) => () => res()
  ),
  emailVerification: createAction(
    "user/EMAIL_VERIFICATION",
    (res) => (payload) => res(payload)
  ),
  emailVerificationSuccess: createAction(
    "user/EMAIL_VERIFICATION_FAIL",
    (res) => (data) => res(data)
  ),
  emailVerificationFail: createAction(
    "user/EMAIL_VERIFICATION_ERROR",
    (res) => (err) => res(err)
  ),
};

export const signIn = {
  request: createAction("user/LOGIN_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("user/LOGIN_SUCCESS", (res) => (data) => res(data)),
  fail: createAction("user/LOGIN_FAIL", (res) => (err) => res(err)),
};

export const logoutAction = createAction("LOGOUT");

export const refreshTokens = createAction("TOKEN_REFRESH", (res) => (payload) =>
  res(payload)
);
