import { styled } from "styled-components";
import { useState } from "react";
import PaginationComp from "../common/PaginationComp";
import { makeCreatedAt } from "../../lib/makeCreatedAt";

const ListTitle = styled.ul`
  display: flex;
  text-align: center;
  padding: 5px;
  font-weight: 600;
  border-bottom: 1px solid #000;

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

  &.reply-boardinfo {
    li:first-child {
      width: 20%;
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

export default ReplyBoxComp;
