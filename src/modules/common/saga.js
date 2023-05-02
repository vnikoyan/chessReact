import { camelizeKeys } from "humps";
import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";

import { processRequestError } from "../errors";

import { getCountries, getCities, getAlerts } from "./actions";

function* getCountriesSaga() {
  try {
    const { data } = yield Api.getCountriesList();

    yield put(getCountries.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: getCountries.fail }));
  }
}

function* getCitiesSaga({ payload }) {
  try {
    const { data } = yield Api.getCitiesList(payload);

    yield put(getCities.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: getCities.fail }));
  }
}

function* getAlertsSaga() {
  try {
    const { data } = yield Api.getAlerts();

    yield put(getAlerts.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: getAlerts.fail }));
  }
}

export function* watchCommonLists() {
  yield takeLatest(getCountries.request, getCountriesSaga);
  yield takeLatest(getCities.request, getCitiesSaga);
  yield takeLatest(getAlerts.request, getAlertsSaga);
}
