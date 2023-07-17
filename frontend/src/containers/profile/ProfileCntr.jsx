import { useEffect, useState } from "react";
import ProfileComp from "../../components/profile/ProfileComp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileMod, {
  changeProfile,
  changeValue,
  deleteBoard,
  deleteLike,
  deleteReply,
  getBoardList,
  getLikeList,
  getProfile,
  getReplyList,
  nickChk,
} from "../../modules/profile/ProfileMod";

const ProfileCntr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [changeInform, setChangeInform] = useState(false);
  const [modal, setModal] = useState(false);
  const {
    id,
    user,
    nick,
    nickAuth,
    nickError,
    boardList,
    totalBoard,
    deleteBoardError,
    replyList,
    totalReply,
    deleteReplyError,
    likeList,
    totalLike,
    deleteLikeError,
  } = useSelector(({ UserMod, ProfileMod }) => ({
    id: UserMod.user.id,
    user: ProfileMod.user,
    nick: ProfileMod.nick,
    nickAuth: ProfileMod.nickAuth,
    nickError: ProfileMod.NickError,
    boardList: ProfileMod.boardList,
    totalBoard: ProfileMod.totalBoard,
    deleteBoardError: ProfileMod.deleteBoardError,
    replyList: ProfileMod.replyList,
    totalReply: ProfileMod.totalReply,
    deleteReplyError: ProfileMod.deleteReplyError,
    likeList: ProfileMod.likeList,
    totalLike: ProfileMod.totalLike,
    deleteLikeError: ProfileMod.deleteLikeError,
  }));
  const [boardType, setBoardType] = useState();
  const wishList = [16, 17, 18, 19, 20];

  const onGetBoardList = () => {
    setBoardType("BOARD");
    dispatch(getBoardList({ id }));
  };

  const onGetBoardDetail = (bno) => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteBoard = (no) => {
    dispatch(
      deleteBoard({
        no,
      })
    );
  };

  const onGetReplyList = () => {
    setBoardType("REPLY");
    dispatch(getReplyList({ id }));
  };

  const onGetReplyDetail = (bno) => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteReply = (no) => {
    dispatch(
      deleteReply({
        no,
      })
    );
  };

  const onGetLikeList = () => {
    setBoardType("LIKELIST");
    dispatch(
      getLikeList({
        id,
      })
    );
  };

  const onGetLikeDetail = (bno) => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteLike = (no) => {
    dispatch(
      deleteLike({
        no,
      })
    );
  };

  const onGetWishList = () => {
    setBoardType("SCHEDULER");
  };

  const onChange = (e) => {
    const { value } = e.target;
    dispatch(
      changeValue({
        value,
      })
    );
  };

  const onChangePhoto = () => {
    console.log("사진바꾸기");
  };

  const onChangeProfile = () => {
    if (!changeInform) {
      return setChangeInform(!changeInform);
    }
    if (changeInform && !nickAuth) {
      return alert("닉네임을 확인하여 주세요.");
    } else if (changeInform && nickAuth) {
      setChangeInform(!changeInform);
      dispatch(
        changeProfile({
          id,
          nick,
        })
      );
    }
  };

  const onNickCheck = () => {
    const valid = (nick) => {
      return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/.test(nick);
    };
    if (valid(nick)) {
      dispatch(
        nickChk({
          nick,
        })
      );
    } else {
      return alert(
        "닉네임은 2자 이상, 10자 이하 한글, 영어, 숫자 조합이어야 합니다."
      );
    }
  };

  const onWithdraw = () => {
    console.log("회원탈퇴");
  };

  useEffect(() => {
    dispatch(
      getProfile({
        id,
      })
    );
    //total length만 불러오는 action 따로 만들기
    dispatch(
      getReplyList({
        id,
      })
    );
    setBoardType("BOARD"); //처음 렌더링 될 때 먼저 보여질 리스트
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getBoardList({
        id,
      })
    );
  }, [deleteBoardError]);

  useEffect(() => {
    dispatch(
      getReplyList({
        id,
      })
    );
  }, [deleteReplyError]);

  useEffect(() => {
    dispatch(
      getLikeList({
        id,
      })
    );
  }, [deleteLikeError]);
  console.log(nickError, "컨테이너");
  return (
    <div>
      <ProfileComp
        user={user}
        nick={nick}
        nickAuth={nickAuth}
        nickError={nickError}
        modal={modal}
        changeInform={changeInform}
        boardType={boardType}
        boardList={boardList}
        totalBoard={totalBoard}
        replyList={replyList}
        totalReply={totalReply}
        likeList={likeList}
        totalLike={totalLike}
        wishList={wishList}
        onGetBoardList={onGetBoardList}
        onGetBoardDetail={onGetBoardDetail}
        onDeleteBoard={onDeleteBoard}
        onGetReplyList={onGetReplyList}
        onGetReplyDetail={onGetReplyDetail}
        onDeleteReply={onDeleteReply}
        onGetLikeList={onGetLikeList}
        onGetLikeDetail={onGetLikeDetail}
        onDeleteLike={onDeleteLike}
        onGetWishList={onGetWishList}
        onChangePhoto={onChangePhoto}
        onChange={onChange}
        onNickCheck={onNickCheck}
        onChangeProfile={onChangeProfile}
        onWithdraw={onWithdraw}
      />
    </div>
  );
};

export default ProfileCntr;
