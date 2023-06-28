import styled, { css } from "styled-components";
import ThemeComp from "./ThemeComp";
import { Link } from "react-router-dom";

const ButtonStyle = css`
  display: inline-block;
  margin: 0 auto;
  padding: 2px 30px;
  line-height: 40px;
  border: 1px ${ThemeComp.subcolor} solid;
  background-color: ${ThemeComp.subcolor};
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  color: #333;
  transition: 0.4s;
  font-weight: 500;

  &:hover {
    color: #333;
    background: ${ThemeComp.bgcolor};
    box-shadow: 200px 0 0 0 ${ThemeComp.bgcolor} inset,
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
  // const navigate = useNavigate();
  // const onClick = (e) => {
  //   if (to) {
  //     navigate(to);
  //   }
  //   if (rest.onClick) {
  //     rest.onClick(e);
  //   }
  // };

  return props.to ? <ButtonLink {...props} /> : <StyledButton {...props} />;
};

export default Button;