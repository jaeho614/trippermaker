import React, { useState } from "react";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

import { makeCreatedAt } from "../../lib/makeCreatedAt";
import PaginationComp from "../common/PaginationComp";

const BoardListTitle = styled.ul`
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 10px;

  li:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 2px;
    width: 30%;
  }

  li:nth-child(2) {
    width: 40%;
  }

  li:nth-child(3) {
    width: 30%;
  }

  li:nth-child(4) {
    margin: 0 4px;
    width: 10%;
    @media (max-width: 768px) {
      display: none;
    }
  }

  li:nth-child(5) {
    margin: 0 2px;
    width: 10%;
    @media (max-width: 768px) {
      display: none;
    }
  }

  li:nth-child(6) {
    width: 10%;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: none;
`;

const BoardInfo = styled.ul`
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  text-align: center;
  padding: 10px;
  line-height: 50px;
  width: 100%;

  li:first-child {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 30%;
    white-space: nowrap;

    &:hover {
      font-weight: 800;
    }
  }

  li:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 40%;
    white-space: nowrap;
  }

  li:nth-child(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 30%;
    white-space: nowrap;
  }

  li:nth-child(4) {
    width: 10%;
    @media (max-width: 768px) {
      display: none;
    }
  }

  li:nth-child(5) {
    width: 10%;
    @media (max-width: 768px) {
      display: none;
    }
  }

  li:nth-child(6) {
    width: 10%;
  }
`;

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background: ${props => props.theme.mainColor};
  color: ${props => props.theme.text};
  font-size: 14px;
  border: none;
  border-radius: 10px;
  margin: 10px auto;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
  }
`;

const BoardBoxComp = ({
  boardList,
  onGetBoardDetail,
  onDeleteBoard,
  contentImgFilter,
}) => {
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  return (
    <>
      <BoardListTitle>
        <li>제목</li>
        <li className="content">내용</li>
        <li>작성일자</li>
        <li>좋아요</li>
        <li>조회수</li>
        <li></li>
      </BoardListTitle>
      {boardList?.map(board => (
        <Item key={board.no}>
          <BoardInfo>
            <li onClick={() => onGetBoardDetail(board.no)}>{board.title}</li>
            <li
              className="content"
              dangerouslySetInnerHTML={{
                __html: contentImgFilter(board.content),
              }}
            ></li>
            <li>{makeCreatedAt(board.createAt)}</li>
            <li>
              <FontAwesomeIcon className="icon" icon={faHeart} />
              <span> {board.like}</span>
            </li>
            <li>
              <FontAwesomeIcon className="icon" icon={faEye} />
              <span> {board.cnt}</span>
            </li>
            <li>
              <Button onClick={() => onDeleteBoard(board.no)}>삭제</Button>
            </li>
          </BoardInfo>
        </Item>
      ))}
      <div className="pagin">
        {boardList && (
          <PaginationComp
            total={boardList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(BoardBoxComp);
