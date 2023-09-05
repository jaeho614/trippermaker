import { styled } from "styled-components";
import Button from "../../common/ButtonComp";

const ReplyWrapper = styled.div`
  width: 50%;
  margin: 20px auto;

  p {
    font-size: 24px;
  }
  input {
    background: ${props => props.theme.mainColor};
    color: ${props => props.theme.text};
    margin-top: 20px;
    padding: 10px;
    height: 40px;
    width: 100%;

    &::placeholder {
      color: ${props => props.theme.text};
    }
  }
  div {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const ReplyButton = styled(Button)`
  margin-left: 10px;
  margin-top: 40px;
  padding: 0 20px;
  height: 40px;
  width: 100px;
`;
const ReplyWriteComp = ({ onReset, onPublish, onChangeField, emptyReply }) => {
  return (
    <>
      <ReplyWrapper>
        <p>댓글</p>
        <div>
          <input
            ref={emptyReply}
            name="content"
            placeholder="reply write comeon"
            onChange={onChangeField}
          />
          <ReplyButton onClick={onPublish}>등록</ReplyButton>
        </div>
      </ReplyWrapper>
    </>
  );
};

export default ReplyWriteComp;
