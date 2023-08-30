import { styled } from "styled-components";
import Modal from "styled-react-modal";
import React from "react";

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

const ShceduleBox = styled.span`
  align-items: center;
  text-align: center;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
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

const Button = styled.button`
  display: block;
  cursor: pointer;
  font-size: 14px;
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

const StyledModal = Modal.styled`
  background: white;
  height: 550px;
  width: 600px;
  border-radius: 10px;
  padding: 15px;
  overflow: auto;

  div{
    display: flex;
    padding: 5px;
    justify-content: space-between;
  }
`;

const AfterSaveComp = ({
  savedList,
  savedListDetail,
  listModal,
  switchListModal,
  onGetSavedListDetail,
  onSavedListDelete,
}) => {
  return (
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
        onEscapeKeydown={switchListModal} //esc키 눌렀을경우 함수 실행
        onBackgroundClick={switchListModal} //esc키 or 오버레이부분 클릭시 함수 실행
      >
        <SheduleTitleBox>{savedListDetail?.name[0].subject}</SheduleTitleBox>
        <SavedListDetailBox>
          {savedListDetail?.name[0].scheduleList.map(detail => (
            <ShceduleBox key={detail.items[0].contentId}>
              {detail.items[0].title}
            </ShceduleBox>
          ))}
        </SavedListDetailBox>
        <Button onClick={switchListModal}>닫기</Button>
      </StyledModal>
    </AfterBox>
  );
};

export default React.memo(AfterSaveComp);
