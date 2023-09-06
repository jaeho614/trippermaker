import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faList,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const AdminContainer = styled.div`
  display: flex;
  background: #33495e;
  color: white;
  width: 100%;
  height: 100%;
`;

const AdminSideBar = styled.div`
  background: ${props => props.theme.adminColor};
  border-right: 1px solid rgba(2, 2, 2, 0.3);
  height: 100vh;
  width: 250px;
  .logo {
    text-align: center;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    padding: 3rem 0;
    line-height: 30px;

    p {
      background: white;
      font-size: 20px;
      margin: 0 auto;
      margin-top: 10px;
      width: 100px;
    }
  }

  .home-icon {
    position: absolute;
    top: 10px;
    left: 20px;
  }
`;

const AdminNav = styled.ul`
  display: flex;
  flex-direction: column;
  text-align: right;

  li {
    cursor: pointer;
    color: #fff;
    font-size: 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 15px 20px;
    span {
      color: #fff;
      margin-left: 10px;
    }
  }

  li:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const BackButton = styled.div`
  position: absolute;
  left: 15px;
  bottom: 70px;
`;

const AdminMainComp = () => {
  return (
    <>
      <AdminContainer>
        <AdminSideBar>
          <div className="logo">
            <Link to={"/"}>
              TRIPPER
              <br />
              MAKER
            </Link>
            <p>admin</p>
          </div>
          <AdminNav>
            <li>
              <Link to={"/admin/user"}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="icon"
                  style={{ color: "white" }}
                />
                <span>회원관리</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/board"}>
                <FontAwesomeIcon icon={faList} style={{ color: "#fff" }} />
                <span>게시판관리</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/terms"}>
                <FontAwesomeIcon icon={faList} style={{ color: "#fff" }} />
                <span>약관관리</span>
              </Link>
            </li>
            <li>
              <Link to={"/admin/style"}>
                <FontAwesomeIcon icon={faList} style={{ color: "#fff" }} />
                <span>스타일관리</span>
              </Link>
            </li>
          </AdminNav>
          <BackButton>
            <Link to="/">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="2xl"
                className="home-icon"
              />
            </Link>
          </BackButton>
        </AdminSideBar>
        <Outlet />
      </AdminContainer>
    </>
  );
};

export default AdminMainComp;
