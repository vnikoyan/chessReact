import { createAction } from "deox";

export const settings = {
  generalRequest: createAction("settings/GENERAL_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  avatarRequest: createAction("settings/AVATAR_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  additionalRequest: createAction(
    "settings/ADDITIONAL_REQUEST",
    (res) => (payload) => res(payload)
  ),
  passwordRequest: createAction(
    "settings/PASSWORD_REQUEST",
    (res) => (payload) => res(payload)
  ),
  getResponse: createAction("settings/END_REQUEST"),
};
