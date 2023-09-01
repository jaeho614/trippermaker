import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SearchPwdComp from "../../components/auth/SearchPwdComp";
import {
  changeValue,
  initializeLoginForm,
  pwdChk,
  urlCheck,
} from "../../modules/auth/LoginMod";
import { useEffect, useState } from "react";
import { updatePwd } from "../../modules/auth/LoginMod";

const SearchPwdCntr = () => {
  const dispatch = useDispatch();
  const { id, sendTime } = useParams();
  const [onPwdChk, setOnPwdChk] = useState("");
  const navigate = useNavigate();
  const { pwd, pwdConfirm, pwdAuth, urlExist } = useSelector(
    ({ LoginMod }) => ({
      pwd: LoginMod.pwd,
      pwdConfirm: LoginMod.pwdConfirm,
      pwdAuth: LoginMod.pwdAuth,
      urlExist: LoginMod?.urlExist,
    })
  );

  const onSubmit = e => {
    e.preventDefault();
    const valid = pwd => {
      return /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^*()-]).{8,15}$/.test(
        pwd
      );
    };

    if (!valid(pwd)) {
      return alert(
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

  const doPwdChk = input => {
    setOnPwdChk(input);
    dispatch(
      pwdChk({
        form: "auth",
        key: "pwdAuth",
        value: input,
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
        doPwdChk(false);
      }
      if (pwd === pwdConfirm) {
        doPwdChk(true);
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
    dispatch(
      urlCheck({
        sendTime,
      })
    );
  }, [dispatch]);

  //비밀번호 변경 이메일 유효시간 경과시 돌려보냄.
  useEffect(() => {
    if (urlExist === false) {
      alert("이미 만료된 주소입니다. 이메일을 다시 발급 받아주세요.");
      navigate("/auth/login");
    }
  }, [urlExist]);

  return (
    <SearchPwdComp
      onSubmit={onSubmit}
      onChange={onChange}
      onPwdChk={onPwdChk}
    />
  );
};

export default SearchPwdCntr;
