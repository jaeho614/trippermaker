import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  changeValue,
  initializeLoginForm,
  login,
  onSearchId,
  onSearchPwd,
} from "../../modules/auth/LoginMod";
import { check } from "../../modules/auth/UserMod";
import LoginComp from "../../components/auth/LoginComp";

const LoginCntr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [searchName, setSearchName] = useState(false);
  const {
    id,
    pwd,
    email,
    phone,
    auth,
    authError,
    user,
    searchId,
    searchPwd,
    searchIdError,
    searchPwdError,
  } = useSelector(({ LoginMod, UserMod }) => ({
    id: LoginMod.id,
    pwd: LoginMod.pwd,
    email: LoginMod.email,
    phone: LoginMod.phone,
    auth: LoginMod.auth,
    authError: LoginMod.authError,
    user: UserMod.user,
    searchId: LoginMod.searchId,
    searchPwd: LoginMod.searchPwd,
    searchIdError: LoginMod.searchIdError,
    searchPwdError: LoginMod.searchPwdError,
  }));
  const USER_KEY = "USER";

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeValue({ value, key: name }));
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login({ id, pwd }));
  };

  //모달창 toggle 하면서 state 정보 초기화
  const switchModal = () => {
    setModal(!modal);
    dispatch(initializeLoginForm());
  };

  const changeInform = e => {
    const name = e.target.getAttribute("name"); //e.target.name 으로 접근 안됨.
    setSearchName(name);
    switchModal();
  };

  const onFindId = () => {
    const valid = phone => {
      return /^[0-1]{3}[0-9]{4}[0-9]{4}$/.test(phone);
    };
    const phoneValid = valid(phone);

    if (!phoneValid) {
      return alert("전화번호를 확인해주세요.");
    }

    dispatch(
      onSearchId({
        phone,
      })
    );
  };

  const onFindPwd = () => {
    const valid = email => {
      return /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(email);
    };
    const emailValid = valid(email);

    if (!emailValid) {
      return alert("이메일을 확인해주세요.");
    }

    dispatch(
      onSearchPwd({
        email,
        phone,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeLoginForm());
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError(authError);
      return;
    }

    if (auth) {
      dispatch(check());
    }
  }, [auth, authError]);

  useEffect(() => {
    if (user) {
      navigate("/");
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [user]);

  useEffect(() => {
    if (searchPwd) {
      alert("해당 이메일로 비밀번호 변경 메일을 발송했습니다. 확인해주세요.");
      setModal(!modal);
    }
  }, [searchPwd]);

  return (
    <LoginComp
      error={error}
      modal={modal}
      searchName={searchName}
      findId={searchId}
      searchIdError={searchIdError}
      searchPwdError={searchPwdError}
      changeInform={changeInform}
      onChange={onChange}
      onSubmit={onSubmit}
      onFindId={onFindId}
      onFindPwd={onFindPwd}
      switchModal={switchModal}
    />
  );
};

export default LoginCntr;
