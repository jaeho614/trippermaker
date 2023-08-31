import React from "react";

import { styled } from "styled-components";

const ProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.theme.mainColor};
  padding: 40px 0;
  width: 100%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    margin-top: 150px;
    margin-bottom: 200px;
    width: 100%;

    form {
      text-align: center;
    }
    .buttons {
      text-align: center;
    }
  }
`;

const ProfileBlockComp = ({ children }) => {
  return <ProfileBlock>{children}</ProfileBlock>;
};

export default React.memo(ProfileBlockComp);
