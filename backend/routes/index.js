const express = require("express");
const board = require("./boardRouter");
const chat = require("./chatRouter");
const auth = require("./authRouter");
const room = require("./roomRouter");
const area = require("./areaRouter");
const wishList = require("./wishListRouter");
const traffic = require("./trafficRouter");
const admin = require("./adminRouter");
const profile = require("./profileRouter");
const like = require("./likeRouter");
const schedule = require("./scheduleRouter");
const theme = require("./themeRouter");
const ticket = require("./ticketRouter");
const {
  mainBoardList,
  getMainStyle,
  getMainTerms,
  getMainInform,
} = require("../controllers/mainController");
const router = express.Router();

router.get("/", function (req, res) {
  return res.json({ msg: "main" });
});
router.get("/boardlist", mainBoardList);
router.get("/getMainStyle", getMainStyle);
router.get("/getMainTerms/:type", getMainTerms);
router.get("/getMainInform", getMainInform);
router.use("/board", board);
router.use("/auth", auth);
router.use("/admin", admin);
router.use("/chat", chat);
router.use("/room", room);
router.use("/area", area);
router.use("/profile", profile);
router.use("/wishList", wishList);
router.use("/traffic", traffic);
router.use("/like", like);
router.use("/schedule", schedule);
router.use("/theme", theme);
router.use("/ticket", ticket);

module.exports = router;
