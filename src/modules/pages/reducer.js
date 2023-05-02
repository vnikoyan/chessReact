import { createReducer } from "deox";
import produce from "immer";

import { list, view } from "./actions";

const iniritalState = {
  leftPagesList: [],
  topPagesList: [],
  bottomPagesList: [],
  pageView: {},
  loading: false,
};

export const pagesReducer = createReducer(iniritalState, (handle) => [
  handle(list.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(list.successLeft, (state, { payload }) =>
    produce(state, (draft) => {
      draft.leftPagesList = payload;
      draft.loading = false;
    })
  ),
  handle(list.successTop, (state, { payload }) =>
    produce(state, (draft) => {
      draft.topPagesList = payload;
      draft.loading = false;
    })
  ),
  handle(list.successBottom, (state, { payload }) =>
    produce(state, (draft) => {
      draft.bottomPagesList = payload;
      draft.loading = false;
    })
  ),
  handle(list.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
  handle(view.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(view.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.pageView = payload;
      draft.loading = false;
    })
  ),
  handle(view.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
]);
