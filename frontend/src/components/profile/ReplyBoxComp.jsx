import React, { useState } from "react";

import { styled } from "styled-components";

import { makeCreatedAt } from "../../lib/makeCreatedAt";
import PaginationComp from "../common/PaginationComp";

const ListTitle = styled.ul`
  display: flex;
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid black;
  padding: 5px;

  li:first-child {
    width: 20%;
  }
  li:nth-child(2) {
    width: 40%;
  }
  li:nth-child(3) {
    width: 30%;
  }
  li:nth-child(4) {
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

  &.reply-boardinfo {
    li:first-child {
      width: 20%;
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
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  background: ${props => props.theme.mainColor};
  color: ${props => props.theme.text};
  margin: 10px auto;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.text};
  }
`;

const ReplyBoxComp = ({ replyList, onGetReplyDetail, onDeleteReply }) => {
  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  return (
    <>
      <ListTitle>
        <li>이메일</li>
        <li>내용</li>
        <li>작성일자</li>
        <li></li>
      </ListTitle>
      {replyList.slice(offset, offset + limit).map(reply => (
        <Item key={reply.no}>
          <BoardInfo className="reply-boardinfo">
            <li onClick={() => onGetReplyDetail(reply.bno)}>
              {reply.uno_user.id}
            </li>
            <li>{reply.content}</li>
            <li>{makeCreatedAt(reply.createAt)}</li>
            <li>
              <Button onClick={() => onDeleteReply(reply.no)}>삭제</Button>
            </li>
          </BoardInfo>
        </Item>
      ))}
      <div className="pagin">
        {replyList && (
          <PaginationComp
            total={replyList.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(ReplyBoxComp);
