import axios from "axios";
// import jwtDecode, { JwtPayload } from 'jwt-decode';

import { API_SERVER_URL } from "configs";
import { refreshTokens } from "modules/auth/actions";

let isAlreadyFetchingAccessToken = false;
// This is the list of waiting requests that will retry after the JWT refresh complete
const subscribers = [];

function onAccessTokenFetched(accessToken) {
  // When the refresh is successful, we start retrying the requests one by one and empty the queue
  subscribers.forEach((callback) => callback(accessToken));
  subscribers.splice(0, subscribers.length);
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

async function resetTokenAndReattemptRequest(error, myStore) {
  // eslint-disable-next-line no-console
  // console.log('Reset Token And Reattempt Request');
  try {
    const { response: errorResponse } = error;
    const { refresh } = myStore.getState().login;

    if (!errorResponse || !refresh) {
      // We can't refresh, throw the error anyway
      return Promise.reject(error);
    }
    /* Proceed to the token refresh procedure
        We create a new Promise that will retry the request,
        clone all the request configuration from the failed
        request in the error object. */
    const retryOriginalRequest = new Promise((resolve) => {
      /* We need to add the request retry to the queue
        since there another request that already attempt to
        refresh the token */
      addSubscriber((accessToken) => {
        errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
        resolve(axios(errorResponse.config));
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      const response = await axios({
        method: "post",
        url: `${API_SERVER_URL}refresh`,
        data: { refresh },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.data) {
        return Promise.reject(error);
      }

      const newTokens = response.data;
      myStore.dispatch(refreshTokens(newTokens));

      isAlreadyFetchingAccessToken = false;

      onAccessTokenFetched(newTokens.access);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function isTokenExpiredError(errorResponse, tokens) {
  // console.log('isTokenExpiredError', tokens);
  if (!errorResponse || !tokens.access || !tokens.refresh) {
    return false;
  }

  // const token = jwtDecode<JwtPayload>(tokens.access);
  // const refreshToken = jwtDecode<JwtPayload>(tokens.refresh);
  // const d = new Date();
  // const today = d.getTime() / 1000;
  // const shouldRefresh =
  //   typeof token.exp === 'number' &&
  //   token.exp < today &&
  //   typeof refreshToken.exp === 'number' &&
  //   refreshToken.exp > today;

  return errorResponse.status === 403 || errorResponse.status === 401;
}

export const refreshTokenIfNeeded = (error, myStore) => {
  // console.log('refreshTokenIfNeeded');
  const errorResponse = error.response;

  // eslint-disable-next-line no-console
  // console.log('errorResponse', errorResponse);

  const { access, refresh } = myStore.getState().login;
  const tokens = { access, refresh };

  if (isTokenExpiredError(errorResponse, tokens)) {
    return resetTokenAndReattemptRequest(error, myStore);
  }
  // If the error is due to other reasons, we just throw it back to axios
  return Promise.reject(error);
};
