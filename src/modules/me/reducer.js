import { createReducer } from "deox";
import produce from "immer";

import { profile, settings, notifications } from "./actions";

const initialState = {
  id: undefined,
  email: undefined,
  avatar: undefined,
  updatedAt: undefined,
  createdAt: undefined,
  username: undefined,
  allAwards: [],
  notifications: [],
  settingsError: null,
  settingsSuccessMessage: null,
  loading: false,
  isLoaded: false,
  error: null,
};

export const meReducer = createReducer(initialState, (handle) => [
  handle(profile.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
      draft.error = null;
    })
  ),
  handle(profile.success, (state, { payload }) => ({
    ...state,
    ...payload,
    isLoaded: true,
    loading: false,
    error: null,
  })),
  handle(settings.setGeneral, (state, { payload }) =>
    produce(state, (draft) => {
      draft.city = payload.city;
      draft.country.id = payload.country;
      draft.name = payload.name;
      draft.username = payload.username;
      draft.email = payload.email;
    })
  ),
  handle(settings.setAdditional, (state, { payload }) =>
    produce(state, (draft) => {
      draft.about = payload.about;
      draft.board = payload.board;
      draft.level = payload.level;
      draft.skype = payload.skype;
      draft.whatsapp = payload.whatsapp;
    })
  ),
  handle(settings.setNewAvatar, (state, { payload }) =>
    produce(state, (draft) => {
      draft.avatar = payload;
    })
  ),
  handle(notifications.request, (state) =>
    produce(state, (draft) => {
      // draft.loading = true;
    })
  ),
  handle(notifications.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.notifications = payload;
    })
  ),
]);
