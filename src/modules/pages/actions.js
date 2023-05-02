import { createAction } from "deox";

export const list = {
  request: createAction("page/GET_STATIC_PAGES_LIST", (res) => (data) =>
    res(data)
  ),
  successLeft: createAction(
    "page/GET_STATIC_LEFT_PAGES_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  successTop: createAction(
    "page/GET_STATIC_TOP_PAGES_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  successBottom: createAction(
    "page/GET_STATIC_BOTTOM_PAGES_LIST_SUCCESS",
    (res) => (data) => res(data)
  ),
  fail: createAction("page/GET_STATIC_PAGES_LIST_FAIL", (res) => (data) =>
    res(data)
  ),
};

export const view = {
  request: createAction("page/GET_PAGE_VIEW", (res) => (data) => res(data)),
  success: createAction("page/GET_PAGE_VIEW_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("page/GET_PAGE_VIEW_FAIL", (res) => (data) => res(data)),
};
