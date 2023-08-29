import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import { call, put, takeLatest } from "redux-saga/effects";
import * as profileAPI from "../../lib/api/profile";

const INITIALIZE_PROFILE = "profile/INITIALIZE_PROFILE";
const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes("profile/GET_PROFILE");
const [CHANGE_PROFILE, CHANGE_PROFILE_SUCCESS, CHANGE_PROFILE_FAILURE] =
  createRequestActionTypes("profile/CHANGE_PROFILE");
const NICKERROR_CLEAR = "profile/NICKERROR_CLEAR";
const CHANGE_VALUE = "profile/CHANGE_VALUE";
const [NICK_CHECK, NICK_CHECK_SUCCESS, NICK_CHECK_FAILURE] =
  createRequestActionTypes("profile/NICK_CHECK");
const CHANGE_PHOTO_SUCCESS = "profile/CHANGE_PHOTO_SUCCESS";
const CHANGE_PHOTO_FAILURE = "profile/CHANGE_PHOTO_FAILURE";
const [WITHDRAW, WITHDRAW_SUCCESS, WITHDRAW_FAILURE] =
  createRequestActionTypes("profile/WITHDRAW");

export const initializeProfile = createAction(INITIALIZE_PROFILE);
export const getProfile = createAction(GET_PROFILE);
export const changeProfile = createAction(CHANGE_PROFILE, ({ id, nick }) => ({
  id,
  nick,
}));
export const nickErrorClear = createAction(NICKERROR_CLEAR);
export const changeValue = createAction(CHANGE_VALUE, ({ value }) => ({
  value,
}));
export const nickChk = createAction(NICK_CHECK, ({ nick }) => ({
  nick,
}));
export const changePhotoSuccess = createAction(
  CHANGE_PHOTO_SUCCESS,
  ({ img }) => ({
    img,
  })
);
export const changePhotoFailure = createAction(
  CHANGE_PHOTO_FAILURE,
  ({ imgError }) => ({
    imgError,
  })
);
export const withdraw = createAction(WITHDRAW, ({ id }) => ({ id }));

const getProfileProcess = createRequestSaga(GET_PROFILE, profileAPI.getProfile);
const changeProfileProcess = createRequestSaga(
  CHANGE_PROFILE,
  profileAPI.changeProfile
);
export const nickChkProcess = createRequestSaga(NICK_CHECK, profileAPI.nickChk);

function* withdrawProcess(action) {
  try {
    const response = yield call(profileAPI.withdraw, action.payload);
    yield put({
      type: WITHDRAW_SUCCESS,
      payload: response?.data,
    });
    localStorage.removeItem("USER");
  } catch (e) {
    yield put({
      type: WITHDRAW_FAILURE,
      payload: e?.response?.data,
      error: true,
    });
  }
}

//게시물
const [GET_BOARD_LIST, GET_BOARD_LIST_SUCCESS, GET_BOARD_LIST_FAILURE] =
  createRequestActionTypes("profile/GET_BOARD_LIST");
const [DELETE_BOARD, DELETE_BOARD_SUCCESS, DELETE_BOARD_FAILURE] =
  createRequestActionTypes("profile/DELETE_BOARD");

export const getBoardList = createAction(GET_BOARD_LIST);
export const deleteBoard = createAction(DELETE_BOARD, ({ no }) => ({ no }));

const getBoardListProcess = createRequestSaga(
  GET_BOARD_LIST,
  profileAPI.getBoardList
);
const deleteBoardProcess = createRequestSaga(
  DELETE_BOARD,
  profileAPI.deleteBoard
);

//댓글
const [GET_REPLY_LIST, GET_REPLY_LIST_SUCCESS, GET_REPLY_LIST_FAILURE] =
  createRequestActionTypes("profile/GET_REPLY_LIST");
const [DELETE_REPLY, DELETE_REPLY_SUCCESS, DELETE_REPLY_FAILURE] =
  createRequestActionTypes("profile/DELETE_REPLY");

export const getReplyList = createAction(GET_REPLY_LIST);
export const deleteReply = createAction(DELETE_REPLY, ({ no }) => ({ no }));

const getReplyListProcess = createRequestSaga(
  GET_REPLY_LIST,
  profileAPI.getReplyList
);
const deleteReplyProcess = createRequestSaga(
  DELETE_REPLY,
  profileAPI.deleteReply
);
//좋아요
const [GET_LIKE_LIST, GET_LIKE_LIST_SUCCESS, GET_LIKE_LIST_FAILURE] =
  createRequestActionTypes("profile/GET_LIKE_LIST");
