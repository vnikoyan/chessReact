import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys } from "humps";

import { dialogs, messages, send } from "./actions";

function* getDialogListSaga({ payload }) {
  try {
    const { data } = yield Api.getDialogList({ search: payload });
    const { error, message } = data;
    if (error) {
      yield put(dialogs.fail({ message: message }));
    } else {
      yield put(dialogs.success(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: dialogs.fail }));
  }
}

function* getMessagesSaga({ payload }) {
  try {
    const { data } = yield Api.getMessages({ id: payload });
    const { error, message } = data;
    if (error) {
      yield put(messages.fail({ message: message }));
    } else {
      yield put(messages.success(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: messages.fail }));
  }
}

function* sendMessagesSaga({ payload }) {
  try {
    const { data } = yield Api.sendMessage(payload);
    const { error, message } = data;
    if (error) {
      yield put(send.fail({ message: message }));
    } else {
      yield put(messages.request(payload.dialogID));
      yield put(send.success(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: send.fail }));
  }
}

export function* watchChat() {
  yield takeLatest(dialogs.request, getDialogListSaga);
  yield takeLatest(messages.request, getMessagesSaga);
  yield takeLatest(send.request, sendMessagesSaga);
}
