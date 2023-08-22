const express = require("express");
const {
  login,
  check,
  logout,
  searchId,
  searchPwd,
  updatePwd,
} = require("../controllers/loginController");
const {
  register,
  idChk,
  nickChk,
  phoneChk,
  authNumChk,
  replyUserNickChk,
} = require("../controllers/registerController");
const app = express();
const auth = express.Router();

auth.post("/login", login);
auth.get("/logout", logout);
auth.post("/register", register);
auth.post("/register/idChk", idChk);
auth.post("/register/nickChk", nickChk);
auth.post("/register/phoneChk", phoneChk);
auth.post("/register/authNumChk", authNumChk);
auth.get("/check", check);
auth.post("/searchId", searchId);
auth.post("/searchPwd", searchPwd);
auth.post("/searchPwd/:id", updatePwd);

module.exports = auth;
