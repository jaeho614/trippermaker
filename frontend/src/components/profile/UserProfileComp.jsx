import { styled } from "styled-components";

const UserProfile = styled.div`
  display: flex;
  justify-content: center;
`;

const UserProfileComp = ({ children }) => {
  return <UserProfile>{children}</UserProfile>;
};

export default UserProfileComp;
