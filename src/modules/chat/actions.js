import { createAction } from "deox";

export const dialogs = {
  request: createAction("chat/GET_DIALOG_LIST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("chat/GET_DIALOG_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("chat/GET_DIALOG_LIST_FAIL", (res) => (data) => res(data)),
};

export const send = {
  request: createAction("chat/SEND_MESSAGES", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("chat/SEND_MESSAGES_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("chat/SEND_MESSAGES_FAIL", (res) => (data) => res(data)),
};

export const messages = {
  request: createAction("chat/GET_MESSAGES", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("chat/GET_MESSAGES_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("chat/GET_MESSAGES_FAIL", (res) => (data) => res(data)),
};
