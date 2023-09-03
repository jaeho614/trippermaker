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
  background: url("/assets/mainslide4.jpeg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 45%;
  object-fit: cover;
`;

const LoginWrapper = styled.div`
  position: relative;
  text-align: center;
  background: ${props => props.theme.mainColor};
  margin: 0 auto;
  height: 100vh;
  width: 55%;

  .home {
    position: absolute;
    top: 20px;
    left: 30px;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 400px;
  }

  .logo {
    text-align: center;
    margin-top: 20px;
    img {
      width: 250px;
    }
  }

  .logintext {
    display: inline-block;
    text-align: center;
    font-size: 20px;
    border-bottom: 2px solid ${props => props.theme.text};
    margin: 24px 0;
    padding: 6px 0;
  }

  .input {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .label {
      text-align: right;
      color: ${props => props.theme.text};
      font-weight: 700;
      width: 110px;
    }
  }

  .login-btn {
    cursor: pointer;
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
    font-weight: 600;
    font-size: 18px;
    border: none;
    width: 315px;
    margin-top: 20px;
    margin-bottom: 30px;
    padding: 17px 20px;
  }

  .login-btn:hover {
    background: ${props => props.theme.hoverButton};
  }

  .find {
    cursor: pointer;
    color: ${props => props.theme.black};
    font-weight: 700;
    margin-left: 10px;
  }

  .ragister {
    color: ${props => props.theme.black};
    font-weight: 600;
    margin-left: 14px;
  }
`;

const LoginInput = styled.input`
  border: none;
  margin-left: 20px;
  padding-left: 10px;
  padding: 17px;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.red};
  height: 20px;
`;

const StyledModal = Modal.styled`
  display: flex;
  position : relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: ${props => props.theme.mainColor};
  border-radius: 20px;
  height: 300px;
  width: 500px;
  box-shadow: 2${props => props.theme.shadow};

  div{
    margin-top: 10px;
  }

  .label{
    display: inline-block;
    font-weight: 700;
    text-align: right;
    margin-right: 10px;
    width: 70px;
  }

  input{
    margin-left: 10px;
    padding: 10px;
    width: 200px;
  }

  button{
    cursor: pointer;
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
    font-size: 16px;
    border: none;
    border-radius: 10px;
    margin: 10px 8px;
    padding: 10px 17px;
    transition: .3s;

    &:hover{
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
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
            <ErrorMessage>{error && error}</ErrorMessage>
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
                <div>
                  <span className="label">전화번호</span>
                  <input name="phone" onChange={onChange} />
                </div>
                <div className="find-btn">
                  <button onClick={onFindId}>ID 찾기</button>
                  <button onClick={switchModal}>닫기</button>
                </div>
                <ErrorMessage>
                  {searchIdError && "해당 번호로 가입된 계정이 없습니다."}
                </ErrorMessage>
                <StyledModal
                  isOpen={findId}
                  ariahideapp={"false"}
                  onEscapeKeydown={switchModal}
                  onBackgroundClick={switchModal}
                >
                  <div>
                    <p>찾으시는 아이디는</p>
                    <p>
                      <span>{findId}</span>&nbsp;입니다.
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
                  <button onClick={switchModal}>닫기</button>
                </div>
                <ErrorMessage>{searchPwdError && searchPwdError}</ErrorMessage>
              </div>
            )}
          </StyledModal>
        </LoginWrapper>
      </LoginPageContainer>
    </motion.div>
  );
};

export default LoginComp;
