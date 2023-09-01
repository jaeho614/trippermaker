import styled from "styled-components";

const MainChatWarraper = styled.div`
  text-align: center;
  width: 45%;

  img {
    padding: 100px 0;
    width: 600px;
  }
  @media (max-width: 1400px) {
    text-align: center;
    margin: 0 auto;
    img {
      width: 500px;
    }
  }

  @media (max-width: 1200px) {
    text-align: center;
    margin: 0 auto;
    width: 90%;

    img {
      width: 400px;
    }
  }
`;

const MainChatComp = () => {
  return (
    <>
      <MainChatWarraper>
        <img src="/assets/banner.jpg" alt="채팅방 샘플 이미지" />
      </MainChatWarraper>
    </>
  );
};

export default MainChatComp;
