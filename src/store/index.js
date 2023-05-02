import { createStore, applyMiddleware, compose } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

import { DEVELOPMENT_MODE, NODE_ENV } from "configs";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { configurePusher } from "pusher-redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["common", "auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let composeEnhancers = compose;

if (NODE_ENV === DEVELOPMENT_MODE) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const options = {
  cluster: "eu",
};
configurePusher(store, "0f7428ca6049a7c8cfb2", options);
// persistor.purge();
