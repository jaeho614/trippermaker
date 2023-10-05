const jwt = require("jsonwebtoken");

exports.generateToken = (id, nick, gender, grade, style, no) => {
  const token = jwt.sign(
    //첫 번째 파라미터에는 토큰 안에 넣고 싶은 데이터 넣음.
    {
      id: id,
      nick: nick,
      gender: gender,
      grade: grade,
      style: style,
      no,
    },
    process.env.JWT_TOKEN, //두 번째 파라미터에는 JWT 암호를 넣음.
    {
      expiresIn: "7d", //토큰 유효기간
    }
  );
  return token;
};
