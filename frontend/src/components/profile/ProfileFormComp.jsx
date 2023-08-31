import React from "react";
import { css, styled } from "styled-components";

const UserInformBox = styled.div`
  margin-left: 30px;
  height: 200px;
`;

const UserInform = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  height: 40px;

  &.gender {
    border-bottom: none;
  }
`;

const Detail = styled.div`
  display: inline-block;
  padding: 5px 10px;
`;

const NameTag = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-right: 20px;
  padding: 0px 10px;
  width: 70px;
`;

const ConfirmMessage = styled.span`
  margin-left: 10px;

  ${props =>
    props.authok &&
    css`
      color: ${props => props.theme.trueMsg};
    `}

  ${props =>
    props.autherror &&
    css`
      color: ${props => props.theme.falseMsg};
    `}
`;

const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  font-size: 14px;
  border: none;
  border-radius: 10px;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
  }

  &.delete-user-btn {
    margin-left: 10px;
  }
`;

const InputBox = styled.input`
  border-radius: 14px;
  margin-right: 10px;
  padding: 0 10px;
  height: 28px;
  width: 150px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 18px;
`;

const ProfileFormComp = ({
  user,
  changeInform,
  nickAuth,
  nickError,
  onChange,
  onChangeProfile,
  onNickCheck,
  onWithdraw,
  onChangeProfileCancle,
}) => {
  return (
    <UserInformBox>
      <UserInform>
        <NameTag>아이디</NameTag>
        <Detail>{user?.id}</Detail>
      </UserInform>
      {user && !changeInform ? (
        <UserInform>
          <NameTag>닉네임</NameTag>
          <Detail>{user?.nick}</Detail>
        </UserInform>
      ) : (
        <UserInform className="nickName">
          <NameTag>닉네임</NameTag>
          <InputBox placeholder={"닉네임"} onChange={onChange} />
          <Button onClick={onNickCheck}>중복확인</Button>
          {nickError ? (
            <ConfirmMessage autherror="true">
              이미 존재하는 닉네임입니다.
            </ConfirmMessage>
          ) : nickAuth ? (
            <ConfirmMessage authok="true">
              사용가능한 아이디 입니다.
            </ConfirmMessage>
          ) : (
            ""
          )}
        </UserInform>
      )}
      <UserInform>
        <NameTag>전화번호</NameTag>
        <Detail>{user?.phone}</Detail>
      </UserInform>
      <UserInform>
        <NameTag>주소</NameTag>
        <Detail>
          {user?.addr1} {user?.addr2}
        </Detail>
      </UserInform>
      <UserInform className="gender">
        <NameTag>성별</NameTag>
        <Detail>{user?.gender === false ? "남자" : "여자"}</Detail>
      </UserInform>
      <ButtonBox>
        <Button onClick={onChangeProfile}>정보수정</Button>
        {changeInform ? (
          ""
        ) : (
          <Button className="delete-user-btn" onClick={onWithdraw}>
            회원탈퇴
          </Button>
        )}
        {changeInform && (
          <Button
            style={{ marginLeft: "10px" }}
            onClick={onChangeProfileCancle}
          >
            수정취소
          </Button>
        )}
      </ButtonBox>
    </UserInformBox>
  );
};

export default React.memo(ProfileFormComp);
