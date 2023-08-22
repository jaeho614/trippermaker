import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SearchPwdComp from "../../components/auth/SearchPwdComp";
import {
  changeValue,
  initializeLoginForm,
  pwdChk,
} from "../../modules/auth/LoginMod";
import { useEffect, useState } from "react";
import { updatePwd } from "../../modules/auth/LoginMod";
import { AES, CryptoJS } from "crypto-js";

const SearchPwdCntr = () => {
  const dispatch = useDispatch();
  const { id, sendTime } = useParams();
  const [onPwdChk, setOnPwdChk] = useState("");
  const navigate = useNavigate();
  const { pwd, pwdConfirm, pwdAuth } = useSelector(({ LoginMod }) => ({
    pwd: LoginMod.pwd,
    pwdConfirm: LoginMod.pwdConfirm,
    pwdAuth: LoginMod.pwdAuth,
  }));

  const onSubmit = e => {
    e.preventDefault();
    const valid = pwd => {
      return /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^*()-]).{8,15}$/.test(
        pwd
      );
    };

    if (!valid(pwd)) {
      alert(
        "비밀번호는 영문, 숫자, 특수기호 조합으로 8-15자리를 입력해주세요."
      );
    }

    if (pwdAuth) {
      dispatch(
        updatePwd({
          email: id,
          pwd,
        })
      );
    }
  };

  const onChange = e => {
    const { name, value } = e.target;

    dispatch(
      changeValue({
        value,
        key: name,
      })
    );
  };

  //비밀번호, 비밀번호확인 체크
  useEffect(() => {
    initializeLoginForm();
  }, [dispatch]);

  useEffect(() => {
    if (pwd !== null && pwdConfirm !== null) {
      if (pwd !== pwdConfirm) {
        setOnPwdChk(false); //아래랑 리팩토링
        dispatch(
          pwdChk({
            form: "auth",
            key: "pwdAuth",
            value: false,
          })
        );
      }
      if (pwd === pwdConfirm) {
        setOnPwdChk(true); //여기랑 리팩토링
        dispatch(
          pwdChk({
            form: "auth",
            key: "pwdAuth",
            value: true,
          })
        );
      }
    }
  }, [pwd, pwdConfirm]);

  useEffect(() => {
    if (pwdAuth === "ok") {
      alert("비밀번호가 변경되었습니다.");
      navigate("/");
    }
  }, [pwdAuth]);

  useEffect(() => {
    const nowTime = Date.now();

    function dcryptFunc(source) {
      const key = "abcdefghijklmnopqrstuvwxyz123456"; //복호화 알고리즘
      const iv = "1234567890123456"; //복호화 알고리즘
      let decryptedSource = CryptoJS.AES.decrypt(source, key);
      return decryptedSource.toString(CryptoJS.enc.Utf8);
    }
    const decryptedTime = dcryptFunc(sendTime);
    console.log(nowTime, "====", decryptedTime);
    if (nowTime > decryptedTime) {
      alert("이미 만료된 링크입니다.");
      navigate("/");
    }
  });

  return (
    <SearchPwdComp
      onSubmit={onSubmit}
      onChange={onChange}
      onPwdChk={onPwdChk}
    />
  );
};

export default SearchPwdCntr;
