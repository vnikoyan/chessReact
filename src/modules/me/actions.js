import { createAction } from "deox";

export const profile = {
  request: createAction("me/GET_PROFILE_REQUEST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("me/GET_PROFILE_SUCCESS", (res) => (payload) =>
    res(payload)
  ),
};

export const settings = {
  setGeneral: createAction("me/SET_GENERAL_SETTINGS", (res) => (payload) =>
    res(payload)
  ),
  setAdditional: createAction(
    "me/SET_ADDITIONAL_SETTINGS",
    (res) => (payload) => res(payload)
  ),
  setNewAvatar: createAction("me/SET_AVATAR", (res) => (payload) =>
    res(payload)
  ),
};

export const notifications = {
  request: createAction("me/GET_NOTIFICATIONS_LIST"),
  delete: createAction("me/DELETE_NOTIFICATION", (res) => (payload) =>
    res(payload)
  ),
  viewed: createAction("me/VIEW_NOTIFICATION", (res) => (payload) =>
    res(payload)
  ),
  action: createAction("me/SEND_NOTIFICATION_ACTION", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("me/GET_NOTIFICATIONS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
};

export const subscribe = {
  request: createAction("me/GET_SUBSCRIBE"),
  delete: createAction("me/DELETE_NOTIFICATION", (res) => (payload) =>
    res(payload)
  ),
  viewed: createAction("me/VIEW_NOTIFICATION", (res) => (payload) =>
    res(payload)
  ),
  action: createAction("me/SEND_NOTIFICATION_ACTION", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("me/GET_NOTIFICATIONS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
};
