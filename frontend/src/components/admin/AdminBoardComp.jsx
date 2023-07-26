import React, { useState } from "react";
import { styled } from "styled-components";
import ThemeComp from "../common/ThemeComp";
import Modal from "styled-react-modal";
import AdminUserGraph from "./AdminUserGraph";

import PaginationComp from "../common/PaginationComp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faUser } from "@fortawesome/free-solid-svg-icons";
import { makeCreatedAt } from "../../lib/makeCreatedAt";

const AdminBoardWrap = styled.div`
  width: 1600px;
  margin: 0 auto;
  display: flex;
  margin-top: 30px;
`;

const BoardContainer = styled.div`
  background: ${ThemeComp.smoke};

  &:first-child {
    width: 35%;
    height: 100%;
    margin-left: 1%;
  }
  &:last-child {
    width: 62%;
    margin-left: 1%;
  }
`;

const BoardName = styled.div`
  background: ${ThemeComp.dark};

  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${ThemeComp.smoke};
    margin-left: 10px;
  }
`;

const Board = styled.div`
  background: white;
  border-radius: 20px;
  .list-name {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 14px 0;
    width: 100%;
    background: ${ThemeComp.smoke};
    border-bottom: 2px solid #333;
    li {
      text-align: center;
      width: 5%;
      line-height: 30px;
    }

    li:nth-child(3n),
    li:nth-child(2) {
      width: 20%;
    }

    li:first-child {
      line-height: 17px;
    }
  }
`;

const BoardInfoContainer = styled.div`
  display: flex;
`;

const BoardInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  /* background: ${ThemeComp.smoke}; */
  border-bottom: 1px solid ${ThemeComp.lightblack};
  cursor: pointer;
  line-height: 6op0px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Detail = styled.span`
  margin-right: 10px;
  width: 30%;
  text-align: center;
  width: 5%;

  &:nth-child(3n),
  &:nth-child(2) {
    width: 20%;
  }

  &.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ControlButton = styled.button`
  border: none;
  background: ${ThemeComp.lightblack};
  color: ${ThemeComp.smoke};
  cursor: pointer;
  padding: 7px 12px;
  margin-top: 20px;

  &:hover {
    background: ${ThemeComp.softblack};
  }
`;

const StyledModal = Modal.styled`
background: ${ThemeComp.smoke};
height: 800px;
width: 800px;
margin: 0 auto;
display:flex;
flex-direction :column;
align-items:center;
justify-content:center;

table{
  width :90%;
  table-layout: fixed;
}

  table,
td,
th {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 15px;
  margin:0 auto;
  margin-top : 20px;
}

th{
  background : #e7e7e7;
  width : 100px;
}

h3{
  text-align:center;
}

.content-title{
  margin-top : 20px;
  font-size: 20px;
  font-weight : 600;
}

.content{
height : 300px;
width : 85%;
overflow:auto;
margin-top : 20px;
border : 1px solid ${ThemeComp.lightblack};
padding: 20px;
line-height : 20px;
}

`;

const AdminBoardComp = ({
  getBoardInform,
  deleteBoardInform,
  boardList,
  totalBoard,
  board,
  modal,
  switchModal,
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <AdminBoardWrap>
      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#000000" }} />{" "}
          <span>게시물</span>
        </BoardName>
        <AdminUserGraph totalItem={totalBoard} type={"board"} />
      </BoardContainer>

      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#000000" }} />{" "}
          <span>게시물 / </span>
          <span>총 게시물 수({totalBoard})개</span>
        </BoardName>
        <Board>
          <ul className="list-name">
            <li>게시물 번호</li>
            <li>작성자</li>
            <li>제목</li>
            <li>좋아요</li>
            <li>조회수</li>
            <li>작성일</li>
            <li></li>
          </ul>
          {boardList.slice(offset, offset + limit).map((board) => (
            <BoardInfoContainer key={board.no}>
              <BoardInfo id={board.no} onClick={getBoardInform}>
                <Detail>{board.no}</Detail>
                <Detail>{board.id}</Detail>
                <Detail className="title">{board.title}</Detail>
                <Detail>{board.like}</Detail>
                <Detail>{board.cnt}</Detail>
                <Detail>{makeCreatedAt(board.createAt)}</Detail>
                <Detail>
                  <ControlButton onClick={() => deleteBoardInform(board.no)}>
                    삭제
                  </ControlButton>
                </Detail>
              </BoardInfo>
            </BoardInfoContainer>
          ))}
          <PaginationComp
            total={boardList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          {modal && board && (
            <StyledModal
              isOpen={modal} //true = 열림 / false = 닫힘
              ariahideapp={"false"} //없으면 에러 뜸
              onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
              onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
            >
              <h3>게시글 상세 정보</h3>
              <table>
                {/* <thead>
                  <tr>
                    <th></th>
                    <th>Ipsum</th>
                    <th>Ipsum</th>
                    <th>Ipsum</th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <th>게시물번호</th>
                    <td> {board.no}</td>
                    <th>작성자</th>
                    <td> {board.id}</td>
                  </tr>
                  <tr>
                    <th>제목</th>
                    <td colSpan="3">{board.title}</td>
                  </tr>
                  {/* <tr>
                    <th>내용</th>
                    <td colSpan="3" className="content">
                      {board.content}
                    </td>
                  </tr> */}

                  <tr>
                    <th>좋아요</th>
                    <td>{board.like}</td>
                    <th>조회수</th>
                    <td> {board.cnt}</td>
                  </tr>
                  <tr>
                    <th>작성일</th>
                    <td colSpan="3"> {makeCreatedAt(board.createAt)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="content-title">내용</p>
              <div className="content">{board.content}</div>

              {/* <div>게시물 번호 : {board.no}</div>
              <div>작성자 : {board.id}</div>
              <div>제목 : {board.title}</div>
              <div>사진 : {board.img}</div>
              <div>내용 : {board.content}</div>
              <div>좋아요 : {board.like}</div>
              <div>조회수 : {board.cnt}</div>
              <div>작성일 : {board.createAt}</div> */}
              <ControlButton onClick={switchModal}>닫기</ControlButton>
            </StyledModal>
          )}
        </Board>
      </BoardContainer>
    </AdminBoardWrap>
  );
};

export default AdminBoardComp;
