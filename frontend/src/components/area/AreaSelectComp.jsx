import React from "react";

import styled from "styled-components";

import AreaListCntr from "../../containers/area/AreaListCntr";
import KoreaMap from "./KoreaMap";

const AreaSelectWrapper = styled.div`
  margin-bottom: 100px;
  height: 100vh;
  width: 100%;
`;

const MapContainer = styled.div`
  display: flex;
  margin-top: -35px;
  width: 100%;
`;

const ListContainer = styled.div`
  display: flex;
  position: static;
  overflow: auto;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  background: ${props => props.theme.mainColor};
  height: 1050px;
  width: 800px;
  top: 120px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .select-list {
    margin-top: 0px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  background: ${props => props.theme.subColor};
  padding: 20px;
  width: 760px;
`;

const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
`;
const ThemeListItem = styled.button`
  cursor: pointer;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin: 0 10px;
  padding: 10px 20px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
  }

  &.selectItem {
    background-color: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
    font-weight: 600;
  }
`;

const SelectArea = ({ onClick, area, areaCode }) => {
  return (
    <>
      <ThemeListItem
        onClick={onClick}
        value={area.code}
        className={areaCode === `${area.code}` ? "selectItem" : null}
      >
        {area.name}
      </ThemeListItem>
    </>
  );
};

const SelectType = ({ onClick, type, contentTypeId }) => {
  return (
    <>
      <ThemeListItem
        onClick={onClick}
        value={type.code}
        className={contentTypeId === `${type.code}` ? "selectItem" : null}
      >
        {type.name}
      </ThemeListItem>
    </>
  );
};

const AreaSelectComp = ({
  onClickArea,
  onClickType,
  areas,
  contentTypes,
  areaCode,
  contentTypeId,
  loading,
}) => {
  return (
    <>
      <AreaSelectWrapper>
        <MapContainer>
          <div>
            <KoreaMap areas={areas} onClick={onClickArea} areaCode={areaCode} />
          </div>
        </MapContainer>
        <ListContainer>
          <ThemeList>
            <ButtonBox>
              {contentTypes.map(type => (
                <SelectType
                  type={type}
                  key={type.code}
                  onClick={onClickType}
                  contentTypeId={contentTypeId}
                />
              ))}
            </ButtonBox>
            <div className="select-list">
              <AreaListCntr className="select" />
            </div>
          </ThemeList>
        </ListContainer>
      </AreaSelectWrapper>
    </>
  );
};

export default React.memo(AreaSelectComp);
