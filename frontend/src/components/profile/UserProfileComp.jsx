import React from "react";
import { styled } from "styled-components";

const UserProfile = styled.div`
  display: flex;
  justify-content: center;
`;

const UserProfileBox = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.subColor};
  border-radius: 25px;
  padding: 30px;
  width: auto;
  box-shadow: ${props => props.theme.shadow};
`;

const UserProfileComp = ({ children }) => {
  return (
    <UserProfile>
      <UserProfileBox>{children}</UserProfileBox>
    </UserProfile>
  );
};

export default React.memo(UserProfileComp);
