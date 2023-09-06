const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { sequelize } = require("./models/mysql");
dotenv.config();
const bodyParser = require("body-parser");
const connect = require("./models/mongoDB");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "OPTIONS", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

const { PORT, MONGO_URL } = process.env;

console.log("port", PORT);

// mongoDB 연결
mongoose
  .connect(MONGO_URL) // mongoDB 6버전 이상부터
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(e => {
    console.error("error : ", e);
  });

// // MySQL 연결
// sequelize
//   .sync({ force: false })
//   .then(() => {
//     console.log("Connected to MySQL");
//   })
//   .catch((e) => {
//     console.error(e);
//   });

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(express.static(path.join(__dirname + "/public")));
connect();

// // multer 설정
// const upload = multer({
//   storage: multer.diskStorage({
//     // 저장할 장소
//     destination(req, file, cb) {
//       cb(null, "public/uploads");
//     },
//     // 저장할 이미지의 파일명
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname); // 파일의 확장자
//       console.log("file.originalname", file.originalname);
//       // 파일명이 절대 겹치지 않도록 해줘야한다.
//       // 파일이름 + 현재시간밀리초 + 파일확장자명
//       cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//     },
//   }),
//   // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
// });

// // 하나의 이미지 파일만 가져온다.
// app.post("/img", upload.array("img"), (req, res) => {
//   // 해당 라우터가 정상적으로 작동하면 public/uploads에 이미지가 업로드된다.
//   // 업로드된 이미지의 URL 경로를 프론트엔드로 반환한다.
//   console.log("전달받은 파일", req.file);
//   console.log("저장된 파일의 이름", req.file.filename);

//   // 파일이 저장된 경로를 클라이언트에게 반환해준다.
//   const IMG_URL = `http://localhost:4000/uploads/${req.file.filename}`;
//   console.log(IMG_URL);
//   res.json({ url: IMG_URL });
// });

const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    // sameSite: "Lax",
  },
});

app.use("/", router);

const server = app.listen(PORT || 4000, () => {
  console.log(`Listening to port ${PORT}`);
});

app.use((req, res, next) => {
  const err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render("error");
});
