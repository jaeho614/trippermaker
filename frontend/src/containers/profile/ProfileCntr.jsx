import { useEffect, useState, useCallback, useRef } from "react";
import ProfileComp from "../../components/profile/ProfileComp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePhoto } from "../../lib/api/profile";
import update from "immutability-helper";

import ProfileMod, {
  changeProfile,
  changeValue,
  changePhotoSuccess,
  changePhotoFailure,
  deleteBoard,
  deleteLike,
  deleteReply,
  getBoardList,
  getLikeList,
  getProfile,
  getReplyList,
  getWishList,
  initializeProfile,
  nickChk,
  withdraw,
  deleteWish,
  getWishDetail,
  wishDetailClear,
} from "../../modules/profile/ProfileMod";
import { check, initializeUser } from "../../modules/auth/UserMod";
import ScheduleMod, {
  addSchedule,
  saveList,
  getScheduleList,
  getSavedList,
  getSavedListDetail,
  getDuplicateCheck,
  initializeError,
  deleteSavedList,
} from "../../modules/schedule/ScheduleMod";
import ProfileBlockComp from "../../components/profile/ProfileBlockComp";
import ProfileFormComp from "../../components/profile/ProfileFormComp";
import ProfileListComp from "../../components/profile/ProfileListComp";
import ImageBoxComp from "../../components/profile/ImageBoxComp";

