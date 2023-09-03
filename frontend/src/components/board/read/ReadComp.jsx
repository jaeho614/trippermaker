import React from "react";
import styled from "styled-components";
import { TitleComp } from "../../common/TitleComp";
import Responsive from "../../common/ResponsiceComp";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEye, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

const ReadContainer = styled.div`
  text-align: left;
  border-bottom: 2px solid ${props => props.theme.border};
  margin-top: 50px;
  padding: 13px 25px;

  .id {
    font-size: 16px;
    font-weight: 400;
    margin-top: 20px;
  }

  .likeandcnt {
    display: flex;
    justify-content: flex-end;
    text-align: right;
  }

  .likeandcnt p {
    margin-left: 20px;

    .icon {
      margin-right: 5px;
    }
  }
  button {
    height: 10px;
    width: 100px;
  }
`;

const Content = styled.div`
  border-bottom: 2px solid ${props => props.theme.border};
  font-size: 18px;
  margin-top: 20px;
  padding: 20px;
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
