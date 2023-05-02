import { camelizeKeys } from "humps";
import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";

import { profile, awards } from "./actions";

function* getProfileSaga({ payload }) {
  try {
    const { data } = yield Api.getUserProfile({ username: payload });
    yield put(profile.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: profile.fail }));
  }
}

function* getAwardsSaga({ payload }) {
  try {
    const { data } = yield Api.getUserAwards({ username: payload });
    yield put(awards.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: awards.fail }));
  }
}

export function* watchUser() {
  yield takeLatest(profile.request, getProfileSaga);
  yield takeLatest(awards.request, getAwardsSaga);
}
