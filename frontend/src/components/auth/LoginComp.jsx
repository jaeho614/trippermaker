import { Link } from "react-router-dom";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "styled-react-modal";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LoginPageContainer = styled.div`
  display: flex;
`;

const LoginLeftPic = styled.div`
  width: 45%;
  height: 100vh;
  background: url("/assets/mainslide4.jpeg");
  background-position: center;
  background-size: cover;
  object-fit: cover;
`;

const LoginWrapper = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  width: 55%;
  margin: 0 auto;
  background: ${props => props.theme.bgcolor};

  .home {
    position: absolute;
    left: 30px;
    top: 20px;
    color: ${props => props.theme.white};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
  }

  .logo {
    text-align: center;
    margin-top: 20px;
    img {
      width: 250px;
    }
  }

  .logintext {
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

    .label {
      width: 110px;
      text-align: right;
      color: ${props => props.theme.softblack};
    }
  }

  .login-btn {
    width: 315px;
    padding: 17px 20px;
    background: ${props => props.theme.black};
    cursor: pointer;
    border: none;
    color: ${props => props.theme.white};
    font-weight: 600;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .login-btn:hover {
    background: ${props => props.theme.softblack};
  }

  .find {
    color: ${props => props.theme.black};
    margin-left: 10px;
    cursor: pointer;
    font-weight: 700;
  }

  .ragister {
    margin-left: 14px;
    color: ${props => props.theme.black};
    font-weight: 600;
  }
`;

const LoginInput = styled.input`
  border: none;
  padding-left: 10px;
  padding: 17px;
  margin-left: 20px;
  width: 100%;
  background: ${props => props.theme.white};
  border: 2px solid ${props => props.theme.white};
`;

const ErrorText = styled.p`
  height: 20px;
  color: ${props => props.theme.red};
`;

const StyledModal = Modal.styled`
  background: ${props => props.theme.smoke};
  height: 300px;
  width: 500px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 2px 3px 3px 3px rgba(0, 0, 0, 0.3);
  position : relative;

  div{
    margin-top: 10px;
  }

  .label{
    width: 70px;
    display: inline-block;
    text-align: right;
    margin-right: 10px;
  }

  input{
    padding: 10px;
    width: 200px;
    margin-left: 10px;
  }

  button{
    padding: 10px 17px;
    margin: 10px 8px;
    background: ${props => props.theme.bgcolor};
    border: none;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    transition: .3s;

    &:hover{
    background: ${props => props.theme.subcolor};
    color: ${props => props.theme.white};
    }
  }
  p{
    font-size: 20px;
  }
  p span{
    font-size: 24px;
    font-weight: 600;
  }
`;

const LoginComp = ({
  error,
  modal,
  searchName,
  findId,
  searchIdError,
  searchPwdError,
  changeInform,
  onChange,
  onSubmit,
  onFindId,
  onFindPwd,
  switchModal,
}) => {
  return (
    <motion.div
      key="modal"
      initial={{ opacity: 0.6, scale: 1.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <LoginPageContainer>
        <LoginLeftPic />
        <LoginWrapper>
          <Link to="/">
            <div className="home">
              <FontAwesomeIcon icon={faHouse} size="2xl" />
            </div>
          </Link>
          <h2 className="logo">
            <img src="/assets/triplogo.png" alt="" />
          </h2>
          <div className="logintext">LOGIN</div>
          <form onSubmit={onSubmit}>
            <div className="input">
              <div className="label">이메일</div>
              <LoginInput
                placeholder="E-MAIL"
                name="id"
                type="text"
                onChange={onChange}
              />
            </div>
            <div className="input">
              <div className="label">비밀번호</div>
              <LoginInput
                placeholder="비밀번호"
                name="pwd"
                type="password"
                onChange={onChange}
              />
            </div>
            <ErrorText>{error && error}</ErrorText>
            <button className="login-btn">LOGIN</button>
          </form>
          <span onClick={changeInform} name="id" className="find">
            ID 찾기
          </span>
          <span>&nbsp;&nbsp;{"/"}</span>
          <span onClick={changeInform} name="pwd" className="find">
            PW 찾기
          </span>
          <br />
          <br />
          <span>아직 회원이 아니세요?</span>
          <Link to="/auth/register">
            <span className="ragister">회원가입</span>
          </Link>

          <StyledModal
            isOpen={modal} //true = 열림 / false = 닫힘
            ariahideapp={"false"} //없으면 에러 발생
            onEscapeKeydown={switchModal} //esc키 눌렀을경우 함수 실행
            onBackgroundClick={switchModal} //esc키 or 오버레이부분 클릭시 함수 실행
          >
            {searchName === "id" ? (
              <div>
                <h3>ID 찾기</h3>
                전화번호
                <input name="phone" onChange={onChange} />
                <button onClick={onFindId}>ID 찾기</button>
                <ErrorText>
                  {searchIdError && "해당 번호로 가입된 계정이 없습니다."}
                </ErrorText>
                <StyledModal
                  isOpen={findId}
                  ariahideapp={"false"}
                  onEscapeKeydown={switchModal}
                  onBackgroundClick={switchModal}
                >
                  <div>
                    <p>찾으시는 아이디는</p>
                    <p>
                      <span>{findId} </span>입니다.
                    </p>
                  </div>
                  <button onClick={switchModal}>확인</button>
                </StyledModal>
              </div>
            ) : (
              <div>
                <h3>PW 찾기</h3>
                <div>
                  <span className="label">이메일</span>
                  <input name="email" onChange={onChange} />
                </div>
                <div>
                  <span className="label">전화번호</span>
                  <input name="phone" onChange={onChange} />
                </div>
                <div className="find-btn">
                  <button onClick={onFindPwd}>PW 찾기</button>
                  <button onClick={switchModal}>취소</button>
                </div>
                <ErrorText>{searchPwdError && searchPwdError}</ErrorText>
              </div>
            )}
          </StyledModal>
        </LoginWrapper>
      </LoginPageContainer>
    </motion.div>
  );
};

export default LoginComp;
