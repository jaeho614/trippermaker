import { styled } from "styled-components";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PaginationComp from "../common/PaginationComp";
import { useState } from "react";
import { makeCreatedAt } from "../../lib/makeCreatedAt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoardListTitle = styled.ul`
  display: flex;
  text-align: center;
  padding: 10px;
  justify-content: space-around;
  font-weight: 600;
  border-bottom: 1px solid #000;

  li:first-child {
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 2px;
  }

  li:nth-child(2) {
    width: 40%;
  }

  li:nth-child(3) {
    width: 30%;
  }

  li:nth-child(4) {
    width: 10%;
    margin: 0 4px;
    @media (max-width: 768px) {
      display: none;
    }
  }

  li:nth-child(5) {
    width: 10%;
    margin: 0 2px;
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
  background: none;
  justify-content: space-around;
  align-items: center;
`;

const BoardInfo = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  text-align: center;
  line-height: 50px;

  li:first-child {
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      font-weight: 800;
    }
  }

  li:nth-child(2) {
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  li:nth-child(3) {
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
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
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 7px 15px;
  margin: 10px auto;
  background: ${props => props.theme.bgcolor};
  border: none;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.subcolor};
    color: #fff;
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

export default BoardBoxComp;
