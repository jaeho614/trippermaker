import { styled } from "styled-components";
import Modal from "styled-react-modal";
import React from "react";

const AfterBox = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  background: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  height: 600px;
  width: 30%;
`;

const SavedList = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  margin: 7px;
  height: 50px;
  width: 100%;
  &:hover {
    background: ${props => props.theme.mainColor};
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
  background: ${props => props.theme.subColor};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  margin: 10px 0;
  padding: 15px;
`;

const SavedButton = styled.div`
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

const SheduleTitleBox = styled.div`
  color: ${props => props.theme.text};
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: block;
  cursor: pointer;
  font-size: 14px;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 10px;
  margin: 10px auto;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
  }
`;

const StyledModal = Modal.styled`
  overflow: auto;
  background: ${props => props.theme.mainColor};
  border-radius: 10px;
  padding: 15px;
  height: 550px;
  width: 600px;

  div{
    display: flex;
    justify-content: space-between;
    padding: 5px;
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
