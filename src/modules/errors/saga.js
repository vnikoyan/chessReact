import { put, select, takeEvery } from "redux-saga/effects";

import { logoutAction } from "modules/auth/actions";

import { processRequestError } from "./index";

// eslint-disable-next-line consistent-return
function* processRequestErrorSaga({ payload: { error, failAction } }) {
  const errors = { message: "Request failed!" };
  console.log(error);
  if (error.response) {
    const { data, status } = error.response;

    if (data.detail) {
      Object.keys(data.detail).forEach((key) => {
        errors.message = data.detail[key][0] || "Request failed!";
      });
    } else if (typeof data.detail === "string") {
      errors.message = data.detail;
    } else if (Array.isArray(data.detail?.object_error)) {
      errors.message = data.detail?.object_error[0];
    } else {
      errors.message = "Server error";
    }

    if (status === 403 || status === 401) {
      const { access } = yield select((state) => state.login);
      // handle case when refresh token failed (token blacklisted) in api/tokenRefresh.ts
      if (!access) {
        yield put(logoutAction());
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    if (error.request.status === 0) {
      errors.message = "Network error";
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    errors.message = "Something went wrong";
  }

  yield put(failAction(errors.message));
}

export function* watchErrors() {
  yield takeEvery(processRequestError, processRequestErrorSaga);
}
