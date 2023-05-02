import { camelizeKeys } from "humps";
import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";

import { profile, notifications, subscribe } from "./actions";
import { request } from "../messages/actions";
import { dialogs, messages, send } from "../chat/actions";

function* getProfileSaga({ payload }) {
  try {
    const { data } = yield Api.getUserProfile({ id: payload });
    yield put(profile.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getNotificationsSaga() {
  try {
    const { data } = yield Api.getNotifications();
    yield put(notifications.success(camelizeKeys(data.notifications)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* deleteNotificationSaga({ payload }) {
  try {
    yield Api.deleteNotification(payload);
    yield put(notifications.request());
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* viewedNotificationSaga({ payload }) {
  try {
    yield payload.forEach((item) => {
      Api.viewedNotification({ id: item.id });
    });
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* sendActionNotificationSaga({ payload }) {
  try {
    const { data } = yield Api.sendActionNotification(payload);
    yield put(request.success(data.message));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* subscribeSaga() {
  try {
    const { data } = yield Api.subscribe();
    if (data.type === "reconnect") {
      yield put(subscribe.request());
    } else if (data.type === "message") {
      const parsedData = JSON.parse(data.data.message);
      console.log(parsedData);
      if (parsedData.type === "notification") {
        yield put(
          notifications.success(camelizeKeys(parsedData.data.notifications))
        );
      }
      if (parsedData && parsedData.type === "message") {
        yield put(messages.request(parsedData.dialog_id));
      }
      yield put(subscribe.request());
    }
    // yield put(request.success(data.message));
  } catch (error) {
    console.log(error);
    // yield put(processRequestError({ error, failAction: request.fail }));
  }
}

export function* watchMe() {
  yield takeLatest(profile.request, getProfileSaga);
  yield takeLatest(notifications.request, getNotificationsSaga);
  yield takeLatest(notifications.delete, deleteNotificationSaga);
  yield takeLatest(notifications.action, sendActionNotificationSaga);
  yield takeLatest(notifications.viewed, viewedNotificationSaga);
  yield takeLatest(subscribe.request, subscribeSaga);
}
