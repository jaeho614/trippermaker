import { Link } from "react-router-dom";

import styled from "styled-components";

import { makeCreatedAt } from "../../lib/makeCreatedAt";

const MainBoardWarraper = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  height: 600px;
  width: 45%;

  h2 {
    font-weight: 600;
    border-bottom: 2px solid #111;
    padding: 20px 0;
    span {
      color: ${props => props.theme.red};
      font-weight: 600;
    }
  }

  .add-list {
    position: absolute;
    cursor: pointer;
    padding: 5px;
    top: 30px;
    right: 0;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const ListContainer = styled.div`
  margin-top: 20px;
  .board-list {
    display: flex;
    border-bottom: 1px solid ${props => props.theme.lightblack};
    padding: 10px 10px 20px;
    &:hover {
      opacity: 0.8;
    }
  }
  .board-list-text {
    margin-left: 20px;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
  }
  .write-id {
    margin-top: 20px;
  }

  .createat {
    color: ${props => props.theme.lightblack};
    font-size: 14px;
    margin-top: 10px;
  }
`;

const BoardListImg = styled.img`
  width: 180px;
`;

const BoardListItem = ({ post }) => {
  if (!post) {
    return <div>오류</div>;
  }

  const { no, id, title, createAt } = post;
  return (
    <ListContainer>
      <Link to={`/board/read/${no}`}>
        <div className="board-list">
          <BoardListImg src="/assets/mainslide.jpeg" />
          <div className="board-list-text">
            <h3 className="title">{title}</h3>
            <p className="write-id">{id}</p>
            <p className="createat"> {makeCreatedAt(createAt)}</p>
          </div>
        </div>
      </Link>
    </ListContainer>
  );
};

const MainBoardComp = ({ posts, error }) => {
  return (
    <>
      <MainBoardWarraper>
        <h2>
          <span>Hot!</span> 여행후기
        </h2>
        {posts &&
          posts.map((post, index) => (
            <BoardListItem key={post.no} post={post} />
          ))}
        <Link to="/board">
          <span className="add-list"> + 더보기</span>
        </Link>
      </MainBoardWarraper>
    </>
  );
};

export default MainBoardComp;
