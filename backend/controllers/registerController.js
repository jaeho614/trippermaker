const { user } = require("../models/mysql");
const bcrypt = require("bcrypt");
const temporary = require("../models/mongoDB/temporary");

exports.register = async (req, res) => {
  const { email, pwd, nick, phone, addr1, addr2, zipcode, gender } = req.body;
  const hashedPwd = await bcrypt.hash(pwd, 10); //해쉬 비밀번호 (비밀번호, 보안등급 기본이 10) 보안등급 높을수록 처리시간이 길어지며 DB에는 $2b$10 이런식으로 저장되며, 등급이 높은(ex $2b$15) 비밀번호로 가입하면 그 계정은 비밀번호 처리 시간이 길어진다.

  try {
    const newUser = await user.create({
      id: email,
      pwd: hashedPwd,
      nick,
      phone,
      addr1,
      addr2,
      zipcode,
      gender,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return res.status(500).json("회원가입 실패");
  }
};

exports.idChk = async (req, res) => {
  const { id } = req.body;
  try {
    const exUser = await user.findOne({
      where: {
        id,
      },
    });
    if (!exUser) {
      return res.status(201).json({ idAuth: true }); //사용가능한 아이디
    }
    return res.status(401).json({ idError: true }); //중복된 아이디
  } catch (e) {
    console.error(e);
  }
};

exports.nickChk = async (req, res) => {
  const { nick } = req.body;

  try {
    const exUser = await user.findOne({
      where: {
        nick,
      },
    });
    if (!exUser) {
      return res.status(201).json({ nickAuth: true }); //사용가능한 닉네임
    }
    return res.status(401).json({ nickError: true }); //중복된 닉네임
  } catch (e) {
    console.error(e);
  }
};

exports.phoneChk = async (req, res) => {
  const { phone } = req.body;
  const substrPhone = phone.substr(1);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNum = process.env.TWILIO_FORM_NUM;
  const client = require("twilio")(accountSid, authToken);
  const code = makeAuthNum(); //랜덤숫자 4자리
  const expires = Date.now() + 60000; //인증번호 유효기간

  function makeAuthNum() {
    //랜덤숫자열 생성
    let code = "";
    for (let i = 0; i < 4; i++) code += Math.floor(Math.random() * 10);
    return code;
  }

  function calcExpire(time) {
    //인증 유효시간 계산
    const valid = Date.now() - time;
    if (valid > 0) {
      return false;
    }
    return true;
  }

  try {
    const exUser = await user.findOne({
      where: {
        phone,
      },
    });

    if (exUser) {
      console.log("이미 가입된 회원입니다.");
      return res
        .status(401)
        .json({ phoneError: true, phoneMsg: "이미 가입된 전화번호입니다." }); //중복된 번호
    }

    const alreadyGetNum = await temporary.findOne({
      //인증번호를 이미 발급 받았는지 확인
      phone,
    });

    if (!alreadyGetNum) {
      await temporary.create({
        authNum: code,
        phone: phone,
        insertTime: expires,
        expire: Date.now(),
        ok: false,
      });

      console.log(code, "가 발급되었습니다");

      // await client.messages
      //   .create({
      //     body: `TRIPPER MAKER 인증번호는 ${code}입니다.`,
      //     from: fromNum,
      //     to: `+82${substrPhone}`,
      //   }, function (err, message) {
      //     if (err) console.log(err);
      //     else console.log(message.sid);
      //   });

      return res
        .status(200)
        .json({
          phoneAuth: true,
          phoneMsg: "핸드폰으로 인증번호가 발급되었습니다.",
        });
    }

    const expire = alreadyGetNum.insertTime;

    if (!calcExpire(expire) && !alreadyGetNum.ok) {
      await temporary.updateOne(
        { phone: phone },
        {
          authNum: code,
          insertTime: expires,
          expire: Date.now(),
        }
      );
      console.log(`${code}가 재발급되었씁니다.`);

      // await client.messages
      //   .create({
      //     body: `TRIPPER MAKER 인증번호는 ${code}입니다.`,
      //     from: fromNum,
      //     to: `+82${substrPhone}`,
      //   }, function (err, message) {
      //     if (err) console.log(err);
      //     else console.log(message.sid);
      //   });

      return res
        .status(200)
        .json({ phoneAuth: true, phoneMsg: "인증번호가 재발급 되었습니다." });
    }
    if (calcExpire(expire) && !alreadyGetNum.ok) {
      console.log("이미 발급된 인증번호가 존재합니다.");
      return res
        .status(400)
        .json({
          phoneError: true,
          phoneMsg: "이미 발급된 인증번호가 존재합니다.",
        });
    }
    if (alreadyGetNum && alreadyGetNum.ok) {
      console.log("이미 인증이 완료되었습니다.");
      return res
        .status(200)
        .json({ phoneAuth: true, phoneMsg: "이미 인증이 완료되었습니다." });
    }
  } catch (e) {
    console.error(e);
  }
};

exports.authNumChk = async (req, res) => {
  const { authNum, phone } = req.body;

  function calcExpire(time) {
    const valid = time - Date.now();
    if (valid > 0) {
      console.log("valid : ", valid);
      return false;
    }
    return true;
  }

  function compareAuthNum(received, inserted) {
    if (String(received) === inserted) {
      return true;
    }
    return false;
  }

  try {
    const insertedPhone = await temporary.findOne({
      phone,
    });

    if (!insertedPhone) {
      console.log("인증번호를 발급받아 주세요.");
      return res
        .status(401)
        .json({ authNumError: true, phoneMsg: "인증번호를 발급받아 주세요." });
    }

    if (insertedPhone.ok) {
      console.log("인증이 이미 완료되었습니다.");
      return res
        .status(200)
        .json({ authNum: true, phoneMsg: "인증이 이미 완료되었습니다." });
    }

    const receivedNum = insertedPhone.authNum;
    const expire = insertedPhone.insertTime;

    if (calcExpire(expire) === true) {
      console.log("인증번호가 만료되었습니다. 다시 발급 받아주세요.");
      return res
        .status(401)
        .json({
          authNumError: true,
          phoneMsg: "인증번호가 만료되었습니다. 다시 발급 받아주세요.",
        });
    }

    if (!compareAuthNum(receivedNum, authNum)) {
      console.log("인증번호를 다시 확인해주세요.");
      return res
        .status(401)
        .json({
          authNumError: true,
          phoneMsg: "인증번호를 다시 확인해주세요.",
        });
    }

    if (compareAuthNum(receivedNum, authNum)) {
      await temporary.updateOne(
        { phone: phone },
        {
          ok: true,
        }
      );
      console.log("인증이 완료되었습니다.");
      return res
        .status(200)
        .json({ authNum: true, phoneMsg: "인증이 완료되었습니다." }); //인증완료
    }
  } catch (e) {
    console.error(e);
  }
};
