import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as loginAPI from "../../lib/api/login";
import { takeLatest } from "redux-saga/effects";

const INITIALIZE = "login/INITIALIZE_FORM";
const CHANGE_VALUE = "login/CHANGE_VALUE";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");
const [SEARCH_ID, SEARCH_ID_SUCCESS, SEARCH_ID_FAILURE] =
  createRequestActionTypes("auth/SEARCH_ID");
const [SEARCH_PWD, SEARCH_PWD_SUCCESS, SEARCH_PWD_FAILURE] =
  createRequestActionTypes("auth/SEARCH_PWD");
const [UPDATE_PWD, UPDATE_PWD_SUCCESS, UPDATE_PWD_FAILURE] =
  createRequestActionTypes("auth/UPDATE_PWD");
const PWD_CHECK = "auth/PWD_CHECK";

export const initializeLoginForm = createAction(INITIALIZE);
export const changeValue = createAction(CHANGE_VALUE);
export const login = createAction(LOGIN, ({ id, pwd }) => ({
  id,
  pwd,
}));
export const pwdChk = createAction(PWD_CHECK, ({ key, value }) => ({
  key,
  value,
}));
export const onSearchId = createAction(SEARCH_ID, ({ phone }) => ({
  phone,
}));
export const onSearchPwd = createAction(SEARCH_PWD, ({ email, phone }) => ({
  email,
  phone,
}));
export const updatePwd = createAction(UPDATE_PWD, ({ email, pwd }) => ({
  email,
  pwd,
}));

const loginProcess = createRequestSaga(LOGIN, loginAPI.login);
const searchIdProcess = createRequestSaga(SEARCH_ID, loginAPI.searchId);
const searchPwdProcess = createRequestSaga(SEARCH_PWD, loginAPI.searchPwd);
const changePwdProcess = createRequestSaga(UPDATE_PWD, loginAPI.updatePwd);

export function* loginSaga() {
  yield takeLatest(LOGIN, loginProcess);
  yield takeLatest(SEARCH_ID, searchIdProcess);
  yield takeLatest(SEARCH_PWD, searchPwdProcess);
  yield takeLatest(UPDATE_PWD, changePwdProcess);
}

const initialState = {
  id: null,
  pwd: null,
  pwdConfirm: null,
  pwdAuth: null,
  pwdError: null,
  email: null,
  phone: null,
  auth: null,
  authError: null,
  searchId: null,
  seacchIdError: null,
  searchPwd: null,
  searchPwdError: null,
};

const LoginMod = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_VALUE]: (state, { payload: { value, key } }) => ({
      ...state,
      [key]: value,
    }),
    [LOGIN_SUCCESS]: (state, { payload: { auth } }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: { authError } }) => ({
      ...state,
      authError,
    }),
    [PWD_CHECK]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [SEARCH_ID_SUCCESS]: (state, { payload: { searchId } }) => ({
      ...state,
      searchId,
      searchIdError: null,
    }),
    [SEARCH_ID_FAILURE]: (state, { payload: { searchIdError } }) => ({
      ...state,
      searchId: null,
      searchIdError,
    }),
    [SEARCH_PWD_SUCCESS]: (state, { payload: { searchPwd } }) => ({
      ...state,
      searchPwd,
      searchPwdError: null,
    }),
    [SEARCH_PWD_FAILURE]: (state, { payload: { searchPwdError } }) => ({
      ...state,
      searchPwd: null,
      searchPwdError,
    }),
    [UPDATE_PWD_SUCCESS]: (state, { payload: { pwdAuth } }) => ({
      ...state,
      pwdAuth,
      pwdError: null,
    }),
    [UPDATE_PWD_FAILURE]: (state, { payload: { pwdError } }) => ({
      ...state,
      pwdAuth: null,
      pwdError,
    }),
  },
  initialState
);

export default LoginMod;
