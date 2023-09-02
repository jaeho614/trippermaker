const mongoose = require("mongoose");

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV, MONGO_URL } = process.env;
const connect = () => {
  if (NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      dbName: "chat";
      useNewUrlParser: true;
    })
    .catch(error => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    });
};
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
