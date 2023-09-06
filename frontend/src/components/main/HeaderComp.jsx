import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

import HamMenuComp from "./HamMenuComp";

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-around;
  left: 50%;
  height: 6rem;
  width: 100%;
  z-index: 999;
  transform: translate(-50%);
  z-index: 999;
  padding: 5px;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: 0.8s;

  &.original_header {
    background: none;
  }

  &.change_header {
    background: ${props => props.theme.white};
  }

  .welecome {
    font-size: 20px;
    font-weight: 600;
    margin-left: 40px;
    margin-bottom: 8px;
  }

  .ham-menu {
    display: none;
  }

  @media (max-width: 1200px) {
    .welecome {
      font-size: 18px;
      margin-left: 16px;
    }
  }

  @media (max-width: 768px) {
    .welecome {
      display: none;
    }
    .ham-menu {
      display: block;
      position: absolute;
      right: 10%;
      transform: scale(2.5);
    }
  }
`;

const Logo = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  font-family: "TTWanjudaedunsancheB";
  img {
    width: 200px;
    margin-top: 20px;
  }

  .welecome {
    margin-left: 16px;
    font-size: 18px;
  }

  @media (max-width: 1200px) {
    img {
      width: 180px;
    }
  }

  @media (max-width: 800px) {
    img {
      font-size: 18px;
      margin-left: -50%;
    }
  }
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-around;

  @media (max-width: 800px) {
    display: none;
  }
`;

const NavList = styled.li`
  cursor: pointer;
  font-size: 18px;
  margin-left: 50px;
  transition: 0.5s;
  &:hover {
    transform: scale(1.1);
    font-weight: 600;
  }
  span {
    &.click {
      color: ${props => props.theme.mainColor};
      font-weight: 600;
    }
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    margin-left: 30px;
  }
`;

const LoginCategory = styled.span`
  border-radius: 20px;
  margin-left: 20px;
  padding: 5px 15px;
  .logout {
    cursor: pointer;
    font-size: 16px;
  }
  span {
    &.click {
      color: ${props => props.theme.mainColor};
      font-weight: 600;
    }
  }

  @media (max-width: 1200px) {
    font-size: 14px;
    margin-left: 1px;
    .logout {
      cursor: pointer;
      font-size: 14px;
    }
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const Spacer = styled.div`
  height: 10rem;
`;

const HeaderComp = ({ nick, onLogout, grade, onClick }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [flagHamMenu, setFlagHamMenu] = useState(false);

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  const onHamMenu = () => {
    if (!flagHamMenu) {
      setFlagHamMenu(true);
    } else {
      setFlagHamMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  //기본 로고 triplogo8.png
  return (
    <>
      <HeaderContainer
        className={scrollPosition < 100 ? "original_header" : "change_header"}
      >
        <Logo onClick={onClick}>
          <Link to="/">
            <img src="/assets/logo.jpg" alt="img" />
          </Link>
        </Logo>
        <FontAwesomeIcon
          icon={faBars}
          className="ham-menu"
          onClick={onHamMenu}
        />
        <HamMenuComp
          flagHamMenu={flagHamMenu}
          onClick={onClick}
          onHamMenu={onHamMenu}
          nick={nick}
          onLogout={onLogout}
          grade={grade}
        />
        <Nav>
          <NavList onClick={onClick}>
            <Link to="/search">
              <span className="nav-item">통합검색</span>
            </Link>
          </NavList>
          <NavList onClick={onClick}>
            <Link to="/area">
              <span className="nav-item">지역</span>
            </Link>
          </NavList>
          <NavList onClick={onClick}>
            <Link to="/room">
              <span className="nav-item">숙소</span>
            </Link>
          </NavList>
          <NavList onClick={onClick}>
            <Link to="/traffic">
              <span className="nav-item">교통수단</span>
            </Link>
          </NavList>
          <NavList>
            <Link to="/chat">
              <span className="nav-item">여행MATE</span>
            </Link>
          </NavList>
          <NavList onClick={onClick}>
            <Link to="/board">
              <span className="nav-item">여행후기</span>
            </Link>
          </NavList>
        </Nav>
        {nick ? (
          <div>
            <div className="welecome">{nick}님 환영합니다!</div>
            <LoginCategory onClick={onClick}>
              {grade === 1 ? (
                <Link to={`/profile/${nick}`}>
                  <span className="nav-item">마이페이지</span>
                </Link>
              ) : grade === 2 ? (
                <Link to={"/admin/user"}>관리자페이지</Link>
              ) : null}
            </LoginCategory>
            <LoginCategory onClick={onClick}>
              <span className="logout" onClick={onLogout}>
                로그아웃
              </span>
            </LoginCategory>
          </div>
        ) : (
          <div>
            <LoginCategory onClick={onClick}>
              <Link to="/auth/login">로그인</Link>
            </LoginCategory>
            <LoginCategory onClick={onClick}>
              <Link to="/auth/register">회원가입</Link>
            </LoginCategory>
          </div>
        )}
      </HeaderContainer>
      <Spacer />
    </>
  );
};

export default HeaderComp;
