import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import update from "immutability-helper";

import { changePhoto } from "../../lib/api/profile";
import { check, initializeUser } from "../../modules/auth/UserMod";
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
  nickErrorClear,
} from "../../modules/profile/ProfileMod";
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
import UserProfileComp from "../../components/profile/UserProfileComp";
import SelectButtonBoxComp from "../../components/profile/SelectButtonBoxComp";
import BoardBoxComp from "../../components/profile/BoardBoxComp";
import ReplyBoxComp from "../../components/profile/ReplyBoxComp";
import LikeBoxComp from "../../components/profile/LikeBoxComp";
import WishListBoxComp from "../../components/profile/WishListBoxComp";
import WishListComp from "../../components/profile/WishListComp";
import BeforeSaveComp from "../../components/profile/BeforeSaveComp";
import AfterSaveComp from "../../components/profile/AfterSaveComp";

const ProfileCntr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    duplicateCheck,
  } = useSelector(({ UserMod, ProfileMod, ScheduleMod }) => ({
    id: UserMod?.user.id,
    uno: UserMod?.user.no,
    img_: ProfileMod?.img,
    user: ProfileMod?.user,
    nick: ProfileMod?.nick,
    nickAuth: ProfileMod?.nickAuth,
    nickError: ProfileMod?.nickError,
    withdrawAuth: ProfileMod?.withdrawAuth,
    withdrawError: ProfileMod?.withdrawError,
    boardList: ProfileMod?.boardList,
    totalBoard: ProfileMod?.totalBoard,
    deleteBoardError: ProfileMod?.deleteBoardError,
    replyList: ProfileMod?.replyList,
    totalReply: ProfileMod?.totalReply,
    deleteReplyError: ProfileMod?.deleteReplyError,
    likeList: ProfileMod?.likeList,
    totalLike: ProfileMod?.totalLike,
    deleteLikeError: ProfileMod?.deleteLikeError,
    wishList: ProfileMod?.wishList,
    totalWish: ProfileMod?.totalWish,
    wishListError: ProfileMod?.wishListError,
    wish: ProfileMod?.wish,
    wishError: ProfileMod?.wishError,
    deleteWishError: ProfileMod?.deleteWishError,
    addScheduleError: ScheduleMod?.addScheduleError,
    scheduleList: ScheduleMod?.scheduleList,
    savedList: ScheduleMod?.savedList,
    scheduleListError: ScheduleMod?.scheduleListError,
    saveScheduleListError: ScheduleMod?.saveScheduleListError,
    savedListDeleteError: ScheduleMod?.savedListDeleteError,
    savedListDetail: ScheduleMod?.savedListDetail,
    duplicateCheck: ScheduleMod?.duplicateCheck,
  }));
  const [modal, setModal] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [changeInform, setChangeInform] = useState(false);
  const [boardType, setBoardType] = useState(null);
  const [content, setContent] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [getSubject, setGetSubject] = useState(null);
  const [cards, setCards] = useState(scheduleList);
  const subjectRef = useRef(null);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setCards(prevCards =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [setCards]
  );

  const onGetBoardList = useCallback(() => {
    setBoardType("BOARD");
    dispatch(getBoardList({ id }));
  }, [id]);

  const onGetBoardDetail = useCallback(
    bno => {
      navigate(`/board/read/${bno}`);
    },
    [navigate]
  );

  const onDeleteBoard = useCallback(
    no => {
      dispatch(
        deleteBoard({
          no,
        })
      );
    },
    [dispatch]
  );

  const onGetReplyList = useCallback(() => {
    setBoardType("REPLY");
    dispatch(getReplyList({ uno }));
  }, [dispatch, uno]);

  const onGetReplyDetail = useCallback(
    bno => {
      navigate(`/board/read/${bno}`);
    },
    [navigate]
  );

  const onDeleteReply = useCallback(
    no => {
      dispatch(
        deleteReply({
          no,
        })
      );
    },
    [dispatch]
  );

  const onGetLikeList = useCallback(() => {
    setBoardType("LIKELIST");
    dispatch(
      getLikeList({
        id,
      })
    );
  }, [id]);

  const onGetLikeDetail = useCallback(
    bno => {
      navigate(`/board/read/${bno}`);
    },
    [navigate]
  );

  const onDeleteLike = useCallback(
    no => {
      dispatch(
        deleteLike({
          no,
        })
      );
    },
    [dispatch]
  );

  const onGetWishList = useCallback(() => {
    setBoardType("SCHEDULER");
    setCards(scheduleList);
    dispatch(
      getWishList({
        id,
      })
    );
  }, [scheduleList]);

  const switchModal = useCallback(() => {
    setModal(!modal);
  }, [modal]);

  const onGetWishDetail = useCallback(
    (title, contentId, contentTypeId) => {
      switchModal();
      dispatch(
        getWishDetail({
          title,
          contentId,
          contentTypeId,
        })
      );
      if (wish) {
        dispatch(wishDetailClear());
      }
    },
    [modal, wish]
  );

  const onDeleteWish = useCallback(
    no => {
      dispatch(
        deleteWish({
          no,
        })
      );
    },
    [dispatch]
  );

  const onAddSchedule = useCallback(
    ({ id, contentId, title, contentTypeId }) => {
      dispatch(
        addSchedule({
          id,
          contentId,
          title,
          contentTypeId,
        })
      );
      setCards(scheduleList);
    },
    [scheduleList]
  );

  const onSaveScheduleList = useCallback(() => {
    const subject = subjectRef.current.value;
    setGetSubject(subject);
    dispatch(
      getDuplicateCheck({
        id,
        subject,
      })
    );
  }, [subjectRef]);

  const onSavedListDelete = useCallback(
    _id => {
      dispatch(
        deleteSavedList({
          id,
          _id,
        })
      );
    },
    [dispatch]
  );

  const switchListModal = useCallback(() => {
    setListModal(!listModal);
  }, [listModal]);

  const onGetSavedListDetail = useCallback(
    (id, subject) => {
      switchListModal();
      dispatch(
        getSavedListDetail({
          id,
          subject,
        })
      );
    },
    [listModal]
  );

  const onChange = useCallback(
    e => {
      const { value } = e.target;
      dispatch(
        changeValue({
          value,
        })
      );
    },
    [dispatch]
  );

  const onUploadPhoto = useCallback(
    e => {
      setContent(e.target.files[0]);
    },
    [setContent]
  );

  const onChangePhoto = useCallback(
    async e => {
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
    },
    [content]
  );

  const onChangeProfile = useCallback(() => {
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
  }, [changeInform, nickAuth]);

  const onChangeProfileCancle = useCallback(() => {
    setChangeInform(!changeInform);
  }, [changeInform]);

  const onNickCheck = useCallback(() => {
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
  }, [nick]);

  const onWithdraw = useCallback(() => {
    if (window.confirm("정말로 Tripper Maker를 탈퇴하시겠습니까?")) {
      dispatch(
        withdraw({
          id,
        })
      );
    }
  }, [dispatch]);

  const contentImgFilter = useCallback(content => {
    // 이미지태그 제거 정규표현식
    const imgTagReg = /<[^>]+>/gi;
    const textOnly = content.replace(imgTagReg, "");
    return textOnly;
  }, []);

  useEffect(() => {
    if (!changeInform) {
      dispatch(nickErrorClear());
    }
  }, [changeInform]);

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
  }, [duplicateCheck, getSubject]);

  return (
    <ProfileBlockComp>
      <UserProfileComp>
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
          onChange={onChange}
          onChangeProfile={onChangeProfile}
          onNickCheck={onNickCheck}
          onWithdraw={onWithdraw}
          onChangeProfileCancle={onChangeProfileCancle}
        />
      </UserProfileComp>
      <SelectButtonBoxComp
        totalBoard={totalBoard}
        totalReply={totalReply}
        totalLike={totalLike}
        totalWish={totalWish}
        onGetBoardList={onGetBoardList}
        onGetReplyList={onGetReplyList}
        onGetLikeList={onGetLikeList}
        onGetWishList={onGetWishList}
      />
      <ProfileListComp>
        {boardType === "BOARD" ? (
          <BoardBoxComp
            boardList={boardList}
            onGetBoardDetail={onGetBoardDetail}
            onDeleteBoard={onDeleteBoard}
            contentImgFilter={contentImgFilter}
          />
        ) : boardType === "REPLY" ? (
          <ReplyBoxComp
            replyList={replyList}
            onGetReplyDetail={onGetReplyDetail}
            onDeleteReply={onDeleteReply}
          />
        ) : boardType === "LIKELIST" ? (
          <LikeBoxComp
            likeList={likeList}
            onGetLikeDetail={onGetLikeDetail}
            onDeleteLike={onDeleteLike}
          />
        ) : (
          <WishListBoxComp>
            <WishListComp
              user={user}
              modal={modal}
              wishList={wishList}
              wish={wish}
              switchModal={switchModal}
              onGetWishDetail={onGetWishDetail}
              onDeleteWish={onDeleteWish}
              onAddSchedule={onAddSchedule}
            />
            <BeforeSaveComp
              cards={cards}
              subjectRef={subjectRef}
              moveCard={moveCard}
              onSaveScheduleList={onSaveScheduleList}
            />
            <AfterSaveComp
              savedList={savedList}
              savedListDetail={savedListDetail}
              listModal={listModal}
              switchListModal={switchListModal}
              onGetSavedListDetail={onGetSavedListDetail}
              onSavedListDelete={onSavedListDelete}
            />
          </WishListBoxComp>
        )}
      </ProfileListComp>
    </ProfileBlockComp>
  );
};

export default ProfileCntr;
