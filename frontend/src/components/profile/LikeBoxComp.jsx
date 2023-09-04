import React, { useState } from "react";

import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import PaginationComp from "../common/PaginationComp";

const LikeListTitle = styled.ul`
  display: flex;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding: 5px;

  li:first-child {
    width: 30%;
  }
  li:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50%;
    white-space: nowrap;
  }
  li:nth-child(3) {
    width: 20%;
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
  width: 100%;
  line-height: 50px;

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

  &.like-boardinfo {
    li:first-child {
      width: 30%;
    }

    li:nth-child(2) {
      overflow: hidden;
      text-overflow: ellipsis;
      width: 50%;
      white-space: nowrap;
    }

    li:nth-child(3) {
      width: 20%;
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background: ${props => props.theme.mainColor};
  font-size: 14px;
  border: none;
  border-radius: 10px;
  margin: 10px auto;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
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
