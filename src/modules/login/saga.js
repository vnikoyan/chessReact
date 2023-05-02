import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";

import { businessLogin, customerLogin } from "./actions";

function* businessLoginSaga({ payload }) {
  const { requestData, onSuccessCb, onFailCb } = payload;
  try {
    const { data } = yield Api.loginBusiness(requestData);

    yield Api.setAuthToken(data.access);

    yield put(businessLogin.success(data));

    if (onSuccessCb) {
      onSuccessCb();
    }
  } catch (error) {
    if (onFailCb) {
      onFailCb();
    }
    yield put(processRequestError({ error, failAction: businessLogin.fail }));
  }
}

function* customerLoginSaga({ payload }) {
  const { requestData, onSuccessCb, onFailCb } = payload;
  try {
    const { data } = yield Api.loginCustomer(requestData);

    yield Api.setAuthToken(data.access);

    yield put(customerLogin.success(data));

    if (onSuccessCb) {
      onSuccessCb();
    }
  } catch (error) {
    if (onFailCb) {
      onFailCb();
    }
    yield put(processRequestError({ error, failAction: customerLogin.fail }));
  }
}

export function* watchLogin() {
  yield takeLatest(businessLogin.request, businessLoginSaga);
  yield takeLatest(customerLogin.request, customerLoginSaga);
}
