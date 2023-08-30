import React, { useState } from "react";
import { styled } from "styled-components";
import PaginationComp from "../common/PaginationComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const LikeListTitle = styled.ul`
  display: flex;
  text-align: center;
  padding: 5px;
  font-weight: 600;
  border-bottom: 1px solid #000;

  li:first-child {
    width: 30%;
  }
  li:nth-child(2) {
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li:nth-child(3) {
    width: 20%;
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

  &.like-boardinfo {
    li:first-child {
      width: 30%;
    }
    li:nth-child(2) {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:nth-child(3) {
      width: 20%;
    }
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

const LikeBoxComp = ({ likeList, onGetLikeDetail, onDeleteLike }) => {
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <>
      <LikeListTitle>
        <li>이메일</li>
        <li>글 제목</li>
        <li>좋아요</li>
      </LikeListTitle>
      {likeList.slice(offset, offset + limit).map(like => (
        <Item key={like.no}>
          <BoardInfo
            className="like-boardinfo"
            onClick={() => onGetLikeDetail(like.bno)}
          >
            <li>{like.bno_board.id}</li>
            <li>{like.bno_board.title}</li>
            <li>
              <Button onClick={() => onDeleteLike(like.no)}>
                <FontAwesomeIcon className="icon" icon={faHeart} />
              </Button>
            </li>
          </BoardInfo>
        </Item>
      ))}
      <div className="pagin">
        {likeList && (
          <PaginationComp
            total={likeList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(LikeBoxComp);
