import { createAction, handleActions } from "redux-actions";
import * as loginAPI from "../../lib/api/login";
import { call, takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";

const INITIALIZE_USER = "user/INITIALIZE_USER";
const TEMP_SET_USER = "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes("user/CHECK");
const LOGOUT = "login/LOGOUT";

export const initializeUser = createAction(INITIALIZE_USER);
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, loginAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem("USER");
  } catch (e) {
    console.log("localStorage is not working");
  }
}

function* logoutSaga() {
  try {
    yield call(loginAPI.logout);
    localStorage.removeItem("USER");
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  user: null,
  checkError: null,
  replyUser: null,
};

const UserMod = handleActions(
  {
    [INITIALIZE_USER]: state => initialState,
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: { checkError } }) => ({
      ...state,
      user: null,
      checkError,
    }),
    [LOGOUT]: state => ({
      ...state,
      user: null,
    }),
  },
  initialState
);

export default UserMod;
