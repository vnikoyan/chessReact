import { createAction } from "deox";

export const game = {
  getMyMatch: createAction("game/GET_MY_MATCH", (res) => (payload) =>
    res(payload)
  ),
  getMyMatchSuccess: createAction(
    "game/GET_MY_MATCH_SUCCESS",
    (res) => (payload) => res(payload)
  ),
  getMyMatchFail: createAction("game/GET_MY_MATCH_FAIL"),
  joinMatch: createAction("game/JOIN_TO_MATCH", (res) => (data) => res(data)),
  joinMatchSuccess: createAction(
    "game/JOIN_TO_MATCH_SUCCESS",
    (res) => (payload) => res(payload)
  ),
  joinMatchFail: createAction("game/JOIN_TO_MATCH_FAIL"),
  setMove: createAction("game/SET_MOVE", (res) => (data) => res(data)),
  getGame: createAction("game/GET_GAME", (res) => (data) => res(data)),
  updateGame: createAction("game/UPDATE_GAME", (res) => (data) => res(data)),
  win: createAction("game/WIN", (res) => (data) => res(data)),
  lose: createAction("game/LOSE", (res) => (data) => res(data)),
  endGame: createAction("game/END_GAME"),
  cancelGame: createAction("game/CANCEL_GAME"),
};

export const matchroom = {
  createMatchroom: createAction("matchroom/CREATE_MATCHROOM", (res) => (data) =>
    res(data)
  ),
  getMatchroom: createAction("matchroom/GET_MATCHROOM", (res) => (data) =>
    res(data)
  ),
  joinMatchroom: createAction("matchroom/JOIN_MATCHROOM", (res) => (data) =>
    res(data)
  ),
  updateMatchroom: createAction("matchroom/UPDATE_MATCHROOM", (res) => (data) =>
    res(data)
  ),
};

export const room = {
  create: createAction("room/CREATE_ROOM", (res) => (data) => res(data)),
  join: createAction("room/JOIN_ROOM", (res) => (data) => res(data)),
  getRoom: createAction("room/GET_ROOM", (res) => (data) => res(data)),
  updateRoom: createAction("room/UPDATE_ROOM", (res) => (data) => res(data)),
  getList: createAction("room/GET_ROOM_LIST", (res) => (data) => res(data)),
  getListSuccess: createAction("room/GET_ROOM_LIST_SUCCESS", (res) => (data) =>
    res(data)
  ),
};
