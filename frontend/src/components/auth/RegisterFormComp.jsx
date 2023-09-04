import React from "react";
import { Link } from "react-router-dom";

import { css, styled } from "styled-components";
import DaumPostcode from "react-daum-postcode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Modal from "styled-react-modal";
import { motion } from "framer-motion";

const ModalBox = Modal.styled`
  background: white;
  border-radius: 15px;
  padding: 5px;
`;

const StyledModal = styled.div`
  background: white;
  height: 450px;
  width: 500px;

  div {
    display: flex;
    align-items: center;
    justify-contents: space-between;
    margin-top: 5px;
    padding: 5px;
  }

  div:first-child {
    border-bottom: 1px solid black;
  }
`;

const ButtonInModal = styled.div`
  background: none;
  text-align: center;
  cursor: pointer;
  color: ${props => props.theme.text};
  margin-left: 400px;
`;

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.mainColor};
  height: 100vh;

  .home {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .join-text {
    display: inline-block;
    text-align: center;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.text};
    margin: 30px 0;
    padding: 6px 0;
  }

  .logo {
    text-align: center;
    color: ${props => props.theme.nameColor};
    font-size: 40px;
    font-weight: 600;
  }

  button {
    cursor: pointer;
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
    border: none;
    padding: 10px;
    transition: 0.3s;

    &:hover {
      background: ${props => props.theme.hoverButton};
    }

    &.join-btn {
      display: block;
      text-align: center;
      background: ${props => props.theme.button};
      border: none;
      margin: 0 auto;
      margin-top: 30px;
      padding: 14px 20px;
      font-size: 16px;
      box-shadow: 2px 2px 7px 2px rgba(0, 0, 0, 0.3);
    }

    &.join-btn:hover {
      background: ${props => props.theme.hoverButton};
    }
  }

  .gender {
    margin-top: 20px;
    input[type="radio"] {
      margin-left: 10px;
      width: 30px;
    }
  }
`;

const RegisterFormBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.subColor};
  border-radius: 20px;
  padding: 50px;
  box-shadow: ${props => props.theme.shadow};

  .emailat {
    font-weight: 600;
  }
`;

const RegisterInput = styled.input`
  margin: 0 15px;
  padding: 7px 10px;
  height: 27px;
  width: 200px;

  &.detailAddress {
    margin-top: 25px;
  }
`;

const SubIdInput = styled.input`
  margin: 0 15px;
  padding: 7px 10px;
  height: 27px;
  width: 200px;

  ${props =>
    props.disabled &&
    css`
      background: gray;
      disabled;
      
      &::placeholder {
        color: ${props => props.theme.text};
      }
    `}
`;

const SelectDomain = styled.select`
  margin-right: 15px;
  padding: 10px 20px;
`;

const NameTag = styled.span`
  display: inline-block;
  text-align: right;
  font-weight: 800;
  width: 110px;
`;

const ConfirmMessage = styled.div`
  font-size: 15px;
  margin: 5px 0 5px 125px;
  height: 20px;

  ${props =>
    props.authok &&
    css`
      color: ${props => props.theme.green};
    `}

  ${props =>
    props.autherror &&
    css`
      color: ${props => props.theme.red};
    `}

    &:nth-child(1) {
    margin-left: -0px;
  }

  .count {
    font-weight: 600;
    margin-left: 10px;
  }
`;

