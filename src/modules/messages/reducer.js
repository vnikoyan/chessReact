import { createReducer } from "deox";
import produce from "immer";

import { request } from "./actions";

const iniritalState = {
  successMessage: false,
  errorMessage: false,
  message: "",
  loading: false,
};

export const messagesReducer = createReducer(iniritalState, (handle) => [
  handle(request.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.successMessage = false;
      draft.errorMessage = payload;
      draft.loading = false;
    })
  ),
  handle(request.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.errorMessage = false;
      draft.successMessage = payload;
      draft.loading = false;
    })
  ),
  handle(request.clear, (state) =>
    produce(state, (draft) => {
      draft.errorMessage = false;
      draft.successMessage = false;
    })
  ),
]);
