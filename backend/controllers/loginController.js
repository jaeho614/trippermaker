const { user } = require("../models/mysql");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { generateToken } = require("./authController");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.login = async (req, res) => {
  const { id, pwd } = req.body;

  try {
    const exUser = await user.findOne({
      where: {
        id,
      },
    });

    if (id === null) {
      return res.status(401).json({ authError: "아이디를 입력해주세요" });
    }

    if (pwd === null) {
      return res.status(401).json({ authError: "비밀번호를 입력해주세요" });
    }

    if (!exUser) {
      return res.status(401).json({ authError: "가입된 회원이 아닙니다." }); //아이디 빈칸 및 확인
    }

    const hashedPwd = exUser.pwd;
    const pwdChk = await bcrypt.compare(pwd, hashedPwd); //결과값 true OR false
    const token = generateToken(
      id,
      exUser.nick,
      exUser.gender,
      exUser.grade,
      exUser.style,
      exUser.no
    );

    if (!pwdChk) {
      return res.status(401).json({ authError: "비밀번호가 틀렸습니다." }); //비밀번호 빈칸 및 확인
    }

    //jwt token 발행
    res.cookie("access_token", token, {
      //res cookie에 jwt token 담기
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    //비밀번호 n회 틀릴경우 로그인 막고 전화인증 받아서 풀게하기 추가!!
    return res.json({ auth: true }); //유저정보 및 페이지이동 해야함
  } catch (e) {
    return res.status(500).json({ authError: "로그인 실패" });
  }
};

exports.check = (req, res) => {
  const exUser = req.cookies.access_token;

  if (!exUser) {
    return res.status(400).json({ checkError: true });
  }

  return res.json(jwt.verify(exUser, process.env.JWT_TOKEN));
};

exports.logout = async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json("로그아웃 했습니다.");
};

exports.searchId = async (req, res) => {
  const { phone } = req.body;

  try {
    const exUser = await user.findOne({
      where: {
        phone,
      },
    });
    const { id } = exUser;

    if (!exUser) {
      return res
        .status(200)
        .json({ searchIdError: "해당 정보로 가입된 계정이 없습니다." });
    }

    return res.status(200).json({ searchId: id });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ searchIdError: true });
  }
};

exports.searchPwd = async (req, res) => {
  const { email, phone } = req.body;

  function encryptFunc(source) {
    const algorithm = "aes-256-cbc"; //복호화 알고리즘
    const key = "abcdefghijklmnopqrstuvwxyz123456"; //복호화 알고리즘
    const iv = "1234567890123456"; //복호화 알고리즘
    const cipher = crypto.createCipheriv(algorithm, key, iv); //복호화 알고리즘
    let encryptedSource = cipher.update(source, "utf8", "base64"); //(암호화 할 이메일, utf8, base64)
    encryptedSource += cipher.final("base64"); //복호화 알고리즘
    return encryptedSource;
  }

  try {
    const exUser = await user.findOne({
      where: {
        id: email,
        phone,
      },
    });

    if (!exUser) {
      return res
        .status(401)
        .json({ searchPwdError: "해당 정보로 가입된 계정이 없습니다." });
    }
    //nodemailer 설정
    const EMAIL = "tripper.maker4@gmail.com"; //발신자 메일
    const EMAIL_PW = "ecxgyfjdoqoiunka"; //gmail의 경우 2단계인증 완료후 앱비밀번호를 생성하여 입력한다.
    let receiverEmail = email; //수신자 email
    let sendTime = (Date.now() + 6000).toString();
    let transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_PW,
      },
    });

    const encryptedEmail = encryptFunc(receiverEmail);
    const encryptedTime = encryptFunc(sendTime);

    let mailOptions = {
      from: EMAIL, //발신자
      to: receiverEmail, //수신자
      subject: "[Tripper Maker]비밀번호 변경 메일",
      html: `http://localhost:3000/auth/searchPwd/${encryptedEmail}/${encryptedTime} 해당 링크를 클릭하여 비밀번호를 변경하세요.`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(info);
    });

    return res.status(200).json({ searchPwd: true });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ searchPwdError: true });
  }
};

exports.updatePwd = async (req, res) => {
  const { email, pwd } = req.body;

  function dcryptFunc(source) {
    const algorithm = "aes-256-cbc"; //복호화 알고리즘
    const key = "abcdefghijklmnopqrstuvwxyz123456"; //복호화 알고리즘
    const iv = "1234567890123456"; //복호화 알고리즘
    const decipher = crypto.createDecipheriv(algorithm, key, iv); //복호화 알고리즘
    let decryptedSource = decipher.update(source, "base64", "utf8"); //(복호화 할 변수, "base64", "utf8")
    decryptedSource += decipher.final("utf8"); //복호화 알고리즘
    return decryptedSource;
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const decryptedEmail = dcryptFunc(email);

    await user.update({ pwd: hashedPwd }, { where: { id: decryptedEmail } });

    return res.status(200).json({ pwdAuth: "ok" });
  } catch (e) {
    console.error(e);
    return res.status(401).json("비밀번호 변경 실패 오류");
  }
};
