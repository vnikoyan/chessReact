import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { customerLogin } from "modules/login/actions";

import { signUp, signIn } from "./actions";

function* signUpSaga({ payload }) {
  try {
    const { requestData } = payload;

    const { data } = yield Api.register(requestData);

    const { error, message } = data;

    if (error) {
      yield put(signUp.fail(message));
    } else {
      yield Api.setAuthToken(data.user.api_token);
      yield put(signUp.success(data));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: signUp.fail }));
  }
}

function* emailVerification({ payload }) {
  const { verificationToken } = payload;
  try {
    const { data } = yield Api.emailVerification(verificationToken);

    yield put(customerLogin.success(data));
  } catch (error) {
    yield put(processRequestError({ error, failAction: signUp.fail }));
  }
}

function* signInSaga({ payload }) {
  try {
    const { requestData } = payload;
    const { data } = yield Api.login(requestData);

    const { error, message } = data;

    if (error) {
      yield put(signIn.fail({ login: message }));
    } else {
      yield Api.setAuthToken(data.user.api_token);
      yield put(signIn.success(data));
      if (data.user.kind === "coach") {
        window.location = "/coach/cabinet";
      } else {
        window.location = "/student/dashboard";
      }
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: signIn.fail }));
  }
}

export function* watchAuth() {
  yield takeLatest(signUp.request, signUpSaga);
  yield takeLatest(signUp.emailVerification, emailVerification);
  yield takeLatest(signIn.request, signInSaga);
}
