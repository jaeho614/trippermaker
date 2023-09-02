import { css, styled } from "styled-components";
import ButtonComp from "../../components/common/ButtonComp";
import PaginationComp from "../common/PaginationComp";

const AdminBoardWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  margin-top: 30px;
`;

const BoardContainer = styled.div`
  background: ${(props) => props.theme.smoke};

  &:first-child {
    width: 35%;
    margin-left: 1%;
  }
  &:last-child {
    width: 62%;
    margin-left: 1%;
  }
`;

const BoardName = styled.div`
  background: ${(props) => props.theme.dark};

  font-size: 20px;
  padding: 10px 20px;
  span {
    color: ${(props) => props.theme.smoke};
    margin-left: 10px;
  }
`;

const BoardTag = styled.div`
  display: flex;
  justify-content: space-around;
  background: yellow;
  padding: 10px;
`;

const ButtonBox = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  background: ${(props) => props.theme.lightblack};
  color: ${(props) => props.theme.smoke};
  cursor: pointer;
  padding: 7px 12px;
  margin: 10px;

  &:hover {
    background: ${(props) => props.theme.softblack};
  }
`;

const WriteButton = styled(ButtonComp)`
  border: 1px solid black;
  margin: 20px 0;
  text-align: center;
  position: relative;
  left: 50%;
  top: 30px;
  transform: translate(-50%, 0);
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  margin: 0 10px;
`;

const TestBox = styled.div`
  width: 250px;
  height: 250px;
  background: ${(props) => props.theme.bgcolor};
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
