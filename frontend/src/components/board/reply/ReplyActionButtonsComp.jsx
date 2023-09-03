import { styled } from "styled-components";

const ReplyAction = styled.div`
  display: flex;
  position: absolute;
  font-size: 13px;
  right: 10px;
  top: 10px;

  span {
    cursor: pointer;
    margin-right: 5px;
    transition: 0.3s;
  }

  span:hover {
    opacity: 0.7;
  }
`;

const ReplyActionButtonsComp = ({ onEdit, onRemove, reply }) => {
  return (
    <>
      <ReplyAction>
        <span
          onClick={onEdit}
          data-no={reply?.no}
          data-content={reply?.content}
        >
          수정
        </span>
        <span onClick={onRemove} data-no={reply?.no}>
          삭제
        </span>
      </ReplyAction>
    </>
  );
};

export default ReplyActionButtonsComp;