const RegisterFormComp = ({
  onChange,
  onSubmit,
  onCheck,
  onIdChk,
  onPwdChk,
  onNickChk,
  changeDomain,
  chooseDomain,
  disabledDomain,
  phoneAuth,
  phoneMsg,
  authNum,
  count,
  switchModal,
  modal,
  onCompletePost,
  addr1,
  address1,
  zipcode1,
}) => {
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0.6, scale: 1.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <RegisterContainer>
        <Link to="/">
          <div className="home">
            <FontAwesomeIcon icon={faHouse} size="2xl" />
          </div>
        </Link>
        <h2 className="logo">TRIPPER MAKER</h2>
        <div className="join-text">JOIN</div>
        <RegisterFormBlock>
          <div>
            <div>
              <NameTag>이메일</NameTag>
              <RegisterInput
                placeholder="E-MAIL"
                name="id"
                type="text"
                onChange={onChange}
              />
              <span className="emailat">@</span>
              {disabledDomain ? (
                <SubIdInput
                  name="domain"
                  type="text"
                  onChange={onChange}
                  ref={chooseDomain}
                  disabled={true}
                />
              ) : (
                <SubIdInput
                  placeholder="직접입력"
                  name="domain"
                  type="text"
                  onChange={onChange}
                  ref={chooseDomain}
                />
              )}
              <SelectDomain name="SelectDomain" onChange={changeDomain}>
                <option value="directInput">직접입력</option>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.net</option>
              </SelectDomain>
              <button name="emailChk" onClick={onCheck}>
                중복확인
              </button>
              {onIdChk === "empty" ? (
                <ConfirmMessage></ConfirmMessage>
              ) : onIdChk === false ? (
                <ConfirmMessage autherror="true">
                  이미 사용중인 이메일입니다.
                </ConfirmMessage>
              ) : (
                <ConfirmMessage authok="true">
                  사용가능한 닉네임입니다.
                </ConfirmMessage>
              )}
            </div>
            <div>
              <NameTag>비밀번호</NameTag>
              <RegisterInput
                placeholder="비밀번호"
                name="pwd"
                type="password"
                onChange={onChange}
              />
              <NameTag>비밀번호 확인</NameTag>
              <RegisterInput
                placeholder="비밀번호 확인"
                name="pwdConfirm"
                type="password"
                onChange={onChange}
              />
              {onPwdChk === false ? (
                <ConfirmMessage autherror="true">
                  비밀번호를 확인해주세요.
                </ConfirmMessage>
              ) : (
                <ConfirmMessage></ConfirmMessage>
              )}
            </div>
            <div>
              <NameTag>닉네임</NameTag>
              <RegisterInput
                placeholder="닉네임"
                name="nick"
                type="text"
                onChange={onChange}
              />
              <button name="nickChk" onClick={onCheck}>
                중복확인
              </button>
              {onNickChk === "empty" ? (
                <ConfirmMessage></ConfirmMessage>
              ) : onNickChk === false ? (
                <ConfirmMessage autherror="true">
                  이미 사용중인 닉네임입니다.
                </ConfirmMessage>
              ) : (
                <ConfirmMessage authok="true">
                  사용가능한 닉네임입니다.
                </ConfirmMessage>
              )}
            </div>
            <div>
              <NameTag>전화번호</NameTag>
              <RegisterInput
                placeholder="'-' 없이 입력하세요."
                name="phone"
                type="text"
                onChange={onChange}
              />
              <button name="phoneChk" onClick={onCheck}>
                인증번호 받기
              </button>
              {authNum === true ? (
                <SubIdInput name="authNum" onChange={onCheck} disabled={true} />
              ) : (
                <SubIdInput
                  placeholder="인증번호를 입력해주세요"
                  name="authNum"
                  onChange={onCheck}
                />
              )}
              <button name="phoneAuthChk" onClick={onCheck}>
                인증확인
              </button>
              {
                <ConfirmMessage autherror="true">
                  {phoneMsg}
                  {count === 60 || authNum === true ? (
                    ""
                  ) : count !== 0 && phoneAuth ? (
                    <span className="count">인증 유효시간 {count}초</span>
                  ) : (
                    ""
                  )}
                </ConfirmMessage>
              }
            </div>
            <div>
              <NameTag>주소</NameTag>
              {addr1 ? (
                <span>
                  <SubIdInput
                    placeholder="우편번호"
                    name="zipcode"
                    ref={zipcode1}
                    disabled={true}
                  />
                  <SubIdInput
                    placeholder="주소"
                    name="addr1"
                    type="text"
                    ref={address1}
                    disabled={true}
                  />
                </span>
              ) : (
                <span>
                  <SubIdInput
                    placeholder="우편번호"
                    name="zipcode"
                    ref={zipcode1}
                    disabled={true}
                  />
                  <SubIdInput
                    placeholder="주소"
                    name="addr1"
                    type="text"
                    ref={address1}
                    disabled={true}
                  />
                </span>
              )}
              <button onClick={switchModal}>주소찾기</button>
            </div>
            <div>
              <NameTag>상세주소</NameTag>
              <RegisterInput
                className="detailAddress"
                placeholder="상세주소"
                name="addr2"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="gender">
              <NameTag>성별</NameTag>
              <input type="radio" name="gender" value="0" onChange={onChange} />
              남자
              <input type="radio" name="gender" value="1" onChange={onChange} />
              여자
            </div>
            <div>
              <button onClick={onSubmit} className="join-btn">
                가입하기
              </button>
            </div>
          </div>
        </RegisterFormBlock>
      </RegisterContainer>
      <ModalBox
        isOpen={modal} //true = 열림 / false = 닫힘
        ariahideapp="false" //에러 안뜨게하기
        onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
        onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
      >
        <StyledModal>
          <div>
            <span>주소검색</span>
            <ButtonInModal onClick={switchModal}>X</ButtonInModal>
          </div>
          <DaumPostcode autoClose onComplete={onCompletePost} />
        </StyledModal>
      </ModalBox>
    </motion.div>
  );
};

export default React.memo(RegisterFormComp);
