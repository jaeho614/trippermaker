import React from "react";

import { styled } from "styled-components";

const AllScheduleBox = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  padding: 15px;
`;

const WishListBoxComp = ({ children }) => {
  return <AllScheduleBox>{children}</AllScheduleBox>;
};

export default React.memo(WishListBoxComp);
