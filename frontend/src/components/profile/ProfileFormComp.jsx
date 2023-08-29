import React from "react";
import { styled } from "styled-components";

const UserInformBox = styled.div`
  height: 240px;
  margin-left: 30px;
`;

const UserInform = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  height: 40px;
  &:last-child {
    border: none;
  }
`;

const Detail = styled.div`
  padding: 5px 10px;
  display: inline-block;
`;

const NameTag = styled.span`
  margin-right: 20px;
  width: 70px;
  padding: 0px 10px;
  display: inline-block;
  /* background : ${props => props.theme.bgcolor}; */
  font-weight: 600;
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.red};
  margin-left: 10px;
`;

const Button = styled.button`
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  padding: 7px 15px;
  background: ${props => props.theme.bgcolor};
  border: none;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.subcolor};
    color: #fff;
  }

  &.delete-user-btn {
    margin-left: 10px;
  }
`;

const InputBox = styled.input`
  background: white;
  margin-right: 10px;
  width: 150px;
  height: 28px;
  padding: 0 10px;
  border-radius: 14px;
`;

const ButtonBox = styled.div`
  margin-top: 17px;
`;

const ProfileFormComp = ({
  user,
  nickAuth,
  nickError,
  changeInform,
  onChange,
  onChangeProfile,
  onNickCheck,
  onWithdraw,
  onChangeProfileCancle,
}) => {
  return (
    <UserInformBox>
      {user && !changeInform ? (
        <>
          <UserInform>
            <NameTag>아이디</NameTag>
            <Detail>{user.id}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>닉네임</NameTag>
            <Detail>{user.nick}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>전화번호</NameTag>
            <Detail>{user.phone}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>주소</NameTag>
            <Detail>{user.addr1 + user.addr2}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>성별</NameTag>
            <Detail>{user.gender === false ? "남자" : "여자"}</Detail>
          </UserInform>
        </>
      ) : user && changeInform ? (
        <>
          <UserInform>
            <NameTag>아이디</NameTag>
            <Detail>{user.id}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>닉네임</NameTag>
            <InputBox placeholder={"닉네임"} onChange={onChange} />
            <Button onClick={onNickCheck}>중복확인</Button>
            <div>
              {nickError ? (
                <ErrorMessage>이미 존재하는 닉네임입니다.</ErrorMessage>
              ) : nickAuth ? (
                <ErrorMessage>사용가능한 아이디 입니다.</ErrorMessage>
              ) : (
                ""
              )}
            </div>
          </UserInform>
          <UserInform>
            <NameTag>전화번호</NameTag>
            <Detail>{user.phone}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>주소</NameTag>
            <Detail>{user.addr1 + user.addr2}</Detail>
          </UserInform>
          <UserInform>
            <NameTag>성별</NameTag>
            <Detail>{user.gender === "0" ? "남자" : "여자"}</Detail>
          </UserInform>
        </>
      ) : (
        ""
      )}
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
