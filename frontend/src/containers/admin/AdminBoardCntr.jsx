import { useEffect, useState } from "react";
import AdminBoardComp from "../../components/admin/AdminBoardComp";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoardList,
  getBoardDetail,
  deleteBoard,
  getBoardAction,
  createNotice,
  doneNotice,
} from "../../modules/admin/AdminBoardMod";
import Swal from "sweetalert2";

const AdminBoardCnrt = () => {
  const dispatch = useDispatch();
  const { boardList, totalBoard, board, deleteError, user } = useSelector(
    ({ AdminBoardMod, UserMod }) => ({
      boardList: AdminBoardMod?.boardList,
      totalBoard: AdminBoardMod?.totalBoard,
      board: AdminBoardMod?.board,
      deleteError: AdminBoardMod?.deleteError,
      user: UserMod?.user,
    })
  );
  const [modal, setModal] = useState(false);

  const switchModal = () => {
    setModal(!modal);
  };

  const getBoardInform = e => {
    const { id } = e.currentTarget; //자식 요소를 클릭할 경우 이벤트가 제대로 발생하지 않음. e.target과 차이가 있음.
    dispatch(getBoardDetail({ no: id }));
    switchModal();
  };

  //회원 탈퇴시키기
  const deleteBoardInform = no => {
    //confirm 결과 true면 탈퇴진행
    if (window.confirm(`no.${no} 게시물을 정말 삭제하시겠습니까?`)) {
      dispatch(deleteBoard({ no }));
    }
    return;
  };

  const onNotice = async () => {
    Swal.fire({
      title: "공지사항 제목",
      input: "text",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "취소",
      confirmButtonText: "확인",
    })
      .then(titleRes => {
        const title = titleRes.value;
        if (titleRes.isConfirmed && title.length > 0) {
          Swal.fire({
            title: `${title}`,
            input: "textarea",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "취소",
            confirmButtonText: "확인",
          }).then(contentRes => {
            if (contentRes.isConfirmed) {
              const content = contentRes.value;
              const id = user.id;
              dispatch(createNotice({ content, title, id }));
            }
          });
        }
      })
      .catch(error => {
        Swal.fire({ title: `${error}` });
      });
  };

  const onDone = async e => {
    Swal.fire({
      icon: "question",
      text: "이 공지사항을 비활성화 할까요?",
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: "CANCEL",
      confirmButtonText: "OK",
    })
      .then(result => {
        if (result.isConfirmed) {
          const no = parseInt(e.target.dataset.no);
          dispatch(doneNotice({ no }));
          Swal.fire({ icon: "success", text: "비활성화 했습니다." });
        }
      })
      .catch(error => {
        Swal.fire({ icon: "error", text: `${error}` });
      });
  };

  const onDisableNotice = async () => {
    Swal.fire({
      icon: "warning",
      title: "구현 할까말까 고민 중",
      timer: 1000,
    });
  };

  //정보 확인중 갱신되면 곤란할테니 유저 리스트는 실시간 갱신 안할것임, 회원 탈퇴는 바로 갱신
  useEffect(() => {
    dispatch(getBoardList());
  }, [dispatch, deleteError]);

  useEffect(() => {
    dispatch(getBoardAction());
  }, [dispatch]);

  return (
    <AdminBoardComp
      getBoardInform={getBoardInform}
      deleteBoardInform={deleteBoardInform}
      boardList={boardList}
      totalBoard={totalBoard}
      board={board}
      modal={modal}
      switchModal={switchModal}
      onNotice={onNotice}
      onDone={onDone}
      onDisableNotice={onDisableNotice}
    />
  );
};

export default AdminBoardCnrt;
