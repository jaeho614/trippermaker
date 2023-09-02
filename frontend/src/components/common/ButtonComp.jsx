import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const ButtonStyle = css`
  display: inline-block;
  margin: 0 auto;
  padding: 2px 30px;
  line-height: 40px;
  border: 1px ${(props) => props.theme.bgcolor} solid;
  background-color: ${(props) => props.theme.bgcolor};
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  color: #333;
  transition: 0.4s;
  font-weight: 500;

  &:hover {
    color: #333;
    background: ${(props) => props.theme.subcolor};
    box-shadow: 200px 0 0 0 ${(props) => props.theme.subcolor} inset,
      -200px 0 0 0 rgba(0, 0, 0, 0.25) inset;
  }
`;

const ButtonLink = styled(Link)`
  ${ButtonStyle}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Button = (props) => {
  return props.to ? <ButtonLink {...props} /> : <StyledButton {...props} />;
};

export default Button;
