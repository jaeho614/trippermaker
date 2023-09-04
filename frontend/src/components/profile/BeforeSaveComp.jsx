import React from "react";

import { styled } from "styled-components";

import { Container } from "../../containers/profile/Container";

const BeforeBox = styled.div`
  display: flex;
  overflow: auto;
  flex-direction: column;
  background: ${props => props.theme.white};
  border: 1px solid black;
  border-radius: 10px;
  height: 600px;
  width: 30%;
`;

const BeforeInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 9px;
  padding-left: 90px;
`;

const InputBox = styled.input`
  border-radius: 14px;
  margin-right: 10px;
  padding: 0 10px;
  height: 28px;
  width: 150px;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${props => props.theme.mainColor};
  color: ${props => props.theme.text};
  font-size: 14px;
  border: none;
  border-radius: 10px;
  margin: 10px auto;
  padding: 8px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
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
