import React from "react";
import styled from "styled-components";
import PageNavComp4 from "../common/PageNavComp4";

const AreaItemBlock = styled.div`
  background: ${props => props.theme.mainColor};
  border-bottom: 1px solid ${props => props.theme.border};
  margin: 0 auto;
  padding: 30px 20px;
  width: 100%;
  div {
    display: flex;
  }
  img {
    border: 1px solid ${props => props.theme.border};
    border-radius: 10px;
    height: 200px;
    width: 230px;
  }
  .des {
    display: flex;
    flex-direction: column;
    margin-left: 60px;

    .title {
      font-size: 20px;
      font-weight: 600;
      color: ${props => props.theme.text};
      border-bottom: 2px solid ${props => props.theme.border};
      padding: 10px 0;
    }

    .addr {
      color: ${props => props.theme.text};
      margin-top: 10px;
    }

    .add-btn {
      cursor: pointer;
      text-align: center;
      background: ${props => props.theme.button};
      color: ${props => props.theme.buttonText};
      border-radius: 15px;
      margin-top: 40px;
      margin-left: 320px;
      padding: 7px 9px;
      width: 50px;
      transition: 0.3s;

      &:hover {
        background: ${props => props.theme.hoverButton};
      }
    }
  }
`;

const RoomListContainer = styled.div`
  display: flex;
  position: absolute;
  overflow: auto;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 0 auto;
  height: 1080px;
  width: 800px;
  top: 120px;
  left: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.mainColor};
  margin-top: 90px;
`;

const AreaItem = ({ area, onClick, addWish }) => {
  return (
    <AreaItemBlock>
      <div>
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
        <div className="des">
          <p className="title">{area.title}</p>
          <p
            className="addr"
            onClick={onClick}
            data-mapx={area.mapx}
            data-mapy={area.mapy}
            data-title={area.title}
          >
            {area.addr1}
          </p>
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
      </div>
    </AreaItemBlock>
  );
};

const SearchResultComp = ({
  areas,
  error,
  loading,
  addWish,
  searchType,
  onClick,
}) => {
  if (!error) {
    let result;
    let target;
    if (searchType === "DB") {
      if (areas.areas.rows && areas.areas.rows.length >= 0) {
        target = areas.areas.rows;
      }
    } else if (searchType === "API") {
      if (areas.areas && areas.areas.response && areas.areas.response.body) {
        result = areas.areas.response?.body;
        target = result.items.item;
      }
    }
    return (
      <div>
        <RoomListContainer>
          <RoomList>
            {searchType === "API" &&
              !loading &&
              areas &&
              target &&
              target.map(area => (
                <AreaItem area={area} key={area.contentid} addWish={addWish} />
              ))}
            {searchType === "DB" &&
              !loading &&
              areas &&
              target &&
              target.map(area => (
                <AreaItem area={area} key={area.contentid} addWish={addWish} />
              ))}
            {searchType === "API" ? (
              <PageNavComp4
                pageNo={result.pageNo}
                totalCount={result.totalCount}
                numOfRows={result.numOfRows}
              />
            ) : null}
          </RoomList>
        </RoomListContainer>
      </div>
    );
  }
};
export default React.memo(SearchResultComp);
