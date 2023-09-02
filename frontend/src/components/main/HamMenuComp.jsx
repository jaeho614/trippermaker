import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const HamMenuWrap = styled.div`
  display: none;
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  height: 100%;
  width: 200px;
  top: 0;
  right: 0;
  z-index: 9999;
  &.flag {
    display: block;
  }
`;

const LoginCategory = styled.div`
  display: flex;
`;

const Nav = styled.ul`
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  margin-top: 20px;
`;

const NavList = styled.li`
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  padding: 10px 30px;
  transition: 0.5s;
  &:hover {
    font-weight: 600;
    transform: scale(1.1);
  }
  span {
    &.click {
      color: ${props => props.theme.button};
      font-weight: 600;
    }
  }
`;

const HamMenuComp = ({
  nick,
  onLogout,
  grade,
  flagHamMenu,
  onHamMenu,
  onClick,
}) => {
  const onFlag = e => {
    onClick(e);
    onHamMenu();
  };

  return (
    <HamMenuWrap className={flagHamMenu ? "flag" : null}>
      <FontAwesomeIcon icon={faXmark} onClick={onFlag} />
      <LoginCategory>
        {nick ? (
          <div>
            <div className="welecome">{nick}님 환영합니다!</div>
            <div>
              {grade === 1 ? (
                <Link to={`/profile/${nick}`}>
                  <span className="nav-item">마이페이지</span>
                </Link>
              ) : grade === 2 ? (
                <Link to={"/admin/user"}>관리자페이지</Link>
              ) : null}
            </div>
            <div>
              <span className="logout" onClick={onLogout}>
                로그아웃
              </span>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Link to="/auth/login">로그인</Link>
            </div>
            <div>
              <Link to="/auth/register">회원가입</Link>
            </div>
          </div>
        )}
      </LoginCategory>
      <Nav>
        <NavList onClick={onFlag}>
          <Link to="/search">
            <span className="nav-item" onClick={onHamMenu}>
              통합검색
            </span>
          </Link>
        </NavList>
        <NavList onClick={onFlag}>
          <Link to="/area">
            <span className="nav-item" onClick={onHamMenu}>
              지역
            </span>
          </Link>
        </NavList>
        <NavList onClick={onFlag}>
          <Link to="/room">
            <span className="nav-item" onClick={onHamMenu}>
              숙소
            </span>
          </Link>
        </NavList>
        <NavList onClick={onFlag}>
          <Link to="/traffic">
            <span className="nav-item" onClick={onHamMenu}>
              교통수단
            </span>
          </Link>
        </NavList>
        <NavList>
          <Link to="/chat">
            <span className="nav-item" onClick={onHamMenu}>
              여행MATE
            </span>
          </Link>
        </NavList>
        <NavList onClick={onFlag}>
          <Link to="/board">
            <span className="nav-item" onClick={onHamMenu}>
              여행후기
            </span>
          </Link>
        </NavList>
      </Nav>
    </HamMenuWrap>
  );
};

export default HamMenuComp;
