import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "styled-react-modal";
import { styled } from "styled-components";

import AdminUserGraph from "./AdminUserGraph";
import PaginationComp from "../common/PaginationComp";

const AdminUserWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
`;

const BoardContainer = styled.div`
  background: ${props => props.theme.smoke};
  margin-right: 10px;
  &:first-child {
    margin-left: 1%;
    height: 100%;
    width: 98%;
  }
  &:last-child {
    margin-left: 2%;
    width: 98%;
  }
`;

const BoardName = styled.div`
  background: ${props => props.theme.adminColor};
  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${props => props.theme.white};
    margin-left: 10px;
  }
`;

const Board = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  .list-name {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: ${props => props.theme.smoke};
    border-bottom: 2px solid #333;
    padding: 14px 0;
    padding-left: 5px;
    width: 100%;

    li {
      text-align: center;
      width: 30%;
    }
  }
`;
const UserInfoContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const UserInfo = styled.ul`
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  padding-left: 10px;
  width: 100%;
  line-height: 60px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Detail = styled.li`
  text-align: center;
  padding: 0 10px;
  width: 30%;

  &.remove-user {
    width: 10%;
  }
`;

const ControlButton = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 13px 0;
  padding: 7px 12px;
  &:hover {
    background: ${props => props.theme.hoverButton};
  }
`;

const StyledModal = Modal.styled`
  display:flex;
  align-items:center;
  flex-direction :column;
  justify-content:center;
  background: ${props => props.theme.smoke};
  margin: 0 auto;
  height: 400px;
  width: 600px;

  table{
    width :90%;
  }

    table,
  td,
  th {
    border: 1px solid ${props => props.theme.border};
    border-collapse: collapse;
    margin:0 auto;
    margin-top : 20px;
    padding: 15px;
  }

  th{
    background : #e7e7e7;
  }

  h3{
    text-align:center;
  }
`;

const AdminUserComp = ({
  getUserInform,
  deleteUserInform,
  userList,
  totalUser,
  user,
  modal,
  switchModal,
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <AdminUserWrap>
      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#000000" }} />{" "}
          <span>가입자수</span>
        </BoardName>
        <AdminUserGraph totalItem={totalUser} type={"user"} />
      </BoardContainer>

      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faUser} style={{ color: "#000000" }} />{" "}
          <span>회원관리&nbsp;&nbsp;/&nbsp;</span>
          <span>총 가입자 수({totalUser}명)</span>
        </BoardName>
        <Board>
          <ul className="list-name">
            <li>아이디</li>
            <li>닉네임</li>
            <li>전화번호</li>
            <li></li>
          </ul>

          {userList.slice(offset, offset + limit).map(user => (
            <UserInfoContainer key={user.no}>
              <UserInfo id={user.id} onClick={getUserInform}>
                <Detail>{user.id}</Detail>
                <Detail> {user.nick}</Detail>
                <Detail> {user.phone}</Detail>
              </UserInfo>
              <Detail>
                <ControlButton
                  className="remove-user"
                  onClick={() => deleteUserInform(user.id)}
                >
                  탈퇴
                </ControlButton>
              </Detail>
            </UserInfoContainer>
          ))}
          <PaginationComp
            total={userList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />

          {modal && user && (
            <StyledModal
              isOpen={modal} //true = 열림 / false = 닫힘
              ariahideapp={"false"} //없으면 에러 뜸
              onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
              onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
            >
              <h3>회원 상세 정보</h3>
              <table>
                <tbody>
                  <tr>
                    <th>아이디</th>
                    <td> {user.id}</td>
                    <th>닉네임</th>
                    <td>{user.nick}</td>
                  </tr>
                  <tr>
                    <th>전화번호</th>
                    <td>{user.phone}</td>
                    <th>성별</th>
                    <td>{user.gender ? "여자" : "남자"}</td>
                  </tr>
                  <tr>
                    <th>주소</th>
                    <td colSpan="3">{user.addr1 + user?.addr2}</td>
                  </tr>
                  <tr>
                    <th>우편번호</th>
                    <td>{user.zipcode}</td>
                    <th>등급</th>
                    <td>{user.grade}</td>
                  </tr>
                  <tr>
                    <th>가입날짜</th>
                    <td colSpan="3">{user.reg}</td>
                  </tr>
                </tbody>
              </table>
              <ControlButton onClick={switchModal}>닫기</ControlButton>
            </StyledModal>
          )}
        </Board>
      </BoardContainer>
    </AdminUserWrap>
  );
};

export default AdminUserComp;
