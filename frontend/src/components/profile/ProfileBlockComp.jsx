import { styled } from "styled-components";

const ProfileBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 60px auto;
  justify-content: space-around;

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

export default ProfileBlockComp;
