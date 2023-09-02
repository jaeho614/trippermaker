import React, { useEffect } from "react";
import WriteActionbuttonsComp from "../../../components/board/write/WriteActionButtonsComp";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writePost, updatePost } from "../../../modules/board/WriteMod";

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, content, post, postError, originPostId, id } = useSelector(
    ({ WriteMod, UserMod }) => ({
      title: WriteMod.title,
      content: WriteMod.content,
      post: WriteMod.post,
      postError: WriteMod.postError,
      originPostId: WriteMod.originPostId,
      id: UserMod.user.id,
    })
  );

  // 포스트 등록
  const onPublish = () => {
    if (originPostId) {
      dispatch(updatePost({ title, content, no: originPostId }));
      return;
    }
    dispatch(
      writePost({
        title,
        content,
        id,
      })
    );
  };

  //취소
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 실패시 작업
  useEffect(() => {
    if (post) {
      navigate(`/board`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigate, post, postError]);

  return (
    <>
      <WriteActionbuttonsComp onPublish={onPublish} onCancel={onCancel} />
    </>
  );
};

export default WriteActionButtonsContainer;
