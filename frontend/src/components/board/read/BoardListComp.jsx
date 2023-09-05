import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { TitleComp, SubTitleComp } from "../../../components/common/TitleComp";
import WrapperComp from "../../../components/common/WrapperComp";
import ButtonComp from "../../../components/common/ButtonComp";
import PaginationComp from "../../common/PaginationComp";
import { makeCreatedAt } from "../../../lib/makeCreatedAt";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ListContainer = styled.div`
  margin-top: 50px;

  .board-list {
    display: flex;
    position: relative;
    cursor: pointer;
    background: ${props => props.theme.mainColor};
    margin: 0 auto;
    padding: 20px;
    width: 80%;
    transition: 0.3s;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

    &.notice {
      background-color: steelblue;
    }
  }

  .board-list:hover {
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.22), 0 8px 8px rgba(0, 0, 0, 0.22);
  }

  .board-list-text {
    overflow: hidden;
    margin-top: 20px;
    margin-left: 20px;
    white-space: wrap;
  }

  .title {
    overflow: hidden;
    font-size: 28px;
    font-weight: 600;
    color: ${props => props.theme.text};
    margin-top: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .board-list-text {
    margin-top: 1rem;
    margin-left: 20px;
    width: 55%;
  }

  .des {
    margin-top: 10px;
  }

  .nick {
    margin-top: 10px;
    font-size: 12px;
  }

  .date {
    font-size: 16px;
    margin-top: 5px;
  }
  .content {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 100%;
    margin-top: 1rem;
    text-overflow: ellipsis;
  }

  .write-id {
    overflow: hidden;
    font-weight: 500;
    color: ${props => props.theme.text};
    margin-top: 1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .createat {
    font-size: 16px;
    color: ${props => props.theme.text};
    margin-top: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .likeandcnt {
    display: flex;
    position: absolute;
    top: 20px;
    right: 20px;

    .icon {
      margin-right: 3px;
    }
    div {
      margin-left: 14px;
      color: ${props => props.theme.text};
    }
  }

  @media (max-width: 1200px) {
    margin-top: 30px;
    .title {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    .title {
      font-size: 18px;
    }
    .write-id {
      font-size: 14px;
    }

    .createat {
      font-size: 14px;
    }
    .likeandcnt {
      font-size: 12px;
    }
  }
`;
const WriteButton = styled(ButtonComp)`
  position: relative;
  text-align: center;
  margin: 20px 0;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const BoardListTitle = styled(TitleComp)`
  text-align: center;
`;

const BoardListImg = styled.img`
  width: 400px;

  @media (max-width: 1200px) {
    width: 300px;
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const BoardListItem = ({ post, likeCount }) => {
  if (!post) {
    return <div>오류</div>;
  }

  const { no, id, title, createAt, updateAt, like, cnt, grade } = post;

  return (
    <ListContainer>
      <Link to={`/board/read/${no}`}>
        <div className={grade === 2 ? "board-list notice" : "board-list"}>
          {grade === 1 ? <BoardListImg src="/assets/mainslide.jpeg" /> : null}
          <div className="board-list-text">
            <div className="title">{title}</div>
            <div className="likeandcnt">
              <div>
                <FontAwesomeIcon
                  className="icon"
                  icon={faHeart}
                  data-cnt={likeCount === 0 ? parseInt(post.like) : likeCount}
                />
                {like}
              </div>
              <div>
                <FontAwesomeIcon
                  className="icon"
                  icon={faEye}
                  style={{ color: "#000000" }}
                />
                {cnt}
              </div>
            </div>
            <p className="write-id">{id}</p>
            {updateAt ? (
              <p className="createat">수정일자 : {makeCreatedAt(updateAt)}</p>
            ) : (
              <p className="createat">작성일자 : {makeCreatedAt(createAt)}</p>
            )}
          </div>
        </div>
      </Link>
    </ListContainer>
  );
};

const BoardListComp = ({ posts, showWriteButton, error, notices }) => {
  const limit = 5;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  if (error) {
    return <div>에러</div>;
  }
  return (
    <>
      <WrapperComp>
        <BoardListTitle>여행 후기</BoardListTitle>
        <SubTitleComp>전국 여행후기를 남겨주세요!</SubTitleComp>
        {showWriteButton && (
          <WriteButton to={"/board/write"}>글쓰기</WriteButton>
        )}
        {notices &&
          notices.notices.map(notice => (
            <BoardListItem key={notice.no} post={notice} />
          ))}
        {posts &&
          posts
            .slice(offset, offset + limit)
            .map(post => <BoardListItem key={post.no} post={post} />)}
        <div className="pagin">
          {posts && (
            <PaginationComp
              total={posts?.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          )}
        </div>
      </WrapperComp>
    </>
  );
};

export default BoardListComp;
