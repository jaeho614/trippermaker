import React, { useEffect } from "react";
import WriteActionbuttonsComp from "../../../components/board/write/WriteActionButtonsComp";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { writePost, updatePost } from "../../../modules/board/WriteMod";

const WriteActionButtonsContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title, content, post, postError, originPostId, id } = useSelector(({ WriteMod, UserMod }) => ({
    title: WriteMod.title,
    content: WriteMod.content,
    post: WriteMod.post,
    postError: WriteMod.postError,
    originPostId: WriteMod.originPostId,
    id: UserMod.user.id,
  }));

  // 포스트 등록
  const onPublish = () => {
    console.log("보내기전 no : ", originPostId);
    if (originPostId) {
      dispatch(updatePost({ title, content, no: originPostId }));
      return;
    }
    console.log("글쓰기 버튼 컨테이너에서 전송!!", id);
    dispatch(
      writePost({
        title,
        content,
        id,
      })
    );
  };

  console.log("WriteActionButtonsContainer ===>", title, content);
  //취소
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 실패시 작업
  useEffect(() => {
    console.log("post가 존재하나  : ", post);
    if (post) {
      // const { id } = post;
      console.log("WriteActionButtonsCon=>", post);
      // navigate(`/board/${id}`);
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
