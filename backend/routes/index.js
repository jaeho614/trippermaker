const express = require("express");
const board = require("./board");
const chat = require("./chat");
const auth = require("./auth");
const room = require("./room");
const area = require('./area');
const router = express.Router();

router.get("/", function (req, res) {return res.json({ msg: "main" });});
router.use("/board", board);
router.use("/auth", auth);
router.use("/chat", chat);
router.use("/room", room);
router.use('/area',area);

module.exports = router;
