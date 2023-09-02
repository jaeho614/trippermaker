import { styled } from "styled-components";

const WrapperBlock = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  width: 1600px;

  @media (max-width: 1600px) {
    width: 100%;
  }

  @media (max-width: 1260px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WrapperComp = ({ children, ...rest }) => {
  return <WrapperBlock {...rest}>{children}</WrapperBlock>;
};

export default WrapperComp;
