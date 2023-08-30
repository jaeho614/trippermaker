import React from "react";
import { styled } from "styled-components";
import { Container } from "../../containers/profile/Container";

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
  margin-top: 9px;
  padding: 0 90px;
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

const BeforeSaveComp = ({
  cards,
  subjectRef,
  moveCard,
  onSaveScheduleList,
}) => {
  return (
    <BeforeBox>
      <BeforeInputBox>
        <InputBox type="text" ref={subjectRef} placeholder="한글 2~10자" />
        <Button onClick={onSaveScheduleList}>저장</Button>
      </BeforeInputBox>
      {cards ? <Container cards={cards} moveCard={moveCard} /> : null}
    </BeforeBox>
  );
};

export default React.memo(BeforeSaveComp);
