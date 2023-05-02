import { takeLatest, put } from "redux-saga/effects";
import { decamelizeKeys } from "humps";

import { Api } from "api";
import { processRequestError } from "modules/errors";

import { settings } from "./actions";
import { request } from "../messages/actions";

import { settings as userSettings } from "../me/actions";

function* setGeneralSaga({ payload }) {
  try {
    const { data } = yield Api.setGeneral(payload);

    const { error, message } = data;
    yield put(settings.getResponse());

    if (error) {
      if (message.country) {
        yield put(request.fail("Country is required"));
      } else if (message.city) {
        yield put(request.fail("City is required"));
      } else if (message.email) {
        yield put(request.fail("Email is not unique"));
      } else {
        yield put(request.fail(message));
      }
    } else {
      yield put(request.success(message));
      yield put(userSettings.setGeneral(payload));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setAvatarSaga({ payload }) {
  try {
    const formData = new FormData();
    formData.append("image", payload, payload.name);

    const { data } = yield Api.setAvatar(formData);
    const { error, message } = data;
    yield put(settings.getResponse());

    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success("Profile Avatar updated successfully"));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setAdditionalSaga({ payload }) {
  try {
    const { data } = yield Api.setAdditional(payload);

    const { error, message } = data;
    yield put(settings.getResponse());

    if (error) {
      if (message.about) {
        yield put(request.fail("About is required"));
      } else if (message.whatsapp) {
        yield put(request.fail("Whatsapp is required"));
      } else {
        yield put(request.fail(message));
      }
    } else {
      yield put(request.success("Additional settings updated successfully"));
      yield put(userSettings.setAdditional(payload));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setPasswordSaga({ payload }) {
  try {
    const { data } = yield Api.setPassword(decamelizeKeys(payload));

    const { error, message } = data;
    yield put(settings.getResponse());

    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

export function* watchSettings() {
  yield takeLatest(settings.generalRequest, setGeneralSaga);
  yield takeLatest(settings.avatarRequest, setAvatarSaga);
  yield takeLatest(settings.additionalRequest, setAdditionalSaga);
  yield takeLatest(settings.passwordRequest, setPasswordSaga);
}
