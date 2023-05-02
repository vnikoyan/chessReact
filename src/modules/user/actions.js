import { createAction } from "deox";

export const profile = {
  request: createAction("user/GET_PROFILE_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("user/GET_PROFILE_SUCCESS", (res) => (payload) =>
    res(payload)
  ),
  fail: createAction("user/GET_PROFILE_FAIL", (res) => (err) => res(err)),
};

export const awards = {
  request: createAction("me/GET_AWARDS_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("me/GET_AWARDS_SUCCESS", (res) => (payload) =>
    res(payload)
  ),
  fail: createAction("me/GET_AWARDS_FAIL", (res) => (err) => res(err)),
};
