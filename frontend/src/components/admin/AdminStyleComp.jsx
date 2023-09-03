import { styled } from "styled-components";

import ButtonComp from "../../components/common/ButtonComp";

const AdminBoardWrap = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.white};

  &:first-child {
    margin-left: 1%;
    width: 35%;
  }
  &:last-child {
    margin-left: 1%;
    width: 62%;
  }
`;

const BoardName = styled.div`
  background: ${props => props.theme.adminColor};
  font-size: 20px;
  padding: 10px 20px;
  width: 100%;
  div {
    color: ${props => props.theme.white};
    margin-left: 10px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px;
  padding: 20px;
  width: 100%;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 20px;
  height: 40px;
  width: 100px;

  &:hover {
    background: ${props => props.theme.hoverButton};
  }
`;

const WriteButton = styled(ButtonComp)`
  position: relative;
  text-align: center;
  margin: 20px 0;
  top: 30px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Label = styled.label`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  margin: 0 10px;
  gap: 0.5rem;
`;

const TestBox = styled.div`
  background: ${props => props.theme.mainColor};
  border-radius: 20px;
  margin: 20px;
  height: 250px;
  width: 350px;
  box-shadow: ${props => props.theme.shadow};
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
  gap: 4px;
`;

const PaginationButton = styled.button`
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 20px;
  padding: 8px;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.text};
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    background: ${props => props.theme.button};
    transform: revert;
  }

  &[aria-current] {
    cursor: revert;
    background: ${props => props.theme.mainColor};
    color: ${props => props.theme.text};
    border: 2px solid ${props => props.theme.border};
    font-weight: bold;
    transform: revert;
  }
`;

const AdminStyleComp = ({
  onChangeStyleMode,
  onSubmitStyle,
  adminStyle,
  selectedStyle,
}) => {
  return (
    <AdminBoardWrap>
      <BoardContainer>
        <BoardName>
          <div>스타일관리</div>
        </BoardName>
        <ButtonBox>
          <Label>
            <span>BASIC</span>
            {selectedStyle === null && adminStyle === "basic" ? (
              <input
                name="styleColor"
                value="basic"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
                defaultChecked //일반 checked 쓰면 콘솔창에 undefined 에러발생.
              />
            ) : (
              <input
                name="styleColor"
                value="basic"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
              />
            )}
          </Label>
          <Label>
            <span>DARK</span>
            {selectedStyle === null && adminStyle === "dark" ? (
              <input
                name="styleColor"
                value="dark"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
                defaultChecked //일반 checked 쓰면 콘솔창에 undefined 에러발생.
              />
            ) : (
              <input
                name="styleColor"
                value="dark"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
              />
            )}
          </Label>
          <Label>
            <span>GREEN</span>
            {selectedStyle === null && adminStyle === "green" ? (
              <input
                name="styleColor"
                value="green"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
                defaultChecked //일반 checked 쓰면 콘솔창에 undefined 에러발생.
              />
            ) : (
              <input
                name="styleColor"
                value="green"
                role="switch"
                type="radio"
                onChange={onChangeStyleMode}
              />
            )}
          </Label>
        </ButtonBox>
        <Button onClick={onSubmitStyle}>적용</Button>
        <TestBox>
          <WriteButton>버튼</WriteButton>
          <Nav>
            <PaginationButton>&lt;</PaginationButton>
            <PaginationButton aria-current="true">1</PaginationButton>
            <PaginationButton>&gt;</PaginationButton>
          </Nav>
        </TestBox>
      </BoardContainer>
    </AdminBoardWrap>
  );
};

export default AdminStyleComp;
