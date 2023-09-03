import React, { useState } from "react";
import { styled } from "styled-components";
import Modal from "styled-react-modal";
import AdminUserGraph from "./AdminUserGraph";

import PaginationComp from "../common/PaginationComp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { makeCreatedAt } from "../../lib/makeCreatedAt";

const AdminBoardWrap = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
`;

const BoardContainer = styled.div`
  background: ${props => props.theme.smoke};

  &:first-child {
    margin-left: 1%;
  }
  &:last-child {
    margin-left: 1%;
    width: 62%;
  }
`;

const BoardName = styled.div`
  background: ${props => props.theme.adminColor};
  font-size: 20px;
  padding: 10px 20px;

  span {
    color: ${props => props.theme.smoke};
    margin-left: 10px;
  }
`;

const Board = styled.div`
  background: ${props => props.theme.white};
  border-radius: 20px;
  width: 100%;

  .list-name {
    display: flex;
    justify-content: space-around;
    text-align: center;
    background: ${props => props.theme.smoke};
    border-bottom: 2px solid ${props => props.theme.border};
    padding: 14px 0;
    width: 100%;

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
      width: 10%;
      line-height: 17px;
    }
  }
`;

const BoardInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.border};

  &.notice {
    background-color: steelblue;
  }
`;

const BoardInfo = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  width: 100%;
  line-height: 60px;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const Detail = styled.li`
  overflow: hidden;
  text-align: center;
  margin-right: 10px;
  width: 8%;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:nth-child(3n),
  &:nth-child(2) {
    width: 20%;
  }

  &.title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.remove-board {
    width: 10%;
  }
`;

const ControlButton = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 10px;
  padding: 7px 12px;

  &:hover {
    background: ${props => props.theme.hoverButton};
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items:center;
  flex-direction :column;
  justify-content:center;
  background: ${props => props.theme.smoke};
  height: 800px;
  width: 800px;
  margin: 0 auto;

  table{
    width :90%;
    table-layout: fixed;
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
    width : 100px;
  }

  h3{
    text-align: center;
  }

  .content-title{
    font-size: 20px;
    font-weight : 600;
    margin-top : 20px;
  }

  .content{
    border : 1px solid ${props => props.theme.lightblack};
    margin-top : 20px;
    padding: 20px;
    height : 300px;
    width : 85%;
    overflow:auto;
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
