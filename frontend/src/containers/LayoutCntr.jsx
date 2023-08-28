import { Outlet } from "react-router-dom";
import Footer from "../components/main/FooterComp";
import HeaderComp from "../components/main/HeaderComp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../modules/auth/UserMod";
import { initializeLoginForm } from "../modules/auth/LoginMod";
import { getMainInform, getMainTerms } from "../modules/main/MainMod";
import { useEffect, useState } from "react";

const LayoutCntr = () => {
  const dispatch = useDispatch();
  const { user, nick, grade, mainTerms, mainInform } = useSelector(
    ({ UserMod, MainMod }) => ({
      user: UserMod.user,
      nick: UserMod.user?.nick,
      grade: UserMod.user?.grade,
      mainTerms: MainMod?.mainTerms,
      mainInform: MainMod?.mainInform,
    })
  );
  const [modal, setModal] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(initializeLoginForm()); // 초기화 해줌. 로그아웃 후 LoginMod에 정보(auth: true)가 남아있어 check()에 걸려 로그인 페이지 재진입시 401에러 발생함.
  };

  const onClick = e => {
    const navItems = Array.from(document.getElementsByClassName("nav-item"));
    navItems.forEach(item => {
      if (item === e.target) {
        item.classList.add("click");
      } else {
        item.classList.remove("click");
      }
    });
  };

  const onGetMainTerms = type => {
    setModal(!modal);
    dispatch(
      getMainTerms({
        type,
      })
    );
  };

  //마이페이지에서 닉네임 수정시 localstorage 저장된 값 변경해줌.
  useEffect(() => {
    const USER_KEY = "USER";
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [nick]);

  useEffect(() => {
    dispatch(getMainInform());
  }, [dispatch]);

  return (
    <>
      <HeaderComp
        nick={nick}
        grade={grade}
        onLogout={onLogout}
        onClick={onClick}
      />
      <Outlet />
      <Footer
        onGetMainTerms={onGetMainTerms}
        modal={modal}
        mainTerms={mainTerms}
        mainInform={mainInform}
      />
    </>
  );
};

export default LayoutCntr;
