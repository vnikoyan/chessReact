import { createReducer } from "deox";
import produce from "immer";

import { dialogs, messages, send } from "./actions";

const iniritalState = {
  dialogList: [],
  chatMessages: [],
  loading: false,
};

export const chatReducer = createReducer(iniritalState, (handle) => [
  handle(dialogs.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(dialogs.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.dialogList = payload;
      draft.loading = false;
    })
  ),
  handle(dialogs.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      // draft.error = payload;
    })
  ),
  handle(messages.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(messages.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.chatMessages = payload.reverse();
      draft.loading = false;
    })
  ),
  handle(messages.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      // draft.error = payload;
    })
  ),

  handle(send.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(send.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
    })
  ),
  handle(send.fail, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      // draft.error = payload;
    })
  ),
]);
