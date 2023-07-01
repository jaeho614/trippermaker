const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
// const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/chat`;
const MONGO_URL = `mongodb://192.168.10.104:27017/chat`;
const connect = () => {
  console.log("MONGO_ID : ", MONGO_ID);
  console.log("MONGO_PASSWORD : ", MONGO_PASSWORD);
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  // mongoose.connect(MONGO_URL, {
  //     dbName: 'gifchat',
  //     useNewUrlParser: true
  // }, (error) => {
  //     if (error) {
  //         console.log('몽고디비 연결 에러', error);
  //     } else {
  //         console.log('몽고디비 연결 성공');
  //     }
  // });
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      dbName: "chat";
      useNewUrlParser: true;
    })
    .catch((error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    });
};

// mongoose.connection.on("error", (error) => {
//   console.error("몽고디비 연결 에러", error);
// });
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
