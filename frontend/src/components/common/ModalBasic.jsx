import { useEffect, useRef } from "react";

import { styled } from "styled-components";

import styles from "./ModalBasic.css";
import KakaoMapComp from "./KakaoMapComp";

const ModalBlock = styled.div`
  position: absolute;
  text-align: center;
  background-color: ${props => props.theme.mainColor};
  border-radius: 20px;
  margin: 0 auto;
  height: 100%;
  width: 700px;
  top: 80px;
  left: 25px;
  z-index: 9999;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .title {
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.text};
  }

  .close {
    font-size: 20px;
    background: none;
    color: ${props => props.theme.text};
    border: none;
  }
  .Modal-item {
    text-align: left;
    width: 100%;
    :first-child {
      display: inline-block;
      color: ${props => props.theme.text};
      padding-left: 5px;
      width: 20%;
    }
    :last-child {
      display: inline-block;
      color: ${props => props.theme.text};
      width: 75%;
    }
  }
`;

const ModalBasic = ({ setModalOpen, mapData, getDetail, onGetDetail }) => {
  const { title, mapx, mapy, addr } = mapData;
  const closeModal = () => {
    setModalOpen(false);
  }; // 모달 끄기 (X버튼 onClick 이벤트 핸들러)

  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = e => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalOpen(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);
    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    // 모달창을 useRef로 잡아준다.
    <>
      <ModalBlock ref={modalRef}>
        <button className="close" onClick={closeModal}>
          X
        </button>
        <div className="title">{title}</div>
        {onGetDetail?.contenttypeid === "32" ? (
          <>
            <div className="Modal-item">
              <div className="Modal-left">보유 룸 갯수</div>
              <div className="Modal-right">
                : {onGetDetail?.roomcount ? onGetDetail.roomcount : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">룸 타입</div>
              <div className="Modal-right">
                : {onGetDetail?.roomtype ? onGetDetail.roomtype : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">체크인</div>
              <div className="Modal-right">
                : {onGetDetail?.checkintime ? onGetDetail.checkintime : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">체크아웃</div>
              <div className="Modal-right">
                : {onGetDetail?.checkouttime ? onGetDetail.checkouttime : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">취사 가능여부</div>
              <div className="Modal-right">
                : {onGetDetail?.chkcooking ? onGetDetail.chkcooking : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">이용시설</div>
              <div className="Modal-right">
                : {onGetDetail?.foodplace ? onGetDetail.foodplace : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">전화번호</div>
              <div className="Modal-right">
                :{" "}
                {onGetDetail?.infocenterlodging
                  ? onGetDetail.infocenterlodging
                  : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">주차 가능여부</div>
              <div className="Modal-right">
                :{" "}
                {onGetDetail?.parkinglodging ? onGetDetail.parkinglodging : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">숙박 예약</div>
              <div className="Modal-right">
                :{" "}
                {onGetDetail?.reservationlodging
                  ? onGetDetail.reservationlodging
                  : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">건물 이용 범위</div>
              <div className="Modal-right">
                : {onGetDetail?.scalelodging ? onGetDetail.scalelodging : "-"}
              </div>
            </div>
            {onGetDetail?.reservationurl ? (
              <div className="Modal-item">
                <div className="Modal-left">예약링크</div>:{" "}
                <div
                  className="Moda-right"
                  dangerouslySetInnerHTML={{
                    __html: onGetDetail.reservationurl,
                  }}
                />
              </div>
            ) : (
              <div className="Modal-item">
                <div className="Modal-left">예약링크</div>
                <div className="Modal-right">: -</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="Modal-item">
              <div className="Modal-left">전화번호</div>
              <div className="Modal-right">
                : {onGetDetail?.infocenter ? onGetDetail.infocenter : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">휴일</div>
              <div className="Modal-right">
                : {onGetDetail?.restdate ? onGetDetail.restdate : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">컨텐츠</div>
              <div className="Modal-right">
                : {onGetDetail?.expguide ? onGetDetail.expguide : "-"}
              </div>
            </div>
            {onGetDetail?.usetime ? (
              <div className="Modal-item">
                <div className="Modal-left">이용시간</div>:{" "}
                <div
                  className="Modal-right"
                  dangerouslySetInnerHTML={{ __html: onGetDetail.usetime }}
                />
              </div>
            ) : (
              <div className="Modal-item">
                <div className="Modal-left">이용시간</div>
                <div className="Modal-right">: -</div>
              </div>
            )}
            <div className="Modal-item">
              <div className="Modal-left">주차 가능여부</div>
              <div className="Modal-right">
                : {onGetDetail?.parking ? onGetDetail.parking : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">반려동물 동반여부</div>
              <div className="Modal-right">
                : {onGetDetail?.chkpet ? onGetDetail.chkpet : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="Modal-left">신용카드 이용</div>
              <div className="Modal-right">
                : {onGetDetail?.chkcreditcard ? onGetDetail.chkcreditcard : "-"}
              </div>
            </div>
          </>
        )}
        {addr ? <div className="addr">{addr}</div> : null}
        <KakaoMapComp mapx={mapx} mapy={mapy} />
      </ModalBlock>
    </>
  );
};
export default ModalBasic;
