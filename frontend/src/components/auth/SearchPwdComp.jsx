import styled from "styled-components";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const SearchPwdContainer = styled.div`
  display: flex;
`;

const LeftPic = styled.div`
  width: 45%;
  height: 100vh;
  background: url("/assets/mainslide4.jpeg");
  background-position: center;
  background-size: cover;
  object-fit: cover;
`;

const SearchPwdWrraper = styled.div`
  width: 55%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  background: ${props => props.theme.bgcolor};
  position: relative;

  .home {
    position: absolute;
    left: 30px;
    top: 20px;
    color: ${props => props.theme.white};
  }

  .logo {
    text-align: center;
    margin-top: 20px;
    img {
      width: 250px;
    }
  }

  .change-pwd-text {
    margin: 24px 0;
    font-size: 20px;
    color: ${props => props.theme.black};
    border-bottom: 2px solid ${props => props.theme.black};
    padding: 6px 0;
    display: inline-block;
    text-align: center;
  }

  .input {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    label {
      width: 180px;
      text-align: right;
      color: ${props => props.theme.softblack};
    }
    input {
      border: none;
      padding-left: 10px;
      padding: 17px;
      margin-left: 20px;
      width: 100%;
      background: ${props => props.theme.white};
      border: 2px solid ${props => props.theme.white};
    }
  }

  button {
    width: 385px;
    padding: 17px 20px;
    background: ${props => props.theme.black};
    cursor: pointer;
    border: none;
    color: ${props => props.theme.white};
    font-weight: 600;
    font-size: 18px;
    margin: 20px 0;
  }

  button:hover {
    background: ${props => props.theme.softblack};
  }
`;

const ChangePwdBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 0 auto;
`;

const ErrorText = styled.p`
  height: 20px;
  color: ${props => props.theme.red};
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
