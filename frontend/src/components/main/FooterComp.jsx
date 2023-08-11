import { styled } from "styled-components";
import Modal from "styled-react-modal";

const StyledModal = Modal.styled`
  background: white;
  height: 50%;
  width: 50%;
  padding: 10px;

  div{
    display: flex;
    justify-content: space-between;
  }
`;

const DivInModal = styled.div`
  cursor: pointer;
  color: ${props => props.theme.red};
  margin-left: 400px;
  background: ;
  text-align: center;
`;

const FooterComp = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.smoke};
  border-top: 2px solid ${props => props.theme.lightblack};
  text-align: center;
  padding: 50px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 100px;

  .footer-menu {
    display: flex;
    justify-content: center;
    li {
      margin-left: 20px;
      color: ${props => props.theme.black};
      cursor: pointer;
      transition: 0.3s;
    }
    li:hover {
      opacity: 0.3;
    }
  }
  .copyright {
    margin-top: 20px;
    i {
      color: ${props => props.theme.black};
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
    color: ${props => props.theme.black};
    margin-top: 20px;
    span {
      color: ${props => props.theme.black};
      font-weight: 600;
    }
  }

  .tel {
    color: ${props => props.theme.black};
    font-weight: 600;
    font-size: 24px;
    p {
      color: ${props => props.theme.black};
      font-size: 20px;
      margin-top: 20px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 300px;
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
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
          <div>
            <div>{mainTerms?.title}</div>
            <DivInModal onClick={onGetMainTerms}>X</DivInModal>
          </div>
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
