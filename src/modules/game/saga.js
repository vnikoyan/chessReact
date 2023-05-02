import { takeLatest, put } from "redux-saga/effects";
import { subscribe, unsubscribe } from "pusher-redux";
import { Api } from "api";
import { processRequestError } from "modules/errors";
import { camelizeKeys, decamelizeKeys } from "humps";

import { game, matchroom, room } from "./actions";

function* getMyMatchSaga({ payload }) {
  try {
    const { data } = yield Api.getMyMatch(payload);
    const { error, message } = data;
    if (error) {
      yield put(game.getMyMatchFail({ message: message }));
    } else {
      yield put(game.getMyMatchSuccess(camelizeKeys(data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* joinMatchSaga({ payload }) {
  try {
    const { data } = yield Api.joinMatch(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      subscribe(`game-${data.data.token}`, "my-event", "game/UPDATE_GAME");
      yield put(game.getGame(camelizeKeys(data)));
      // yield put(game.joinMatchSuccess(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* setMoveSaga({ payload }) {
  try {
    const { data } = yield Api.setMove(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      // console.log(data)
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* loseSaga({ payload }) {
  try {
    const { data } = yield Api.lose(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      console.log(data.data.id);
      // console.log(data)
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* winSaga({ payload }) {
  try {
    const { data } = yield Api.win(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      console.log(data.data.id);
      // console.log(data)
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* createMatchroomSaga({ payload }) {
  try {
    const { data } = yield Api.createMatchroom(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      subscribe(
        `game-${data.data.token}`,
        "my-event",
        "matchroom/UPDATE_MATCHROOM"
      );
      yield put(matchroom.getMatchroom(camelizeKeys(data)));
      // console.log(data)
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* joinMatchroomSaga({ payload }) {
  try {
    const { data } = yield Api.joinMatchroom(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      subscribe(
        `game-${data.data.token}`,
        "my-event",
        "matchroom/UPDATE_MATCHROOM"
      );
      yield put(matchroom.getMatchroom(camelizeKeys(data)));
      // yield put(game.joinMatchSuccess(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* createRoomSaga({ payload }) {
  try {
    const { data } = yield Api.createRoom(decamelizeKeys(payload));
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      yield put(room.getList({ page: 1 }));
      yield put(room.getRoom(camelizeKeys(data)));
      console.log(data.token);
      subscribe(`game-${data.token}`, "my-event", "room/UPDATE_ROOM");
      // console.log(data)
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* joinRoomSaga({ payload }) {
  try {
    const { data } = yield Api.joinRoom(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      console.log(data.data.token);
      subscribe(`game-${data.data.token}`, "my-event", "room/UPDATE_ROOM");
      yield put(room.getRoom(camelizeKeys(data.data)));
      // yield put(game.joinMatchSuccess(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

function* getRoomListSaga({ payload }) {
  try {
    const { data } = yield Api.getRoomList(payload);
    const { error, message } = data;
    if (error) {
      console.log(error);
    } else {
      subscribe(`room-list`, "update", "room/GET_ROOM_LIST");
      yield put(room.getListSuccess(camelizeKeys(data)));
      // yield put(game.joinMatchSuccess(camelizeKeys(data.data)));
    }
  } catch (error) {
    yield put(processRequestError({ error, failAction: game.fail }));
  }
}

export function* watchGame() {
  yield takeLatest(game.getMyMatch, getMyMatchSaga);
  yield takeLatest(game.joinMatch, joinMatchSaga);
  yield takeLatest(game.setMove, setMoveSaga);
  yield takeLatest(game.lose, loseSaga);
  yield takeLatest(game.win, winSaga);

  yield takeLatest(matchroom.createMatchroom, createMatchroomSaga);
  yield takeLatest(matchroom.joinMatchroom, joinMatchroomSaga);

  yield takeLatest(room.create, createRoomSaga);
  yield takeLatest(room.join, joinRoomSaga);
  yield takeLatest(room.getList, getRoomListSaga);
}
