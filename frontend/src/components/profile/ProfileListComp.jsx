import React from "react";
import { styled } from "styled-components";

const ListBox = styled.div`
  width: 90%;
  margin: 0 auto;
  height: 600px;
  background: ${props => props.theme.smoke};

  padding: 50px;

  @media (max-width: 1200px) {
    width: 100%;
    padding: 0;
  }
`;

const ProfileListComp = ({ children }) => {
  return <ListBox>{children}</ListBox>;
};

export default React.memo(ProfileListComp);
