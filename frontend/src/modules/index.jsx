import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import RegisterMod, { registerSaga } from "./RegisterMod";
import LoginMod, { loginSaga } from "./LoginMod";
import WriteMod, { writeSaga } from "./board/WriteMod";
import BoardListMod, { postsSaga } from "./board/BoardListMod";
import RoomMod, { roomSaga } from "./chat/RoomMod";
import ReadMod, { postSaga } from "./board/ReadMod";
import ChatMod, { chatSaga } from "./chat/ChatMod";
import UserMod, { userSaga } from "./UserMod";
import AreaListMod,{areaSaga} from "./area/AreaListMod";
const rootReducer = combineReducers({
  LoginMod,
  RegisterMod,
  UserMod,
  WriteMod,
  BoardListMod,
  RoomMod,
  ReadMod,
  ChatMod,
  AreaListMod
});

export function* rootSaga() {
  yield all([
    writeSaga(),
    loginSaga(),
    registerSaga(),
    postsSaga(),
    userSaga(),
    chatSaga(),
    roomSaga(),
    postSaga(),
    areaSaga()
  ]);
}

export default rootReducer;
