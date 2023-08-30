import { styled } from "styled-components";
import React from "react";

const AllScheduleBox = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  justify-content: space-around;
`;

const WishListBoxComp = ({ children }) => {
  return <AllScheduleBox>{children}</AllScheduleBox>;
};

export default React.memo(WishListBoxComp);
