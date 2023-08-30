import React, { useCallback, useEffect, useRef, useState } from "react";
import RegisterFormComp from "../../components/auth/RegisterFormComp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  authNumChk,
  changeValue,
  idChk,
  idModify,
  initializeRegisterForm,
  inputAddress,
  nickChk,
  nickModify,
  phoneChk,
  phoneModify,
  pwdChk,
  register,
} from "../../modules/auth/RegisterMod";

const RegisterCntr = () => {
  const [email, setEmail] = useState(null);
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState({});
  const [disabledDomain, setDisabledDomain] = useState(null);
  const [onIdChk, setOnIdChk] = useState("empty");
  const [onPwdChk, setOnPwdChk] = useState(null);
  const [onNickChk, setOnNickChk] = useState("empty");
  const [onPhoneChk, setOnPhoneChk] = useState("empty");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    form,
    id,
    domain,
    idAuth,
    idError,
    pwd,
    pwdConfirm,
    pwdAuth,
    nick,
    nickAuth,
    nickError,
    phone,
    phoneAuth,
    phoneMsg,
    phoneError,
    authNum,
    authError,
    addr1,
    addr2,
    zipcode,
    gender,
  } = useSelector(({ RegisterMod }) => ({
    form: RegisterMod,
    id: RegisterMod.user.id,
    domain: RegisterMod.user.domain,
    idAuth: RegisterMod.auth.idAuth,
    idError: RegisterMod.auth.idError,
    pwd: RegisterMod.user.pwd,
    pwdConfirm: RegisterMod.user.pwdConfirm,
    pwdAuth: RegisterMod.auth.pwdAuth,
    nick: RegisterMod.user.nick,
    nickAuth: RegisterMod.auth.nickAuth,
    nickError: RegisterMod.auth.nickError,
    phone: RegisterMod.user.phone,
    phoneAuth: RegisterMod.auth.phoneAuth,
    phoneMsg: RegisterMod.auth.phoneMsg,
    phoneError: RegisterMod.auth.phoneError,
    authNum: RegisterMod.auth.authNum,
    authError: RegisterMod.auth.authError,
    addr1: RegisterMod.user.addr1,
    addr2: RegisterMod.user.addr2,
    zipcode: RegisterMod.user.zipcode,
  }));
  const chooseDomain = useRef();
  const address1 = useRef();
  const zipcode1 = useRef();
  const onChange = useCallback(e => {
    const { value, name } = e.target;
    dispatch(
      changeValue({
        form: "user",
        value,
        key: name,
      })
    );
  }, []);

  //Modal창 컨트롤
  const switchModal = () => {
    setModal(!modal);
  };

  //daum post code 함수
  const onCompletePost = data => {
    const { roadAddress, zonecode } = data;
    setAddress({ roadAddress, zonecode });
    switchModal();
    dispatch(
      inputAddress({
        addr1: roadAddress,
        zipcode: zonecode,
      })
    );
    address1.current.value = roadAddress;
    zipcode1.current.value = zonecode;
  };

  //회원가입 정보 제출
  const onSubmit = e => {
    //영문, 숫자, 특수기호 조합으로 8-15자리를 입력해주세요.
    const valid = pwd => {
      return /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^*()-]).{8,15}$/.test(
        pwd
      );
    };
    if (!idAuth) {
      return alert("아이디 중복확인을 해주세요.");
    }
    if (!pwdAuth) {
      return alert("비밀번호를 확인하여 주세요.");
    }
    if (!valid(pwd)) {
      return alert(
        "비밀번호는 영문, 숫자, 특수기호 조합으로 8-15자리를 입력해주세요."
      );
    }
    if (!nickAuth) {
      return alert("닉네임 중복확인을 해주세요.");
    }
    if (!authNum) {
      return alert("핸드폰 인증을 해주세요.");
    }
    dispatch(
      register({
        email,
        pwd,
        nick,
        phone,
        addr1,
        addr2,
        zipcode,
        gender,
      })
    );
    navigate("/");
  };

  const onCheck = e => {
    const { name } = e.target;

    if (name === "emailChk") {
      const valid = email => {
        return /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/.test(email);
      };
      if (valid(email)) {
        dispatch(
          idChk({
            id: email,
          })
        );
      } else {
        return alert("email을 확인하여 주세요!");
      }
    }

    if (name === "nickChk") {
      const valid = nick => {
        return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/.test(nick);
      };
      if (valid(nick)) {
        dispatch(
          nickChk({
            nick,
          })
        );
      } else {
        return alert(
          "닉네임은 2자 이상, 10자 이하 한글, 영어, 숫자 조합이어야 합니다."
        );
      }
    }

    if (name === "phoneChk") {
      const valid = phone => {
        return /^[0-1]{3}[0-9]{4}[0-9]{4}$/.test(phone);
      };
      if (valid(phone)) {
        dispatch(
          phoneChk({
            phone,
          })
        );
      } else {
        return alert("전화번호를 확인하여 주세요!");
      }
    }

    if (name === "phoneAuthChk") {
      dispatch(
        authNumChk({
          authNum,
          phone,
        })
      );
    }

    if (name === "authNum") {
      const { value } = e.target;
      dispatch(
        changeValue({
          form: "auth",
          value,
          key: name,
        })
      );
    }
  };

  //domain 옵션 선택시 email 값 변경
  const changeDomain = e => {
    const { value } = e.target;
    e.preventDefault();
    if (value !== "directInput") {
      chooseDomain.current.value = value; //useref로 직접 input에 접근하여 조작
      //dispatch하여 store내의 domain값 변경 후 setEmail에 넣어줌
      dispatch(
        changeValue({
          form: "user",
          value,
          key: "domain",
        })
      );
      setEmail(`${id}@${domain}`); //선택된 도메인 값 email에 적용
      setDisabledDomain(true); //도메인 선택 disabled 적용
    } else {
      setDisabledDomain(false); //도메인 선택 disabled 해제
      chooseDomain.current.value = ""; //도메인 선택 "직접입력"시 input 초기화
    }
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

  useEffect(() => {
    dispatch(initializeRegisterForm());
  }, [dispatch]);

  //비밀번호, 비밀번호확인 체크
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
  //닉네임 중복확인 후 값 변경시 다시 중복확인 해야함
  useEffect(() => {
    if (nickAuth || nickAuth === false) {
      dispatch(nickModify());
    }
  }, [nick]);
  //닉네임 중복확인 메세지 실시간 변경
  useEffect(() => {
    if (nickError === null) {
      setOnNickChk("empty");
    } else if (nickError) {
      setOnNickChk(false);
    } else {
      setOnNickChk(true);
    }
  }, [nickError]);
  //id + domain으로 이메일 만들기
  useEffect(() => {
    if (id !== null || domain !== null) {
      setEmail(`${id}@${domain}`);
    }
  }, [id, domain]);
  //id 또는 email 중복확인 후 값 변경시 다시 중복확인 해야함
  useEffect(() => {
    if (idAuth || idAuth === false) {
      dispatch(idModify());
    }
  }, [email]);
  //email 변경시 중복확인 메세지 실시간 변경
  useEffect(() => {
    if (idError === null) {
      setOnIdChk("empty");
    } else if (idError) {
      setOnIdChk(false);
    } else {
      setOnIdChk(true);
    }
  }, [idError]);
  //핸드폰 인증상황에 따른 중복확인 메세지 실시간 변경
  useEffect(() => {
    if (phoneError === null) {
      setOnPhoneChk("empty");
    } else if (phoneError) {
      setOnPhoneChk(false);
    } else {
      setOnPhoneChk(true);
    }
  }, [phoneError]);
  //핸드폰 값 변경시 다시 인증받아야함.
  useEffect(() => {
    if (phoneAuth) {
      dispatch(phoneModify());
    }
  }, [phone]);
  //인증번호 유효시간
  const [count, setCount] = useState(60);
  useEffect(() => {
    if (authNum === true || !phoneAuth) {
      setCount(60);
    }
  }, [authNum, phone]);

  useInterval(
    () => {
      if (count > 0) {
        return setCount(count - 1);
      }
      if (count === 0) {
        dispatch(phoneModify());
        return setCount(60);
      }
    },
    count > -1 && phoneAuth ? 1000 : null
  );
  //useInterval 구조
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  //새로고침 및 창닫기시 실행
  const preventClose = e => {
    e.preventDefault();
    e.returnValue = ""; //Chrome에서 동작하려면 returnValue 설정이 필요; 현재 deprecated된 속성,
  };
  //새로고침 및 창닫기시 실행
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  //뒤로가기시 실행
  const preventGoBack = () => {
    if (
      window.confirm(
        "입력하신 모든 정보가 초기화됩니다. 그래도 진행하시겠습니까?"
      )
    ) {
      navigate(-1);
    }
  };

  //뒤로가기시 실행
  useEffect(() => {
    navigate("/auth/register");
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);

  return (
    <div>
      <RegisterFormComp
        onIdChk={onIdChk}
        onPwdChk={onPwdChk}
        onNickChk={onNickChk}
        onPhoneChk={onPhoneChk}
        chooseDomain={chooseDomain}
        disabledDomain={disabledDomain}
        phoneAuth={phoneAuth}
        phoneMsg={phoneMsg}
        authNum={authNum}
        count={count}
        modal={modal}
        address={address}
        addr1={addr1}
        address1={address1}
        zipcode1={zipcode1}
        switchModal={switchModal}
        onChange={onChange}
        onSubmit={onSubmit}
        onCheck={onCheck}
        changeDomain={changeDomain}
        onCompletePost={onCompletePost}
      />
    </div>
  );
};

export default RegisterCntr;
