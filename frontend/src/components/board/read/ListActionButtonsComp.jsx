import { styled } from "styled-components";
import { useState, useCallback } from "react";
import AskRemoveModalComp from "../remove/AskRemoveModalComp";

const ListButtons = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 50px;
`;

const Buttons = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  &:last-child {
    margin-left: 10px;
  }
  &:hover {
    background: ${props => props.theme.hoverButton};
  }
`;

const ListActionButtonsComp = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };

  return (
    <>
      <ListButtons>
        <Buttons onClick={onEdit}>수정</Buttons>
        <Buttons onClick={onRemoveClick}>삭제</Buttons>
      </ListButtons>
      <AskRemoveModalComp
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default ListActionButtonsComp;
