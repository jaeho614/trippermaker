import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as postsAPI from "../../lib/api/main";
import { takeLatest } from "redux-saga/effects";

const [MAIN_LIST_POSTS, MAIN_LIST_POSTS_SUCCESS, MAIN_LIST_POSTS_FAILURE] =
  createRequestActionTypes("main/MAIN_LIST_POSTS");
const [GET_MAIN_STYLE, GET_MAIN_STYLE_SUCCESS, GET_MAIN_STYLE_FAILURE] =
  createRequestActionTypes("main/GET_MAIN_STYLE");
const [GET_MAIN_TERMS, GET_MAIN_TERMS_SUCCESS, GET_MAIN_TERMS_FAILURE] =
  createRequestActionTypes("main/GET_MAIN_TERMS");
const [GET_MAIN_INFORM, GET_MAIN_INFORM_SUCCESS, GET_MAIN_INFORM_FAILURE] =
  createRequestActionTypes("main/GET_MAIN_INFORM");

export const mainlistPosts = createAction(MAIN_LIST_POSTS);
export const getMainStyle = createAction(GET_MAIN_STYLE);
export const getMainTerms = createAction(GET_MAIN_TERMS, ({ type }) => ({
  type,
}));
export const getMainInform = createAction(GET_MAIN_INFORM);

const mainListPostsSaga = createRequestSaga(
  MAIN_LIST_POSTS,
  postsAPI.mainListPosts
);
const getMainStyleSaga = createRequestSaga(
  GET_MAIN_STYLE,
  postsAPI.getMainStyle
);
const getMainTermsSaga = createRequestSaga(
  GET_MAIN_TERMS,
  postsAPI.getMainTerms
);
const getMainInformSaga = createRequestSaga(
  GET_MAIN_INFORM,
  postsAPI.getMainInform
);

export function* mainSaga() {
  yield takeLatest(MAIN_LIST_POSTS, mainListPostsSaga);
  yield takeLatest(GET_MAIN_STYLE, getMainStyleSaga);
  yield takeLatest(GET_MAIN_TERMS, getMainTermsSaga);
  yield takeLatest(GET_MAIN_INFORM, getMainInformSaga);
}

const initialState = {
  posts: null,
  error: null,
  mainStyle: {},
  styleError: null,
  mainTerms: null,
  mainTermsError: null,
  mainInform: {},
  mainInformError: null,
};

const MainMod = handleActions(
  {
    [MAIN_LIST_POSTS_SUCCESS]: (state, { payload: posts }) => ({
      ...state,
      posts,
      error: null,
    }),
    [MAIN_LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: null,
      error,
    }),
    [GET_MAIN_STYLE_SUCCESS]: (state, { payload: { mainStyle } }) => ({
      ...state,
      mainStyle,
      styleError: null,
    }),
    [GET_MAIN_STYLE_FAILURE]: (state, { payload: { styleError } }) => ({
      ...state,
      mainStyle: null,
      styleError,
    }),
    [GET_MAIN_TERMS_SUCCESS]: (state, { payload: { mainTerms } }) => ({
      ...state,
      mainTerms,
      mainTermsError: null,
    }),
    [GET_MAIN_TERMS_FAILURE]: (state, { payload: { mainTermsError } }) => ({
      ...state,
      mainTerms: null,
      mainTermsError,
    }),
    [GET_MAIN_INFORM_SUCCESS]: (state, { payload: { mainInform } }) => ({
      ...state,
      mainInform,
      mainInformError: null,
    }),
    [GET_MAIN_INFORM_FAILURE]: (state, { payload: { mainInformError } }) => ({
      ...state,
      mainInform: null,
      mainInformError,
    }),
  },
  initialState
);

export default MainMod;
