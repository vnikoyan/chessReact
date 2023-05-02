import { all } from "redux-saga/effects";

import { watchCommonLists } from "modules/common/saga";
import { watchErrors } from "modules/errors/saga";
import { watchLogin } from "modules/login/saga";
import { watchRecovery } from "modules/recovery/saga";
import { watchAuth } from "modules/auth/saga";
import { watchMe } from "modules/me/saga";
import { watchUser } from "modules/user/saga";
import { watchSettings } from "modules/settings/saga";
import { watchChat } from "modules/chat/saga";
import { watchPages } from "modules/pages/saga";
import { watchCoach } from "modules/coach/saga";
import { watchStudent } from "modules/student/saga";
import { watchGame } from "modules/game/saga";

export default function* rootSaga() {
  yield all([
    watchErrors(),
    watchLogin(),
    watchAuth(),
    watchRecovery(),
    watchMe(),
    watchUser(),
    watchCommonLists(),
    watchSettings(),
    watchChat(),
    watchPages(),
    watchCoach(),
    watchStudent(),
    watchGame(),
  ]);
}
