import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { replyReadPost, replyDeletePost } from "../../../modules/board/ReplyReadMod";
import ReplyReadComp from "../../../components/board/reply/ReplyReadComp";
import ReplyActionButtonsComp from "../../../components/board/reply/ReplyActionButtonsComp";
import { replysetOriginPost, replyupdatePost } from "../../../modules/board/ReplyWriteMod";

import Swal from "sweetalert2";
import { getProfile } from "../../../modules/profile/ProfileMod";

const ReplyReadCntr = () => {
  const dispatch = useDispatch();
  const { readNo } = useParams();
  const { replys, content, user, reply, bno, profile } = useSelector(({ ReplyWriteMod, ReplyReadMod, UserMod, ReadMod, ProfileMod }) => ({
    reply: ReplyWriteMod.reply,
    replys: ReplyReadMod.replys,
    content: ReplyReadMod.content,
    user: UserMod?.user,
    profile: ProfileMod.user,
    bno: ReadMod.post?.no
  }));

  useEffect(() => {
    dispatch(
      replyReadPost({
        bno: readNo,
        content: content,
        user: user,
      })
    );
  }, [dispatch, reply]);

  const onEdit = (e) => {
    const no = e.target.dataset.no;
    const content = e.target.dataset.content;
    Swal.fire({
      title: "댓글 수정",
      input: "text",
      inputValue: `${content}`,
      showCancelButton: true,
      confirmButtonText: "submit",
      showLoaderOnConfirm: true, // 필요가 없을거 같기도 하지만 넣음
      preConfirm: (input) => {
        dispatch(replyupdatePost({ no, content: input }));
      },
    });
  };

  const onRemove = async (e) => {
    try {
      const no = e.target.dataset.no;
      dispatch(replyDeletePost({ bno, no }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getProfile({ id: user.id, }));
    }
  }, [dispatch, user]);
  return (
    <>
      <ReplyReadComp content={content} replys={replys} user={user} onEdit={onEdit} onRemove={onRemove} profile={profile} />;
    </>
  );
};

export default ReplyReadCntr;
