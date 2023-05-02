import { createAction } from "deox";

export const getCountries = {
  request: createAction("common/GET_COUNTRIES_LIST"),
  success: createAction("common/GET_COUNTRIES_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("common/GET_COUNTRIES_LIST_FAIL", (res) => (err) =>
    res(err)
  ),
};

export const getCities = {
  request: createAction("common/GET_CITIES_LIST", (res) => (payload) =>
    res(payload)
  ),
  success: createAction("common/GET_CITIES_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("common/GET_CITIES_LIST_FAIL", (res) => (err) => res(err)),
};

export const getAlerts = {
  request: createAction("common/GET_ALERTS_LIST"),
  success: createAction("common/GET_ALERTS_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
  fail: createAction("common/GET_ALERTS_LIST_FAIL", (res) => (err) => res(err)),
};
