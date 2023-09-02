import React, { useState } from "react";
import { styled } from "styled-components";
import Modal from "styled-react-modal";
import AdminUserGraph from "./AdminUserGraph";

import PaginationComp from "../common/PaginationComp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { makeCreatedAt } from "../../lib/makeCreatedAt";

const AdminBoardWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  margin-top: 30px;
`;

const BoardContainer = styled.div`
  background: ${props => props.theme.smoke};

  &:first-child {
    margin-left: 1%;
  }
  &:last-child {
    width: 62%;
    margin-left: 1%;
  }
`;

const BoardName = styled.div`
  background: ${props => props.theme.dark};

  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${props => props.theme.smoke};
    margin-left: 10px;
  }
`;

const Board = styled.div`
  width: 100%;
  background: white;
  border-radius: 20px;
  .list-name {
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding: 14px 0;
    width: 100%;
    background: ${props => props.theme.smoke};
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
      width: 10%;
    }
  }
`;

const BoardInfoContainer = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  align-items: center;
  &.notice {
    background-color: steelblue;
  }
`;

const BoardInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  cursor: pointer;
  line-height: 60px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Detail = styled.li`
  margin-right: 10px;
  // width: 30%;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 8%;

  &:nth-child(3n),
  &:nth-child(2) {
    width: 20%;
  }

  &.title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &.remove-board {
    width: 10%;
  }
`;

const ControlButton = styled.button`
  border: none;

  background: ${props => props.theme.lightblack};
  color: ${props => props.theme.smoke};
  cursor: pointer;
  padding: 7px 12px;
  margin: 10px;

  &:hover {
    background: ${props => props.theme.softblack};
  }
`;

const StyledModal = Modal.styled`
  background: ${props => props.theme.smoke};
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
    border : 1px solid ${props => props.theme.lightblack};
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
  onNotice,
  onDone,
  onDisableNotice,
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <AdminBoardWrap>
      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#000000" }} />
          <span>게시물</span>
        </BoardName>
        <AdminUserGraph totalItem={totalBoard} type={"board"} />
      </BoardContainer>
      <BoardContainer>
        <BoardName>
          <FontAwesomeIcon icon={faChartSimple} style={{ color: "#000000" }} />
          <span>게시물&nbsp;&nbsp;/&nbsp;</span>
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
          {boardList.slice(offset, offset + limit).map(board => (
            <BoardInfoContainer
              key={board.no}
              className={board.grade === 2 ? "notice" : null}
            >
              <BoardInfo onClick={getBoardInform}>
                <Detail>{board.no}</Detail>
                <Detail>{board.id}</Detail>
                <Detail className="title">{board.title}</Detail>
                <Detail>{board.like}</Detail>
                <Detail>{board.cnt}</Detail>
                <Detail>{makeCreatedAt(board.createAt)}</Detail>
              </BoardInfo>
              {board.grade === 2 ? (
                <button onClick={onDone} data-no={board.no}>
                  비활성화
                </button>
              ) : null}
              <ControlButton onClick={() => deleteBoardInform(board.no)}>
                삭제
              </ControlButton>
            </BoardInfoContainer>
          ))}
          <PaginationComp
            total={boardList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <button onClick={onNotice}>공지사항추가</button>
          <button onClick={onDisableNotice}>비활성화된 공지사항보기</button>
          {modal && board && (
            <StyledModal
              isOpen={modal} //true = 열림 / false = 닫힘
              ariahideapp={"false"} //없으면 에러 뜸
              onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
              onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
            >
              <h3>게시글 상세 정보</h3>
              <table>
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
              <ControlButton onClick={switchModal}>닫기</ControlButton>
            </StyledModal>
          )}
        </Board>
      </BoardContainer>
    </AdminBoardWrap>
  );
};

export default AdminBoardComp;
