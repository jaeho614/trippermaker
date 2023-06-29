const { user } = require("../models/mysql");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  const {id, pwd, nick, phone, addr1, addr2, zipcode, gender} = req.body;
  const hashedPwd = await bcrypt.hash(pwd, 10); //해쉬 비밀번호

  const idChk = false;
  const pwdChk = false;
  const nickChk = false;
  const phoneChk = false;
  const authOk = false;

  if (idChk && pwdChk && nickChk && phoneChk) {
    return authOk = true;
  }

  try {
    const exUser = await user.findOne({
      where: {
        id,
      }
    });

    //아이디 중복확인
    if (!exUser) { 
      return idChk = true;
    }

    if (!idChk) {
      //중복체크 빈칸 확인
      return res.status(409).json("아이디 확인");
    }

    if (!pwdChk) {
      //비밀번호 && 체크 맞는지확인
      return res.status(409).json("비밀번호 확인");
    }

    if (!nickChk) {
      //중복체크 빈칸 확인
      return res.status(409).json("닉네임 확인");
    }

    if (!phoneChk) {
      //중복체크 빈칸 확인
      return res.status(409).json("전화번호 확인");
    }

    const newUser = await user.create({
      id: id,
      pwd: hashedPwd,
      nick: nick,
      phone: phone,
      addr1: addr1,
      addr2: addr2,
      zipcode: zipcode,
      gender: gender,
    });
    res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
  }
}