const ProfileCntr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const {
    id,
    uno,
    img,
    user,
    nick,
    nickAuth,
    nickError,
    withdrawAuth,
    withdrawError,
    boardList,
    totalBoard,
    deleteBoardError,
    replyList,
    totalReply,
    deleteReplyError,
    likeList,
    totalLike,
    deleteLikeError,
    wishList,
    totalWish,
    wishListError,
    wish,
    wishError,
    deleteWishError,
    addScheduleError,
    scheduleList,
    saveScheduleListError,
    savedList,
    savedListError,
    savedListDeleteError,
    savedListDetail,
    scheduleListError,
    duplicateCheck,
  } = useSelector(({ UserMod, ProfileMod, ScheduleMod }) => ({
    id: UserMod.user.id,
    uno: UserMod.user.no,
    img_: ProfileMod.img,
    user: ProfileMod.user,
    nick: ProfileMod.nick,
    nickAuth: ProfileMod.nickAuth,
    nickError: ProfileMod.nickError,
    withdrawAuth: ProfileMod.withdrawAuth,
    withdrawError: ProfileMod.withdrawError,
    boardList: ProfileMod.boardList,
    totalBoard: ProfileMod.totalBoard,
    deleteBoardError: ProfileMod.deleteBoardError,
    replyList: ProfileMod.replyList,
    totalReply: ProfileMod.totalReply,
    deleteReplyError: ProfileMod.deleteReplyError,
    likeList: ProfileMod.likeList,
    totalLike: ProfileMod.totalLike,
    deleteLikeError: ProfileMod.deleteLikeError,
    wishList: ProfileMod.wishList,
    totalWish: ProfileMod.totalWish,
    wishListError: ProfileMod.wishListError,
    wish: ProfileMod.wish,
    wishError: ProfileMod.wishError,
    deleteWishError: ProfileMod.deleteWishError,
    addScheduleError: ScheduleMod.addScheduleError,
    scheduleList: ScheduleMod.scheduleList,
    scheduleListError: ScheduleMod.scheduleListError,
    savedList: ScheduleMod.savedList,
    scheduleListError: ScheduleMod.scheduleListError,
    saveScheduleListError: ScheduleMod.saveScheduleListError,
    savedListDeleteError: ScheduleMod.savedListDeleteError,
    savedListDetail: ScheduleMod.savedListDetail,
    duplicateCheck: ScheduleMod.duplicateCheck,
  }));
  const [changeInform, setChangeInform] = useState(false);
  const [boardType, setBoardType] = useState();
  const [content, setContent] = useState();
  const [userImg, setUserImg] = useState();
  const [newSchedule, setNewSchedule] = useState();
  const [getSubject, setGetSubject] = useState(null);
  const [cards, setCards] = useState(scheduleList);
  const subjectRef = useRef("");
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards(prevCards =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  const onGetBoardList = () => {
    setBoardType("BOARD");
    dispatch(getBoardList({ id }));
  };

  const onGetBoardDetail = bno => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteBoard = no => {
    dispatch(
      deleteBoard({
        no,
      })
    );
  };

  const onGetReplyList = () => {
    setBoardType("REPLY");
    dispatch(getReplyList({ uno }));
  };

  const onGetReplyDetail = bno => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteReply = no => {
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

  const onGetLikeDetail = bno => {
    navigate(`/board/read/${bno}`);
  };

  const onDeleteLike = no => {
    dispatch(
      deleteLike({
        no,
      })
    );
  };

  const onGetWishList = () => {
    setBoardType("SCHEDULER");
    setCards(scheduleList);
    dispatch(
      getWishList({
        id,
      })
    );
  };

  const onGetWishDetail = (title, contentId, contentTypeId) => {
    setModal(!modal);
    if (!wish) {
      dispatch(
        getWishDetail({
          title,
          contentId,
          contentTypeId,
        })
      );
    }
    if (wish) {
      dispatch(wishDetailClear());
    }
  };

  const onDeleteWish = no => {
    dispatch(
      deleteWish({
        no,
      })
    );
  };

  const onAddSchedule = ({ id, contentId, title, contentTypeId }) => {
    setNewSchedule(contentId);
    dispatch(
      addSchedule({
        id,
        contentId,
        title,
        contentTypeId,
      })
    );
    setCards(scheduleList);
  };

  const onSaveScheduleList = () => {
    const subject = subjectRef.current.value;
    setGetSubject(subject);

    dispatch(
      getDuplicateCheck({
        id,
        subject,
      })
    );
  };

  const onSavedListDelete = _id => {
    dispatch(
      deleteSavedList({
        id,
        _id,
      })
    );
  };

  const onGetSavedListDetail = (id, subject) => {
    setListModal(!listModal);
    dispatch(
      getSavedListDetail({
        id,
        subject,
      })
    );
  };

  const onChange = e => {
    const { value } = e.target;
    dispatch(
      changeValue({
        value,
      })
    );
  };

  const onUploadPhoto = e => {
    setContent(e.target.files[0]);
  };

  const onChangePhoto = async e => {
    e.preventDefault();
    if (!content) {
      return alert("사진을 먼저 선택해주세요.");
    }
    const formData = new FormData();
    formData.append("img", content);
    await changePhoto({
      id,
      formData, //formData를 그대로 넘겨줘야 함. img:{formData} 이런식으로 넘기면 안됨
    }).then(res => {
      if (res.status === 200) {
        const { img } = res.data;
        setUserImg(img);
        dispatch(
          changePhotoSuccess({
            img,
          })
        );
      } else {
        const { imgError } = res.data;
        dispatch(
          changePhotoFailure({
            imgError,
          })
        );
      }
    });
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

  const onChangeProfileCancle = () => {
    setChangeInform(!changeInform);
  };

  const onNickCheck = () => {
    const valid = nick => {
      return /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/.test(nick);
    };
    if (nick === "" || nick === null) {
      return alert("닉네임을 입력해주세요.");
    }
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
    if (window.confirm("정말로 Tripper Maker를 탈퇴하시겠습니까?")) {
      dispatch(
        withdraw({
          id,
        })
      );
    }
  };

  const contentImgFilter = content => {
    // 이미지태그 제거 정규표현식
    const imgTagReg = /<[^>]+>/gi;
    const textOnly = content.replace(imgTagReg, "");
    return textOnly;
  };

  useEffect(() => {
    dispatch(
      getProfile({
        id,
      })
    );
    setBoardType("BOARD"); //처음 렌더링 될 때 먼저 보여질 리스트
  }, [dispatch, userImg]);

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
        uno,
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

  useEffect(() => {
    dispatch(
      getWishList({
        id,
      })
    );
  }, [addScheduleError, wishListError, deleteWishError]);

  useEffect(() => {
    if (withdrawAuth) {
      alert("회원탈퇴가 완료되었습니다.");
      dispatch(initializeUser());
      dispatch(initializeProfile());
      return navigate("/");
    }
    if (withdrawError) {
      return alert("다시 시도하여 주십시오.");
    }
  }, [withdrawAuth, withdrawError]);

  useEffect(() => {
    if (nickAuth === null) {
      dispatch(
        getProfile({
          id,
        })
      );
      dispatch(check()); //닉네임 변경시 check해줌으로써 UserMod.user 값 갱신해줌
    }
  }, [nickAuth]);

  useEffect(() => {
    setCards(scheduleList);
    if (addScheduleError === "DUPLICATE") {
      dispatch(initializeError());
      return alert("이미 추가된 항목입니다.");
    }
    dispatch(
      getScheduleList({
        id,
      })
    );
  }, [addScheduleError]);

  useEffect(() => {
    dispatch(
      getSavedList({
        id,
      })
    );
    if (!savedListDeleteError) {
      dispatch(initializeError());
    }
  }, [savedListDeleteError, saveScheduleListError]);

  useEffect(() => {
    const valid = subject => {
      return /^(?=.*[가-힣])[가-힣]{2,10}$/.test(subject);
    };
    if (!valid(getSubject)) {
      dispatch(initializeError());
    }
    if (duplicateCheck !== null) {
      if (getSubject === "" || getSubject === null) {
        dispatch(initializeError());
        return alert("제목을 입력해주세요.");
      } else if (duplicateCheck === false) {
        dispatch(initializeError());
        return alert("같은 이름의 리스트가 이미 존재합니다.");
      } else if (scheduleList?.length === 0) {
        dispatch(initializeError());
        return alert("스케줄 리스트가 비어있습니다.");
      } else if (duplicateCheck && valid(getSubject)) {
        dispatch(
          saveList({
            id,
            subject: getSubject,
            scheduleList: cards,
          })
        );
        subjectRef.current.value = "";
        setCards();
      } else {
        return alert("제목은 2자 이상, 10자 이하 한글만 가능합니다.");
      }
    }
  }, [duplicateCheck]);

  return (
    <ProfileBlockComp>
      <ImageBoxComp
        user={user}
        onUploadPhoto={onUploadPhoto}
        onChangePhoto={onChangePhoto}
      />
      <ProfileFormComp
        user={user}
        nickAuth={nickAuth}
        nickError={nickError}
        changeInform={changeInform}
        onUploadPhoto={onUploadPhoto}
        onChangePhoto={onChangePhoto}
        onChange={onChange}
        onChangeProfile={onChangeProfile}
        onNickCheck={onNickCheck}
        onWithdraw={onWithdraw}
        onChangeProfileCancle={onChangeProfileCancle}
      />
      <ProfileListComp
        user={user}
        modal={modal}
        boardType={boardType}
        boardList={boardList}
        totalBoard={totalBoard}
        replyList={replyList}
        totalReply={totalReply}
        likeList={likeList}
        totalLike={totalLike}
        wishList={wishList}
        totalWish={totalWish}
        wish={wish}
        cards={cards}
        subjectRef={subjectRef}
        savedList={savedList}
        savedListDetail={savedListDetail}
        listModal={listModal}
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
        onGetWishDetail={onGetWishDetail}
        onDeleteWish={onDeleteWish}
        onAddSchedule={onAddSchedule}
        onSaveScheduleList={onSaveScheduleList}
        moveCard={moveCard}
        onGetSavedListDetail={onGetSavedListDetail}
        onSavedListDelete={onSavedListDelete}
        contentImgFilter={contentImgFilter}
      />
    </ProfileBlockComp>
  );
};

export default ProfileCntr;
