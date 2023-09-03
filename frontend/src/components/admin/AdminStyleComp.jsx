import { styled } from "styled-components";

import ButtonComp from "../../components/common/ButtonComp";
import PaginationComp from "../common/PaginationComp";

const AdminBoardWrap = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 30px;
  width: 100%;
`;

const BoardContainer = styled.div`
  background: ${props => props.theme.smoke};

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
  background: ${props => props.theme.smoke};
  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${props => props.theme.text};
    margin-left: 10px;
  }
`;

const ButtonBox = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  margin: 10px;
  padding: 7px 12px;

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
  height: 250px;
  width: 250px;
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
          <PaginationComp total={"20"} limit={"10"} page={"5"} setPage={""} />
        </TestBox>
      </BoardContainer>
    </AdminBoardWrap>
  );
};

export default AdminStyleComp;
