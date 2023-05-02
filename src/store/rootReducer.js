import { combineReducers } from "redux";

import { commonListsReducer } from "modules/common/reducer";
import { loginReducer } from "modules/login/reducer";
import { recoveryReducer } from "modules/recovery/reducer";
import { authReducer } from "modules/auth/reducer";
import { meReducer } from "modules/me/reducer";
import { userReducer } from "modules/user/reducer";
import { settingsReducer } from "modules/settings/reducer";
import { chatReducer } from "modules/chat/reducer";
import { pagesReducer } from "modules/pages/reducer";
import { coachReducer } from "modules/coach/reducer";
import { studentReducer } from "modules/student/reducer";
import { messagesReducer } from "modules/messages/reducer";
import { gameReducer } from "modules/game/reducer";

const rootReducer = combineReducers({
  common: commonListsReducer,
  login: loginReducer,
  recovery: recoveryReducer,
  me: meReducer,
  user: userReducer,
  auth: authReducer,
  settings: settingsReducer,
  chat: chatReducer,
  pages: pagesReducer,
  coach: coachReducer,
  student: studentReducer,
  messages: messagesReducer,
  game: gameReducer,
});

export default rootReducer;
