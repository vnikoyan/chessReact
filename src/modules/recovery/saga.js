import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys } from "humps";

import { findEmail, checkCode, setPassword } from "./actions";

function* findEmailSaga({ payload }) {
  try {
    const { data } = yield Api.findEmail(payload);
    const { error, message } = data;

    if (error) {
      yield put(findEmail.fail(message));
    } else {
      yield put(findEmail.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: findEmail.fail }));
  }
}

function* checkCodeSaga({ payload }) {
  try {
    const { data } = yield Api.checkCode(payload);
    const { error, message } = data;

    if (error) {
      yield put(checkCode.fail(message));
    } else {
      yield Api.setAuthToken(data.api_token);
      yield put(checkCode.success(data));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: checkCode.fail }));
  }
}

function* setPasswordSaga({ payload }) {
  try {
    const { data } = yield Api.setNewPassword(payload);
    const { error, message } = data;

    if (error) {
      yield put(setPassword.fail(message));
    } else {
      yield put(setPassword.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: setPassword.fail }));
  }
}

export function* watchRecovery() {
  yield takeLatest(findEmail.request, findEmailSaga);
  yield takeLatest(checkCode.request, checkCodeSaga);
  yield takeLatest(setPassword.request, setPasswordSaga);
}
