import { takeLatest, put } from "redux-saga/effects";

import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys, decamelizeKeys } from "humps";
import {
  allCategories,
  categories,
  student,
  problems,
  trainings,
  groups,
} from "./actions";
import { request } from "../messages/actions";

function* getCategoriesSaga() {
  try {
    const { data } = yield Api.getCategories();
    yield put(categories.success(camelizeKeys(data.categories)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getCategoriesDataSaga({ payload }) {
  try {
    const { data } = yield Api.getCategoriesData(payload);
    yield put(categories.dataSuccess(data));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* importCategoriesSaga({ payload }) {
  try {
    const { data } = yield Api.importCategories(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(categories.request());
    }
    yield put(categories.importSuccess(data));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getPublicCategoriesSaga() {
  try {
    const { data } = yield Api.getPublicCategories();
    yield put(allCategories.success(camelizeKeys(data.categories)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* createCategorySaga({ payload }) {
  try {
    const { data } = yield Api.createCategory(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(categories.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* deleteCategorySaga({ payload }) {
  try {
    const { data } = yield Api.deleteCategory(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(categories.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* editCategorySaga({ payload }) {
  try {
    const { data } = yield Api.editCategory(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(categories.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getProblemsSaga({ payload }) {
  try {
    const { data } = yield Api.getProblems(decamelizeKeys(payload));
    yield put(problems.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* createProblemSaga({ payload }) {
  try {
    const requestData = {
      solution: JSON.stringify(payload.solution[0]),
      solutions: JSON.stringify(payload.solution.filter((_, i) => i > 0)),
      categoryId: payload.category,
      colorOfUser: payload.colorOfUser,
      description: payload.description,
      fen: payload.fen,
      level: payload.level,
      title: payload.title,
      moveCount: payload.moves,
      priceComplete: payload.priceComplete,
      priceMistake: payload.priceMistake,
    };
    const { data } = yield Api.createProblem(decamelizeKeys(requestData));
    const { error, message } = data;
    if (error) {
      yield put(
        request.fail("Please fill all required fields to save problem")
      );
    } else {
      yield put(request.success(message));
      yield put(problems.request());
    }
    yield put(student.getResponse());
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* insertProblemSaga({ payload }) {
  try {
    const { data } = yield Api.insertProblems(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      yield put(
        request.fail("Please fill all required fields to save problem")
      );
    } else {
      yield put(request.success(message));
      yield put(problems.request());
    }
    yield put(student.getResponse());
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* deleteProblemSaga({ payload }) {
  try {
    const { data } = yield Api.deleteProblem(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
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
    yield put(student.getResponse());
  }
}

function* updateProblemSaga({ payload }) {
  try {
    const requestData = {
      solution: JSON.stringify(payload.solution[0]),
      solutions: JSON.stringify(payload.solution.filter((_, i) => i > 0)),
      categoryId: payload.category,
      colorOfUser: payload.colorOfUser,
      description: payload.description,
      id: payload.id,
      fen: payload.fen,
      level: payload.level,
      title: payload.title,
      movesCount: payload.moves,
      priceComplete: payload.priceComplete,
      priceMistake: payload.priceMistake,
    };
    const { data } = yield Api.editProblem(decamelizeKeys(requestData));
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(problems.request());
    }
    yield put(student.getResponse());
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getProblemSaga({ payload }) {
  try {
    const { data } = yield Api.getProblemData({ id: payload });
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(problems.set(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getStudentsSaga({ payload }) {
  try {
    const { data } = yield Api.getStudents(payload);
    yield put(student.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getStudentsStatisticsSaga({ payload }) {
  try {
    const { data } = yield Api.getStudentsStatistics(decamelizeKeys(payload));
    yield put(student.statisticsSuccess(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getAllStudentsSaga() {
  try {
    const data = yield Api.getAllStudents();
    yield put(student.allSuccess(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getStudentsActivity() {
  try {
    const { data } = yield Api.getStudentsActivity();
    yield put(student.setActivity(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* addStudentSaga({ payload }) {
  try {
    const { data } = yield Api.addStudent({ email: payload });
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(student.request({ page: 1 }));
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* deleteStudentSaga({ payload }) {
  try {
    const { data } = yield Api.deleteStudent(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(student.request({ page: 1 }));
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* setStudentsGroup({ payload }) {
  try {
    const { data } = yield Api.setStudentsGroup(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(student.request({ page: 1 }));
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getGroupsSaga() {
  try {
    const { data } = yield Api.getGroups();
    yield put(groups.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* createGroupSaga({ payload }) {
  try {
    const { data } = yield Api.createGroup(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(groups.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* deleteGroupSaga({ payload }) {
  try {
    const { data } = yield Api.deleteGroup(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(groups.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* editGroupSaga({ payload }) {
  try {
    const { data } = yield Api.editGroup(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
      yield put(groups.request());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getTrainingsSaga({ payload }) {
  try {
    const { data } = yield Api.getTrainings(payload);
    yield put(trainings.success(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getLastTrainingsSaga() {
  try {
    const { data } = yield Api.getLastTrainings();
    yield put(trainings.lastSuccess(camelizeKeys(data)));
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* createTrainingSaga({ payload }) {
  try {
    const { data } = yield Api.createTraining(decamelizeKeys(payload));
    const { error, message } = data;
    yield put(student.getResponse());
    if (error) {
      yield put(
        request.fail("Please fill all required fields to save problem")
      );
    } else {
      yield put(request.success(message));
      yield put(trainings.request({ page: 1 }));
    }
  } catch (error) {
    yield put(student.getResponse());
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* deleteTrainingSaga({ payload }) {
  try {
    const { data } = yield Api.deleteTraining(payload);
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
    } else {
      yield put(request.success(message));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* updateTrainingSaga({ payload }) {
  try {
    const { data } = yield Api.editTraining(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(trainings.request({ page: 1 }));
      yield put(request.success(message));
      yield put(student.getResponse());
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getTrainingSaga({ payload }) {
  try {
    const { data } = yield Api.getTrainingData({ id: payload });
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(trainings.set(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

function* getTrainingStatisticsSaga({ payload }) {
  try {
    const { data } = yield Api.getTrainingStatistics(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      yield put(request.fail(message));
      yield put(student.getResponse());
    } else {
      yield put(trainings.setStatistics(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: request.fail }));
    yield put(student.getResponse());
  }
}

export function* watchCoach() {
  yield takeLatest(categories.request, getCategoriesSaga);
  yield takeLatest(categories.data, getCategoriesDataSaga);
  yield takeLatest(categories.import, importCategoriesSaga);
  yield takeLatest(categories.create, createCategorySaga);
  yield takeLatest(categories.delete, deleteCategorySaga);
  yield takeLatest(categories.edit, editCategorySaga);
  yield takeLatest(allCategories.request, getPublicCategoriesSaga);

  yield takeLatest(problems.request, getProblemsSaga);
  yield takeLatest(problems.create, createProblemSaga);
  yield takeLatest(problems.insert, insertProblemSaga);
  yield takeLatest(problems.delete, deleteProblemSaga);
  yield takeLatest(problems.setFavorite, setFavoriteProblemSaga);
  yield takeLatest(problems.update, updateProblemSaga);
  yield takeLatest(problems.get, getProblemSaga);

  yield takeLatest(trainings.request, getTrainingsSaga);
  yield takeLatest(trainings.lastRequest, getLastTrainingsSaga);
  yield takeLatest(trainings.create, createTrainingSaga);
  yield takeLatest(trainings.delete, deleteTrainingSaga);
  yield takeLatest(trainings.update, updateTrainingSaga);
  yield takeLatest(trainings.get, getTrainingSaga);
  yield takeLatest(trainings.getStatistics, getTrainingStatisticsSaga);

  yield takeLatest(student.request, getStudentsSaga);
  yield takeLatest(student.requestStatistics, getStudentsStatisticsSaga);
  yield takeLatest(student.allRequest, getAllStudentsSaga);
  yield takeLatest(student.add, addStudentSaga);
  yield takeLatest(student.delete, deleteStudentSaga);
  yield takeLatest(student.getActivity, getStudentsActivity);
  yield takeLatest(student.setGroup, setStudentsGroup);

  yield takeLatest(groups.request, getGroupsSaga);
  yield takeLatest(groups.create, createGroupSaga);
  yield takeLatest(groups.delete, deleteGroupSaga);
  yield takeLatest(groups.edit, editGroupSaga);
}