const [DELETE_LIKE, DELETE_LIKE_SUCCESS, DELETE_LIKE_FAILURE] =
  createRequestActionTypes("profile/DELETE_LIKE");

export const getLikeList = createAction(GET_LIKE_LIST);
export const deleteLike = createAction(DELETE_LIKE, ({ no }) => ({ no }));

const getLikeListProcess = createRequestSaga(
  GET_LIKE_LIST,
  profileAPI.getLikeList
);
const deleteLikeProcess = createRequestSaga(DELETE_LIKE, profileAPI.deleteLike);
//wishlist
const [GET_WISH_LIST, GET_WISH_LIST_SUCCESS, GET_WISH_LIST_FAILURE] =
  createRequestActionTypes("profile/GET_WISH_LIST");
const [GET_WISH_DETAIL, GET_WISH_DETAIL_SUCCESS, GET_WISH_DETAIL_FAILURE] =
  createRequestActionTypes("profile/GET_WISH_DETAIL");
const [DELETE_WISH, DELETE_WISH_SUCCESS, DELETE_WISH_FAILURE] =
  createRequestActionTypes("profile/DELETE_WISH");
const WISH_DETAIL_CLEAR = "profile/WISH_DETAIL_CLEAR";

export const getWishList = createAction(GET_WISH_LIST);
export const getWishDetail = createAction(
  GET_WISH_DETAIL,
  ({ title, contentId, contentTypeId }) => ({
    title,
    contentId,
    contentTypeId,
  })
);
export const deleteWish = createAction(DELETE_WISH, ({ no }) => ({ no }));
export const wishDetailClear = createAction(WISH_DETAIL_CLEAR);

const getWishListProcess = createRequestSaga(
  GET_WISH_LIST,
  profileAPI.getWishList
);
const getWishDetailProcess = createRequestSaga(
  GET_WISH_DETAIL,
  profileAPI.getWishDetail
);
const deleteWishProcess = createRequestSaga(DELETE_WISH, profileAPI.deleteWish);

export function* ProfileSaga() {
  yield takeLatest(GET_PROFILE, getProfileProcess);
  yield takeLatest(CHANGE_PROFILE, changeProfileProcess);
  yield takeLatest(NICK_CHECK, nickChkProcess);
  yield takeLatest(WITHDRAW, withdrawProcess);
  yield takeLatest(GET_BOARD_LIST, getBoardListProcess);
  yield takeLatest(DELETE_BOARD, deleteBoardProcess);
  yield takeLatest(GET_REPLY_LIST, getReplyListProcess);
  yield takeLatest(DELETE_REPLY, deleteReplyProcess);
  yield takeLatest(GET_LIKE_LIST, getLikeListProcess);
  yield takeLatest(DELETE_LIKE, deleteLikeProcess);
  yield takeLatest(GET_WISH_LIST, getWishListProcess);
  yield takeLatest(GET_WISH_DETAIL, getWishDetailProcess);
  yield takeLatest(DELETE_WISH, deleteWishProcess);
}

const initialState = {
  user: null,
  userError: null,

  nick: null,
  nickAuth: null,
  nickError: null,

  img: null,
  imgError: null,

  withdrawAuth: null,
  withdrawError: null,

  boardList: [],
  totalBoard: null,
  boardListError: null,
  deleteBoardError: null,

  replyList: [],
  totalReply: null,
  replyListError: null,
  deleteReplyError: null,

  likeList: [],
  totalLike: null,
  likeListError: null,
  deleteLikeError: null,

  wishList: [],
  totalWish: null,
  wishListError: null,
  wish: null,
  wishError: null,
  deleteWishError: null,
};

