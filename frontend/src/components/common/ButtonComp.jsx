import { Link } from "react-router-dom";

import styled, { css } from "styled-components";

const ButtonStyle = css`
  display: inline-block;
  cursor: pointer;
  text-align: center;
  background-color: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  font-weight: 500;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  margin: 0 auto;
  padding: 2px 30px;
  line-height: 40px;
  transition: 0.4s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
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
