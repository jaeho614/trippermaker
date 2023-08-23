const express = require("express");
const {
  login,
  check,
  logout,
  searchId,
  searchPwd,
  updatePwd,
  urlCheck,
} = require("../controllers/loginController");
const {
  register,
  idChk,
  nickChk,
  phoneChk,
  authNumChk,
} = require("../controllers/registerController");

const auth = express.Router();

auth.get("/check", check);
auth.get("/logout", logout);
auth.get("/searchPwd/:email/:sendTime", urlCheck);
auth.post("/login", login);
auth.post("/register", register);
auth.post("/register/idChk", idChk);
auth.post("/register/nickChk", nickChk);
auth.post("/register/phoneChk", phoneChk);
auth.post("/register/authNumChk", authNumChk);
auth.post("/searchId", searchId);
auth.post("/searchPwd", searchPwd);
auth.post("/searchPwd/:email", updatePwd);

module.exports = auth;