const ProfileMod = handleActions(
  {
    [INITIALIZE_PROFILE]: state => initialState,
    [GET_PROFILE_SUCCESS]: (state, { payload: { user } }) => ({
      ...state,
      user,
      userError: null,
      nickAuth: null,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: { userError } }) => ({
      ...state,
      user: null,
      userError,
      nickAuth: null,
    }),
    //changeProfile
    [CHANGE_PROFILE_SUCCESS]: (state, { payload: { nick } }) => ({
      ...state,
      nick,
      nickAuth: null,
      nickError: null,
    }),
    [CHANGE_PROFILE_FAILURE]: (state, { payload: { nickError } }) => ({
      ...state,
      nick: null,
      nickAuth: null,
      nickError,
    }),
    [NICKERROR_CLEAR]: state => ({
      ...state,
      nickAuth: null,
      nickError: null,
    }),
    [CHANGE_VALUE]: (state, { payload: { value } }) => ({
      ...state,
      nick: value,
    }),
    [NICK_CHECK_SUCCESS]: (state, { payload: { nickAuth } }) => ({
      ...state,
      nickAuth,
      nickError: null,
    }),
    [NICK_CHECK_FAILURE]: (state, { payload: { nickError } }) => ({
      ...state,
      nickAuth: null,
      nickError,
    }),
    [CHANGE_PHOTO_SUCCESS]: (state, { payload: { img } }) => ({
      ...state,
      img,
      imgError: null,
    }),
    [CHANGE_PHOTO_FAILURE]: (state, { payload: { imgError } }) => ({
      ...state,
      img: null,
      imgError,
    }),
    [WITHDRAW_SUCCESS]: (state, { payload: { withdrawAuth } }) => ({
      ...state,
      withdrawAuth,
      withdrawError: null,
    }),
    [WITHDRAW_FAILURE]: (state, { payload: { withdrawError } }) => ({
      ...state,
      withdrawAuth: null,
      withdrawError,
    }),
    ////boardList
    [GET_BOARD_LIST_SUCCESS]: (
      state,
      { payload: { boardList, totalBoard } }
    ) => ({
      ...state,
      boardList,
      totalBoard,
      boardListError: null,
      deleteBoardError: null,
    }),
    [GET_BOARD_LIST_FAILURE]: (state, { payload: { boardListError } }) => ({
      ...state,
      boardList: null,
      totalBoard: null,
      boardListError,
      deleteBoardError: null,
    }),
    [DELETE_BOARD_SUCCESS]: (state, { payload: { deleteBoardError } }) => ({
      ...state,
      deleteBoardError,
    }),
    [DELETE_BOARD_FAILURE]: (state, { payload: { deleteBoardError } }) => ({
      ...state,
      deleteBoardError,
    }),
    ////replyList
    [GET_REPLY_LIST_SUCCESS]: (
      state,
      { payload: { replyList, totalReply } }
    ) => ({
      ...state,
      replyList,
      totalReply,
      replyListError: null,
      deleteReplyError: null,
    }),
    [GET_REPLY_LIST_FAILURE]: (state, { payload: { replyListError } }) => ({
      ...state,
      replyList: null,
      totalReply: null,
      replyListError,
      deleteReplyError: null,
    }),
    [DELETE_REPLY_SUCCESS]: (state, { payload: { deleteReplyError } }) => ({
      ...state,
      deleteReplyError,
    }),
    [DELETE_REPLY_FAILURE]: (state, { payload: { deleteReplyError } }) => ({
      ...state,
      deleteReplyError,
    }),
    ////likeList
    [GET_LIKE_LIST_SUCCESS]: (state, { payload: { likeList, totalLike } }) => ({
      ...state,
      likeList,
      totalLike,
      likeListError: null,
      deleteLikeError: null,
    }),
    [GET_LIKE_LIST_FAILURE]: (state, { payload: { likeListError } }) => ({
      ...state,
      likeList: null,
      totalLike: null,
      likeListError,
      deleteLikeError: null,
    }),
    [DELETE_LIKE_SUCCESS]: (state, { payload: { deleteLikeError } }) => ({
      ...state,
      deleteLikeError,
    }),
    [DELETE_LIKE_FAILURE]: (state, { payload: { deleteLikeError } }) => ({
      ...state,
      deleteLikeError,
    }),
    ////wishList
    [GET_WISH_LIST_SUCCESS]: (state, { payload: { wishList, totalWish } }) => ({
      ...state,
      wishList,
      totalWish,
      wishListError: null,
      deleteWishError: null,
    }),
    [GET_WISH_LIST_FAILURE]: (state, { payload: { wishListError } }) => ({
      ...state,
      wishList: null,
      totalWish: null,
      wishListError,
      deleteWishError: null,
    }),
    [GET_WISH_DETAIL_SUCCESS]: (state, { payload: { wish } }) => ({
      ...state,
      wish,
      wishError: null,
    }),
    [GET_WISH_DETAIL_FAILURE]: (state, { payload: { wishError } }) => ({
      ...state,
      wish: null,
      wishError,
    }),
    [WISH_DETAIL_CLEAR]: state => ({
      ...state,
      wish: null,
    }),
    [DELETE_WISH_SUCCESS]: (state, { payload: { deleteWishError } }) => ({
      ...state,
      deleteWishError,
    }),
    [DELETE_WISH_FAILURE]: (state, { payload: { deleteWishError } }) => ({
      ...state,
      deleteWishError,
    }),
  },
  initialState
);

export default ProfileMod;
