import styled from "styled-components";
import ButtonComp from "../../common/ButtonComp";

const ButtonsBlock = styled.div`
  text-align: right;
  margin-top: 70px;
`;

const Buttons = styled(ButtonComp)`
  & + & {
    margin-left: 10px;
  }
`;

const WriteActionbuttonsComp = ({ onCancel, onPublish, isEdit }) => {
  return (
    <ButtonsBlock>
      <Buttons onClick={onPublish}>
        게시글
        {isEdit ? "수정" : "등록"}
      </Buttons>
      <Buttons onClick={onCancel}>취소</Buttons>
    </ButtonsBlock>
  );
};

export default WriteActionbuttonsComp;
