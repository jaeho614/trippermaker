import React from "react";

import styled from "styled-components";

import PageNavComp2 from "../common/PageNavComp2";

const RoomListContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  background: ${props => props.theme.mainColor};
  overflow: auto;
  height: 1080px;
  width: 800px;
  top: 130px;
  left: 0;
`;

const AreaItemBlock = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 30px 20px;
  width: 100%;

  img {
    background: ${props => props.theme.smoke};
    border-radius: 20px;
    height: 240px;
    width: 300px;
  }

  .room-text {
    margin-left: 40px;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
  }

  .addr {
    font-size: 18px;
    margin-top: 10px;
  }

  .add-btn {
    display: block;
    cursor: pointer;
    text-align: center;
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
    border-radius: 15px;
    margin-top: 50px;
    margin-left: 260px;
    padding: 7px 9px;
    width: 50px;
    transition: 0.3s;

    &:hover {
      background: ${props => props.theme.hoverButton};
    }
  }
`;

const RoomList = styled.div`
  margin: 0 auto;
`;

const StyledP = styled.p`
  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
`;

const AreaItem = ({ area, onClick, addWish }) => {
  return (
    <AreaItemBlock>
      <img
        src={
          area.firstimage !== ""
            ? area.firstimage
            : area.firstimge2
            ? area.firstimge2
            : "/assets/triplogo-noimage.png"
        }
        alt="이미지없음"
        loading="lazy"
      />
      <div className="room-text">
        <p className="title">{area.title}</p>
        <StyledP
          className="addr"
          onClick={onClick}
          data-mapx={area.mapx}
          data-mapy={area.mapy}
          data-title={area.title}
          data-contentid={area.contentid}
          data-contenttypeid={area.contenttypeid}
        >
          {area.addr1}
        </StyledP>
        <span
          className="add-btn"
          onClick={addWish}
          data-contentid={area.contentid}
          data-title={area.title}
          data-contenttypeid={area.contenttypeid}
        >
          + 추가
        </span>
      </div>
    </AreaItemBlock>
  );
};

const RoomListComp = ({ areas, error, onClick, loading, addWish }) => {
  let result;
  let target;
  if (areas && areas.response && areas.response.body) {
    result = areas.response?.body;
    target = result.items.item;
  }
  return (
    <RoomListContainer>
      <RoomList>
        {!loading &&
          areas &&
          target &&
          target.map(area => (
            <AreaItem
              area={area}
              onClick={onClick}
              key={area.contentid}
              addWish={addWish}
            />
          ))}
      </RoomList>
      <PageNavComp2
        pageNo={result?.pageNo}
        totalCount={result?.totalCount}
        numOfRows={result?.numOfRows}
      />
    </RoomListContainer>
  );
};

export default React.memo(RoomListComp);
