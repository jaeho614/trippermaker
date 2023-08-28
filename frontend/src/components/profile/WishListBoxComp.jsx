import { styled } from "styled-components";
import Modal from "styled-react-modal";
import { Container } from "../../containers/profile/Container";

const StyledModal = Modal.styled`
  background: white;
  height: 550px;
  width: 600px;
  border-radius: 10px;
  padding: 15px;
  overflow: auto;
  .title{
    font-size:24px;
    font-weight: 600;
    border-bottom:2px solid #333;
    padding: 20px 0 ;
    text-align:center;
  }

  .sub-title{
    font-size:16px;
    font-weight: 500;
  }

  div{
    display: flex;
    padding: 5px;
    justify-content: space-between;
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
    background : ${props => props.theme.softblack};
    color : ${props => props.theme.white};
    padding: 5px 10px;
    display:block;
    margin: 0 auto;
    margin-top :20px;
    curosr:pointer;
  }
`;

const InputBox = styled.input`
  background: white;
  margin-right: 10px;
  width: 150px;
  height: 28px;
  padding: 0 10px;
  border-radius: 14px;
`;

const Button = styled.button`
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 7px 15px;
  margin: 10px auto;
  background: ${props => props.theme.bgcolor};
  border: none;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.subcolor};
    color: #fff;
  }
`;

const AllScheduleBox = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  justify-content: space-around;
`;

const SchedulerBox = styled.div`
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 70%;
  height: 50px;
  margin: 7px;

  &:hover {
    cursor: pointer;
    background: pink;
    opacity: 0.8;
  }
`;

const ScheduleTitle = styled.span`
  font-weight: 700;
`;

const ScheduleButton = styled.div`
  cursor: pointer;
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  text-align: center;
  width: 30px;
  height: 30px;
  font-weight: 800;

  &:hover {
    background: pink;
    opacity: 0.8;
  }
`;

const WishListBox = styled.div`
  background: white;
  border: 1px solid black;
  border-radius: 10px;
  width: 30%;
  height: 600px;
  overflow: auto;
`;

const BeforeBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  background: white;
  width: 30%;
  height: 600px;
  overflow: auto;
`;

const BeforeInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 120px;
`;

const AfterBox = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  flex-direction: column;
  background: white;
  width: 30%;
  height: 600px;
  overflow: auto;
`;

const Item = styled.div`
  display: flex;
  background: none;
  justify-content: space-around;
  align-items: center;
`;

const SavedList = styled.div`
  display: flex;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  margin: 7px;
  font-weight: 700;
  height: 50px;
  width: 100%;
  justify-content: center;
  align-items: center;
  &:hover {
    background: pink;
    opacity: 0.7;
  }
`;

const SavedListBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
`;

const SavedListDetailBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShceduleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 70%;
  height: 30px;
  margin: 10px 0;
`;

const SavedButton = styled.div`
  background: none;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  font-weight: 800;
  text-align: center;

  &:hover {
    background: pink;
    opacity: 0.8;
  }
`;

const SheduleTitleBox = styled.div`
  color: blue;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const WishListBoxComp = ({
  user,
  modal,
  wishList,
  wish,
  cards,
  subjectRef,
  savedList,
  savedListDetail,
  moveCard,
  listModal,
  onGetWishDetail,
  onDeleteWish,
  onAddSchedule,
  onSaveScheduleList,
  onGetSavedListDetail,
  onSavedListDelete,
}) => {
  return (
    <AllScheduleBox>
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
          onEscapeKeydown={onGetWishDetail} //esc키 눌렀을경우 함수 실행
          onBackgroundClick={onGetWishDetail} //esc키 or 오버레이부분 클릭시 함수 실행
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
                <div>
                  {wish?.data?.checkintime ? wish.data.checkintime : "-"}
                </div>
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
          <button className="modal-close" onClick={onGetWishDetail}>
            닫기
          </button>
        </StyledModal>
      </WishListBox>
      <BeforeBox>
        <BeforeInputBox>
          <InputBox type="text" ref={subjectRef} placeholder="한글 2~10자" />
          <Button onClick={onSaveScheduleList}>저장</Button>
        </BeforeInputBox>
        {cards ? <Container cards={cards} moveCard={moveCard} /> : null}
      </BeforeBox>
      <AfterBox>
        {savedList?.map(list => (
          <SavedListBox key={list._id}>
            <SavedList
              onClick={() =>
                onGetSavedListDetail(list.name[0].id, list.name[0].subject)
              }
            >
              {list.name[0].subject}
            </SavedList>
            <SavedButton onClick={() => onSavedListDelete(list._id)}>
              x
            </SavedButton>
          </SavedListBox>
        ))}
        <StyledModal
          isOpen={listModal} //true = 열림 / false = 닫힘
          ariahideapp="false" //에러 안뜨게하기
          onEscapeKeydown={onGetSavedListDetail} //esc키 눌렀을경우 함수 실행
          onBackgroundClick={onGetSavedListDetail} //esc키 or 오버레이부분 클릭시 함수 실행
        >
          <SheduleTitleBox>{savedListDetail?.name[0].subject}</SheduleTitleBox>
          <SavedListDetailBox>
            {savedListDetail?.name[0].scheduleList.map(detail => (
              <ShceduleBox key={detail.items[0].contentId}>
                {detail.items[0].title}
              </ShceduleBox>
            ))}
          </SavedListDetailBox>
          <Button onClick={onGetSavedListDetail}>닫기</Button>
        </StyledModal>
      </AfterBox>
    </AllScheduleBox>
  );
};

export default WishListBoxComp;
