import React from "react";

import { styled } from "styled-components";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  overflow: auto;
  background: ${props => props.theme.mainColor};
  border-radius: 10px;
  padding: 15px;
  height: 550px;
  width: 600px;

  .title{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    border-bottom: 2px solid ${props => props.theme.border};
    padding: 20px 0 ;
  }

  .sub-title{
    font-size:16px;
    font-weight: 500;
  }

  div{
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }

  .Modal-item{
    :first-child{
      width: 35%;
    }
    :last-child{
      width: 65%;
    }
  }

  .modal-close{
    display:block;
    curosr:pointer;
    background : ${props => props.theme.button};
    color : ${props => props.theme.buttonText};
    margin: 0 auto;
    margin-top :20px;
    padding: 5px 10px;
  }
`;

const WishListBox = styled.div`
  overflow: auto;
  background: ${props => props.theme.white};
  border: 1px solid black;
  border-radius: 10px;
  height: 600px;
  width: 30%;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: none;
`;

const SchedulerBox = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  margin: 7px;
  height: 50px;
  width: 70%;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.mainColor};
    opacity: 0.8;
  }
`;

const ScheduleButton = styled.div`
  cursor: pointer;
  text-align: center;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  font-weight: 800;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  height: 30px;
  width: 30px;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
    opacity: 0.8;
  }
`;

const ScheduleTitle = styled.span`
  font-weight: 700;
`;

const WishListComp = ({
  user,
  modal,
  wishList,
  wish,
  switchModal,
  onGetWishDetail,
  onDeleteWish,
  onAddSchedule,
}) => {
  return (
    <WishListBox>
      {wishList?.map(Wish => (
        <Item key={Wish.no}>
          <SchedulerBox
            onClick={() =>
              onGetWishDetail(Wish.title, Wish.contentId, Wish.contentTypeId)
            }
          >
            <ScheduleTitle key={Wish.no}>{Wish.title}</ScheduleTitle>
          </SchedulerBox>
          <ScheduleButton
            onClick={() =>
              onAddSchedule({
                id: user.id,
                contentId: Wish.contentId,
                title: Wish.title,
                contentTypeId: Wish.contentTypeId,
              })
            }
          >
            +
          </ScheduleButton>
          <ScheduleButton onClick={() => onDeleteWish(Wish.no)}>
            x
          </ScheduleButton>
        </Item>
      ))}
      <StyledModal
        isOpen={modal} //true = 열림 / false = 닫힘
        ariahideapp={"false"} //에러 안뜨게하기
        onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
        onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
      >
        {wish?.data?.contenttypeid === "32" ? (
          <div>
            <div className="title">{wish?.title}</div>
            <div className="Modal-item">
              <div className="sub-title">보유 룸 갯수</div>
              <div>{wish?.data?.roomcount ? wish.data.roomcount : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">룸 타입</div>
              <div>{wish?.data?.roomtype ? wish.data.roomtype : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">체크인</div>
              <div>{wish?.data?.checkintime ? wish.data.checkintime : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">체크아웃</div>
              <div>
                {wish?.data?.checkouttime ? wish.data.checkouttime : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">취사 가능여부</div>
              <div>{wish?.data?.chkcooking ? wish.data.chkcooking : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">이용시설</div>
              <div>{wish?.data?.foodplace ? wish.data.foodplace : "-"}</div>
            </div>
            <div className="Modal-item">
              <div>전화번호</div>
              <div>
                {wish?.data?.infocenterlodging
                  ? wish.data.infocenterlodging
                  : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">주차 가능여부</div>
              <div>
                {wish?.data?.parkinglodging ? wish.data.parkinglodging : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">숙박 예약</div>
              <div>
                {wish?.data?.reservationlodging
                  ? wish.data.reservationlodging
                  : "-"}
              </div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">건물 이용 범위</div>
              <div>
                {wish?.data?.scalelodging ? wish.data.scalelodging : "-"}
              </div>
            </div>
            {wish?.data?.reservationurl ? (
              <div className="Modal-item">
                <div className="sub-title">홈페이지 링크</div>
                :
                <div
                  dangerouslySetInnerHTML={{
                    __html: wish.data.reservationurl,
                  }}
                />
              </div>
            ) : (
              <div className="Modal-item">
                <div>홈페이지 링크</div>
                <div>: -</div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="title">{wish?.title}</div>
            <div className="Modal-item">
              <div className="sub-title">전화번호</div>
              <div>{wish?.data?.infocenter ? wish.data.infocenter : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">휴일</div>
              <div>{wish?.data?.restdate ? wish.data.restdate : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">컨텐츠</div>
              <div>{wish?.data?.expguide ? wish.data.expguide : "-"}</div>
            </div>
            {wish?.data?.usetime ? (
              <div className="Modal-item">
                <div className="sub-title">이용시간</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: wish.data.usetime,
                  }}
                />
              </div>
            ) : (
              <div className="Modal-item">
                <div className="sub-title">이용시간</div>
                <div> -</div>
              </div>
            )}
            <div className="Modal-item">
              <div className="sub-title">주차 가능여부</div>
              <div>{wish?.data?.parking ? wish.data.parking : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">반려동물 동반여부</div>
              <div> {wish?.data?.chkpet ? wish.data.chkpet : "-"}</div>
            </div>
            <div className="Modal-item">
              <div className="sub-title">신용카드 이용</div>
              <div>
                {wish?.data?.chkcreditcard ? wish.data.chkcreditcard : "-"}
              </div>
            </div>
          </>
        )}
        <button className="modal-close" onClick={switchModal}>
          닫기
        </button>
      </StyledModal>
    </WishListBox>
  );
};

export default React.memo(WishListComp);
