import React from "react";
import styled from "styled-components";
import { TitleComp } from "../../common/TitleComp";
import Responsive from "../../common/ResponsiceComp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const ReadContainer = styled.div`
  text-align: left;
  border-bottom: 2px solid #333;

  padding: 13px 25px;
  margin-top: 50px;

  .id {
    font-weight: 400;
    font-size: 16px;
    margin-top: 20px;
  }

  .likeandcnt {
    display: flex;
    text-align: right;
    justify-content: flex-end;
  }

  .likeandcnt p {
    margin-left: 20px;

    .icon {
      margin-right: 5px;
    }
  }
  button {
    width: 100px;
    height: 10px;
  }
`;

const Content = styled.div`
  padding: 20px;
  margin-top: 20px;
  font-size: 18px;
  border-bottom: 2px solid #333;
  div {
    padding-bottom: 20px;
  }
`;

const ReadComp = ({
  post,
  error,
  loading,
  actionButtons,
  myLike,
  changeLike,
  user,
}) => {
  if (error) {
    if (error?.response && error?.response.status === 404) {
      return <div>존재하지않는포스트입니다</div>;
    }
    return <div>오류발생</div>;
  }

  if (loading || !post) {
    return null;
  }

  return (
    <>
      <Responsive>
        <ReadContainer>
          <TitleComp>{post?.title}</TitleComp>
          <p className="id">{post?.id}</p>
          <div className="likeandcnt">
            <p>
              {myLike ? (
                <FontAwesomeIcon
                  className="icon"
                  onClick={changeLike}
                  icon={faHeart}
                  data-id={post?.id}
                  data-no={post?.no}
                />
              ) : (
                <FontAwesomeIcon
                  className="icon"
                  onClick={changeLike}
                  icon={faHeartBroken}
                  data-id={post?.id}
                  data-no={post?.no}
                />
              )}
            </p>
            <p>
              <FontAwesomeIcon
                className="icon"
                icon={faEye}
                style={{ color: "#000000" }}
              />
              {post?.cnt}
            </p>
          </div>
        </ReadContainer>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </Content>
        {user && post?.id === user?.id && actionButtons}
      </Responsive>
    </>
  );
};

export default ReadComp;
