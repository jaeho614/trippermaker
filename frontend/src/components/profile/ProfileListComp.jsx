import React from "react";
import { styled } from "styled-components";

const ListBox = styled.div`
  background: ${props => props.theme.subColor};
  border-radius: 25px;
  margin: 0 auto;
  width: 90%;
  height: 600px;
  padding: 50px;
  box-shadow: ${props => props.theme.shadow};

  @media (max-width: 1200px) {
    padding: 0;
    width: 100%;
  }
`;

const ProfileListComp = ({ children }) => {
  return <ListBox>{children}</ListBox>;
};

export default React.memo(ProfileListComp);
