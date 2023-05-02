import { createReducer } from "deox";
import produce from "immer";

import { getCountries, getCities, getAlerts } from "./actions";

const initialState = {
  alerts: [],
  countries: [],
  cities: [],
  decisionTime: [
    {
      value: "0",
      label: "No",
    },
    {
      value: "30",
      label: "30 seconds",
    },
    {
      value: "60",
      label: "1 minute",
    },
    {
      value: "120",
      label: "2 minutes",
    },
    {
      value: "180",
      label: "3 minutes",
    },
    {
      value: "240",
      label: "4 minutes",
    },
    {
      value: "300",
      label: "5 minutes",
    },
    {
      value: "420",
      label: "7 minutes",
    },
    {
      value: "600",
      label: "10 minutes",
    },
    {
      value: "900",
      label: "15 minutes",
    },
    {
      value: "1200",
      label: "20 minutes",
    },
    {
      value: "1500",
      label: "25 minutes",
    },
    {
      value: "1800",
      label: "30 minutes",
    },
  ],
  difficulty: [
    {
      value: "1",
      label: "1 (Low)",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
    {
      value: "6",
      label: "6",
    },
    {
      value: "7",
      label: "7",
    },
    {
      value: "8",
      label: "8",
    },
    {
      value: "9",
      label: "9",
    },
    {
      value: "10",
      label: "10 (High)",
    },
  ],
  boards: [
    { value: 0, name: "Default" },
    { value: 1, name: "Combination 1" },
    { value: 2, name: "Combination 2" },
    { value: 3, name: "Combination 3" },
    { value: 4, name: "Combination 4" },
    { value: 5, name: "Combination 5" },
    { value: 6, name: "Combination 6" },
    { value: 7, name: "Combination 7" },
  ],
  knowledges: [
    {
      value: 1,
      name: "Level 1 - Zero. Knowledge of moves and rules. And that's all.",
    },
    {
      value: 2,
      name: "Level 2 - Beginner. Between 3 Jun. and 1 Jun. discharge.",
    },
    { value: 3, name: "Level 3 - Basic. Between 3 s. and 1 bt. discharge." },
    { value: 4, name: "Level 4 - Advanced. Between 1 s. and KM / C" },
    {
      value: 5,
      name: "Level 5. - High. From the International Master and above.",
    },
  ],
  loading: false,
};

export const commonListsReducer = createReducer(initialState, (handle) => [
  handle(getCountries.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(getCountries.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.countries = payload;
    })
  ),
  handle(getCities.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(getCities.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.cities = payload.data;
    })
  ),
  handle(getAlerts.request, (state) =>
    produce(state, (draft) => {
      draft.loading = true;
    })
  ),
  handle(getAlerts.success, (state, { payload }) =>
    produce(state, (draft) => {
      draft.loading = false;
      draft.alerts = payload.data;
    })
  ),
]);
