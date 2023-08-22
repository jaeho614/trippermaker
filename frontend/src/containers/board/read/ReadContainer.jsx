import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  readPost,
  unloadPost,
  likePost,
  isLike,
  getLike,
} from "../../../modules/board/ReadMod";
import ReadComp from "../../../components/board/read/ReadComp";
import ListActionButtonsComp from "../../../components/board/read/ListActionButtonsComp";
import { setOriginPost } from "../../../modules/board/WriteMod";
import { removePost } from "../../../lib/api/posts";

const ReadContainer = () => {
  const { readNo } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, user, myLike, id, no, userId } = useSelector(
    ({ ReadMod, loading, UserMod }) => ({
      post: ReadMod?.post,
      error: ReadMod.error,
      user: UserMod?.user,

      myLike: ReadMod?.myLike,
      userId: UserMod?.user?.id,

      id: ReadMod?.post?.id,
      no: ReadMod?.post?.no,
    })
  );

  const changeLike = () => {
    dispatch(
      isLike({
        id: userId,
        bno: no,
      })
    );
  };

  useEffect(() => {
    dispatch(readPost(readNo), likePost(readNo, user));
    return () => {
      dispatch(unloadPost());
    };
  }, [readNo, user]);

  useEffect(() => {
    if (id) {
      dispatch(
        getLike({
          id,
          bno: no,
        })
      );
    }
  }, [id]);

  const onEdit = () => {
    dispatch(setOriginPost(post));
    navigate("/board/write");
  };

  const onRemove = async () => {
    try {
      const no = readNo;
      await removePost(no);
      navigate("/board");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ReadComp
      changeLike={changeLike}
      myLike={myLike}
      post={post}
      loading={loading}
      error={error}
      user={user}
      actionButtons={
        <ListActionButtonsComp onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default React.memo(ReadContainer);
