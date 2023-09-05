import { styled } from "styled-components";
import ReplyActionButtonsComp from "./ReplyActionButtonsComp";
import { makeCreatedAt } from "../../../lib/makeCreatedAt";

const ReplyItemWarrap = styled.div`
  display: flex;
  position: relative;
  background: ${props => props.theme.mainColor};
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 20px;
  width: 50%;

  .id {
    font-weight: 600;
    color: ${props => props.theme.text};
  }

  .reply {
    margin-left: 20px;
    line-height: 30px;
  }

  .content {
    color: ${props => props.theme.text};
  }

  .createat {
    position: absolute;
    color: ${props => props.theme.text};
    font-size: 13px;
    right: 3%;
    bottom: 7%;
  }
`;
//댓글 이미지 준비중..
const ImageBox = styled.img`
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.smoke};
  height: 70px;
  width: 70px;
`;

const ReplyItem = ({
  reply,
  ReplyActionButtons,
  onRemove,
  onEdit,
  user,
  profile,
}) => {
  return (
    <ReplyItemWarrap>
      <div className="reply">
        <p className="id">{reply?.uno_user?.nick}</p>
        <p className="content">{reply?.content}</p>
        <p className="createat">{makeCreatedAt(reply?.createAt)}</p>
      </div>
      {user?.nick === reply?.uno_user?.nick ? (
        <ReplyActionButtonsComp
          onRemove={onRemove}
          onEdit={onEdit}
          reply={reply}
        />
      ) : null}
    </ReplyItemWarrap>
  );
};

const ReplyReadComp = ({
  content,
  replys,
  user,
  replyactionbuttons,
  onRemove,
  onEdit,
  profile,
}) => {
  return (
    <div>
      {replys &&
        replys.map(reply => (
          <ReplyItem
            reply={reply}
            key={reply?.no}
            onRemove={onRemove}
            onEdit={onEdit}
            user={user}
            profile={profile}
          />
        ))}
    </div>
  );
};

export default ReplyReadComp;
