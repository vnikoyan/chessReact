import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys, decamelizeKeys } from "humps";
import { categories, problems, trainings, studentRequest } from "./actions";
import { request } from "../messages/actions";

function* getTrainingsSaga({ payload }) {
  try {
    const { data } = yield Api.getStudentTrainings(payload);
    yield put(trainings.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getTrainingSaga({ payload }) {
  try {
    const { data } = yield Api.getStudentTrainingData({ id: payload });
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(studentRequest.getResponse());
    } else {
      yield put(trainings.set(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getProblemsSaga({ payload }) {
  try {
    const { data } = yield Api.getPublicProblems(payload);
    yield put(problems.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getSelfProblemsSaga({ payload }) {
  try {
    const { data } = yield Api.getSelfProblems(payload);
    yield put(problems.successSelf(camelizeKeys(data.data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getRandomProblemsSaga() {
  try {
    const { data } = yield Api.getRandomProblems();
    yield put(problems.successSelf(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getAcceleratorProblemsSaga({ payload }) {
  try {
    const { data } = yield Api.getAcceleratorProblems(decamelizeKeys(payload));
    yield put(problems.successAccelerator(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getProblemSaga({ payload }) {
  try {
    const { data } = yield Api.getStudentTrainingsProblemData({ id: payload });
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(studentRequest.getResponse());
    } else {
      yield put(problems.set(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setFavoriteProblemSaga({ payload }) {
  try {
    const { data } = yield Api.setFavoriteProblem(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setSolvedProblemSaga({ payload: { problemId, trainingId = 0 } }) {
  try {
    const { data } = yield Api.setSolvedProblem(
      decamelizeKeys({ problemId, trainingId })
    );
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setStartProblemSaga({ payload: { problemId, trainingId = 0 } }) {
  try {
    const { data } = yield Api.setStartProblem(
      decamelizeKeys({ problemId, trainingId })
    );
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      // yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setEndProblemSaga({ payload: { problemId, trainingId = 0 } }) {
  try {
    const { data } = yield Api.setEndProblem(
      decamelizeKeys({ problemId, trainingId })
    );
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      // yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* setFailedProblemSaga({ payload: { problemId, trainingId = 0 } }) {
  try {
    const { data } = yield Api.setFailedProblem(
      decamelizeKeys({ problemId, trainingId })
    );
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

function* getCategoriesSaga() {
  try {
    const { data } = yield Api.getSelfCategories();
    yield put(categories.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
  }
}

export function* watchStudent() {
  yield takeLatest(trainings.request, getTrainingsSaga);
  yield takeLatest(trainings.get, getTrainingSaga);

  yield takeLatest(problems.request, getProblemsSaga);
  yield takeLatest(problems.requestSelf, getSelfProblemsSaga);
  yield takeLatest(problems.requestRandom, getRandomProblemsSaga);
  yield takeLatest(problems.requestAccelerator, getAcceleratorProblemsSaga);
  yield takeLatest(problems.get, getProblemSaga);
  yield takeLatest(problems.setFavorite, setFavoriteProblemSaga);
  yield takeLatest(problems.setSolved, setSolvedProblemSaga);
  yield takeLatest(problems.setStart, setStartProblemSaga);
  yield takeLatest(problems.setEnd, setEndProblemSaga);

  yield takeLatest(problems.setFailed, setFailedProblemSaga);

  yield takeLatest(categories.request, getCategoriesSaga);
}
