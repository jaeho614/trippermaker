import { styled } from "styled-components";

const KeywordBox = styled.div`
  display: inline-block;
  cursor: pointer;
  outline: none;
  text-align: center;
  background-color: ${props => props.theme.subColor};
  font-size: 18px;
  font-weight: 500;
  border-radius: 25px;
  margin-left: 20px;
  margin-top: 24px;
  padding: 12px 30px;
  box-shadow: 1px 4px 1px rgb(0, 0, 0, 0.5);

  &:active {
    position: relative;
    background-color: ${props => props.theme.hoverButton};
    color: ${props => props.theme.white};
    top: 2px;
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
  }
`;

const KeywordComp = ({ keyword, onClick }) => {
  return (
    <KeywordBox onClick={onClick} data-keyword={keyword}>
      {keyword}
    </KeywordBox>
  );
};

export default KeywordComp;
