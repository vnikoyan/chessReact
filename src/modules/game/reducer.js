import { createReducer } from "deox";
import produce from "immer";

import { game, matchroom, room } from "./actions";
import { camelizeKeys, decamelizeKeys } from "humps";

const initialState = {
  myMatch: false,
  myMatchroom: false,
  myRoom: false,
  loading: false,
  started: false,
  ended: false,
  winner: {},
  mySide: "",
  myOpponent: {},
  me: {},
  moves: [],
  roomList: [],
  roomTotal: 0,
};

export const gameReducer = createReducer(initialState, (handle) => [
  handle(game.getMyMatch, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(game.getMyMatchSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.myMatch = payload;
      draft.loading = false;
    })
  ),
  handle(game.getMyMatchFail, (state) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
  handle(room.getListSuccess, (state, { payload }) =>
    produce(state, (draft) => {
      draft.roomList = payload.data;
      draft.roomTotal = payload.total;
      draft.loading = false;
    })
  ),
  handle(game.getGame, (state, { payload: { data } }) =>
    produce(state, (draft) => {
      draft.myMatch = data;
      draft.mySide = data.side;
      draft.ended = data.isEnded;
      draft.myOpponent = data.side === "white" ? data.player2 : data.player1;
      draft.me = data.side === "white" ? data.player1 : data.player2;
      draft.started = data.player2 && data.player1 ? true : false;
      draft.moves = data.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(matchroom.getMatchroom, (state, { payload: { data } }) =>
    produce(state, (draft) => {
      draft.myMatchroom = camelizeKeys(data);
      draft.mySide = data.side;
      draft.ended = data.isEnded;
      draft.myOpponent = data.side === "white" ? data.player2 : data.player1;
      draft.me = data.side === "white" ? data.player1 : data.player2;
      draft.started = data.player2 && data.player1 ? true : false;
      draft.moves = data.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(room.getRoom, (state, { payload }) =>
    produce(state, (draft) => {
      draft.myRoom = camelizeKeys(payload);
      draft.mySide = payload.side;
      draft.ended = payload.isEnded;
      draft.myOpponent =
        payload.side === "white" ? payload.player2 : payload.player1;
      draft.me = payload.side === "white" ? payload.player1 : payload.player2;
      draft.started = payload.player2 && payload.player1 ? true : false;
      draft.moves = payload.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(matchroom.updateMatchroom, (state, { data: { data } }) =>
    produce(state, (draft) => {
      draft.myMatchroom = camelizeKeys(data);
      draft.ended = data.is_ended;
      draft.winner = data.winner;
      draft.started = data.player2 && data.player1 ? true : false;
      draft.myOpponent = state.mySide === "white" ? data.player2 : data.player1;
      draft.me = state.mySide === "white" ? data.player1 : data.player2;
      draft.moves = data.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(game.updateGame, (state, { data: { data } }) =>
    produce(state, (draft) => {
      draft.myMatch = data;
      draft.ended = data.is_ended;
      draft.winner = data.winner;
      draft.started = data.player2 && data.player1 ? true : false;
      draft.myOpponent = state.mySide === "white" ? data.player2 : data.player1;
      draft.me = state.mySide === "white" ? data.player1 : data.player2;
      draft.moves = data.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(room.updateRoom, (state, { data: { data } }) =>
    produce(state, (draft) => {
      draft.myRoom = camelizeKeys(data);
      draft.ended = data.is_ended;
      draft.winner = data.winner;
      draft.started = data.player2 && data.player1 ? true : false;
      draft.myOpponent = state.mySide === "white" ? data.player2 : data.player1;
      draft.me = state.mySide === "white" ? data.player1 : data.player2;
      draft.moves = data.moves.map((move) => JSON.parse(move.move));
    })
  ),
  handle(game.endGame, (state, { data }) =>
    produce(state, (draft) => {
      draft.myMatch = false;
      draft.myMatchroom = false;
      draft.myRoom = false;
      draft.loading = false;
      draft.started = false;
      draft.ended = false;
      draft.winner = {};
      draft.mySide = "";
      draft.myOpponent = {};
      draft.me = {};
      draft.moves = [];
      // draft = initialState;
    })
  ),
]);
