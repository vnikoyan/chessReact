import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys } from "humps";

import { list, view } from "./actions";

function* getPagesListSaga({ payload }) {
  try {
    const { data } = yield Api.getPagesList(payload);
    switch (payload) {
      case "top":
        yield put(list.successTop(camelizeKeys(data)));
        break;
      case "left":
        yield put(list.successLeft(camelizeKeys(data)));
        break;
      case "bottom":
        yield put(list.successBottom(camelizeKeys(data)));
        break;
      default:
        yield put(list.successTop(camelizeKeys(data)));
        break;
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: list.fail }));
  }
}

function* getPageViewSaga({ payload }) {
  try {
    const { data } = yield Api.getPageView({ path: payload });
    yield put(view.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: view.fail }));
  }
}

export function* watchPages() {
  yield takeLatest(list.request, getPagesListSaga);
  yield takeLatest(view.request, getPageViewSaga);
}
