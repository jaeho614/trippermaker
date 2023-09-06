import { styled } from "styled-components";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  background: ${props => props.theme.mainColor};
  border-radius: 20px;
  padding: 10px;
  height: 50%;
  width: 50%;

  div{
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.text};
  }
`;

const DivInModal = styled.div`
  dispaly: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: center;
  color: ${props => props.theme.red};
  margin: 10px 0;
`;

const FooterComp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  background-color: ${props => props.theme.mainColor};
  color: ${props => props.theme.text};
  border-top: 2px solid ${props => props.theme.border};
  padding: 50px 0;
  height: 100%;
  width: 100%;

  .footer-menu {
    display: flex;
    justify-content: center;
    li {
      cursor: pointer;
      color: ${props => props.theme.text};
      margin-left: 20px;
      transition: 0.3s;
    }
    li:hover {
      opacity: 0.3;
    }
  }
  .copyright {
    margin-top: 20px;
    i {
      color: ${props => props.theme.text};
      font-size: 18px;
    }
  }

  .logo {
    margin-top: 20px;
    img {
      width: 300px;
    }
  }

  .info {
    color: ${props => props.theme.text};
    margin-top: 20px;
    span {
      color: ${props => props.theme.text};
      font-weight: 600;
    }
  }

  .tel {
    color: ${props => props.theme.text};
    font-size: 24px;
    font-weight: 600;
    p {
      color: ${props => props.theme.text};
      font-size: 20px;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto;
    margin-top: 300px;
    width: 100%;
    .tel {
      display: none;
    }
  }

  > div {
    > img {
      height: 200px;
    }
  }
`;

//기본 로고 triplogo8.png
const Footer = ({ onGetMainTerms, modal, mainTerms, mainInform }) => {
  return (
    <FooterComp>
      <div className="logo">
        <img src="/assets/Logo.jpg" alt="img" />
      </div>
      <div>
        <ul className="footer-menu">
          <li onClick={() => onGetMainTerms("이용약관")}>이용약관</li>
          <li onClick={() => onGetMainTerms("개인정보처리방침")}>
            개인정보처리방침
          </li>
          <li onClick={() => onGetMainTerms("이용안내")}>이용안내</li>
        </ul>
        <StyledModal
          isOpen={modal} //true = 열림 / false = 닫힘
          ariahideapp={"false"} //에러 안뜨게하기
          onEscapeKeydown={onGetMainTerms} //esc키 눌렀을경우 함수 실행
          onBackgroundClick={onGetMainTerms} //esc키 or 오버레이부분 클릭시 함수 실행
        >
          <DivInModal>
            <div>{mainTerms?.title}</div>
            <div onClick={onGetMainTerms}>X</div>
          </DivInModal>
          <div>{mainTerms?.content}</div>
        </StyledModal>
        <div className="info">
          <span>상호</span> {mainInform?.name} <br />
          <span>주소</span> {mainInform?.addr}
          <br />
          <span>개인정보관리책임자 </span>
          {mainInform?.nick}
          <br />
        </div>
        <div className="copyright">
          <i>Copyright 2023.{mainInform?.name}.All rights reserved.</i>
        </div>
      </div>
      <div className="tel">
        전화번호
        <p>{mainInform?.phone}</p>
      </div>
    </FooterComp>
  );
};

export default Footer;
