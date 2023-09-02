import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SearchPwdContainer = styled.div`
  display: flex;
`;

const LeftPic = styled.div`
  background: url("/assets/mainslide4.jpeg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 45%;
  object-fit: cover;
`;

const SearchPwdWrraper = styled.div`
  position: relative;
  text-align: center;
  background: ${props => props.theme.mainColor};
  margin: 0 auto;
  height: 100vh;
  width: 55%;

  .home {
    position: absolute;
    color: ${props => props.theme.white};
    top: 20px;
    left: 30px;
  }

  .logo {
    text-align: center;
    margin-top: 20px;
    img {
      width: 250px;
    }
  }

  .change-pwd-text {
    display: inline-block;
    text-align: center;
    font-size: 20px;
    color: ${props => props.theme.text};
    border-bottom: 2px solid ${props => props.theme.border};
    margin: 24px 0;
    padding: 6px 0;
  }

  .input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    label {
      text-align: right;
      color: ${props => props.theme.text};
      font-weight: 700;
      width: 180px;
    }
    input {
      border: 2px solid ${props => props.theme.white};
      margin-left: 20px;
      padding: 17px;
      padding-left: 10px;
      padding: 17px;
      margin-left: 20px;
      width: 100%;
    }
  }

  button {
    cursor: pointer;
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
    font-size: 18px;
    font-weight: 600;
    border: none;
    margin: 20px 0;
    padding: 17px 20px;
    width: 385px;
  }

  button:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
  }
`;

const ChangePwdBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 400px;
`;

const ErrorText = styled.p`
  color: ${props => props.theme.red};
  height: 20px;
`;

const SearchPwdComp = ({ onSubmit, onChange, onPwdChk }) => {
  return (
    <>
      <SearchPwdContainer>
        <LeftPic />
        <SearchPwdWrraper>
          <Link to="/">
            <div className="home">
              <FontAwesomeIcon icon={faHouse} size="2xl" />
            </div>
          </Link>
          <h2 className="logo">
            <img src="/assets/triplogo.png" alt="" />
          </h2>
          <div className="change-pwd-text">비밀번호 변경</div>
          <ChangePwdBox>
            <div className="input">
              <label>비밀번호</label>
              <input name="pwd" type="password" onChange={onChange} />
            </div>
            <div className="input">
              <label>비밀번호 확인</label>
              <input name="pwdConfirm" type="password" onChange={onChange} />
            </div>
            <ErrorText>
              {onPwdChk === false &&
                "비밀번호가 일치하지 않습니다. 다시 입력해주세요."}
            </ErrorText>
            <button onClick={onSubmit}>확인</button>
          </ChangePwdBox>
        </SearchPwdWrraper>
      </SearchPwdContainer>
    </>
  );
};

export default SearchPwdComp;
