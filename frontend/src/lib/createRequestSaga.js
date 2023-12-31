import { call, put } from "redux-saga/effects";
import { startLoading, finishLoading } from "../modules/loadingMod";

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    yield put(startLoading(type));
    try {
      const response = yield call(request, action.payload);
      // console.log('createRequestSaga type ===>', type);
      // console.log('createRequestSaga request ===>', request);
      // console.log('createRequestSaga action.payload ===>', action.payload);
      // console.log('createRequestSaga response ===>', response);
      yield put({
        type: SUCCESS,
        payload: response?.data,
        meta: response,
      });
    } catch (e) {
      console.log("error : ", e);
      yield put({
        type: FAILURE,
        payload: e?.response?.data,
        error: true,
      });
    }
    yield put(finishLoading(type));
  };
}
