import { styled } from "styled-components";

const TitleText = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
`;

const SubTitleText = styled.p`
  text-align: center;
  font-size: 13px;
  margin-top: 20px;
`;

const TitleComp = props => {
  return (
    <>
      <TitleText {...props} />
    </>
  );
};

const SubTitleComp = props => {
  return (
    <>
      <SubTitleText {...props} />
    </>
  );
};

export { TitleComp, SubTitleComp };
