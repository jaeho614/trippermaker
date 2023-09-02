import React from "react";
import styled from "styled-components";
import AreaListCntr from "../../containers/area/AreaListCntr";
import KoreaMap from "./KoreaMap";

const AreaSelectWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 100px;
`;

const MapContainer = styled.div`
  width: 100%;
  margin-top: -35px;
  display: flex;
`;

const ListContainer = styled.div`
  width: 800px;
  height: 1050px;
  position: static;
  display: flex;
  flex-direction: column;
  top: 120px;
  left: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  flex-wrap: wrap;
  background: ${(props) => props.theme.white};
  overflow: auto;
  .theme {
    background: ${(props) => props.theme.white};
    margin-top: -2px;
  }

  div {
    margin-top: 20px;
  }
  .select-list {
    margin-top: 0px;
  }
`;

const ThemeList = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 65px;
`;
const ThemeListItem = styled.button`
  background: ${(props) => props.theme.bgcolor};
  padding: 10px 20px;
  margin-left: 14px;
  margin-top: 14px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  &:hover {
    background: ${(props) => props.theme.subcolor};
    color: ${(props) => props.theme.white};
  }

  &.selectItem {
    background-color: steelblue;
    color: ${(props) => props.theme.smoke};
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
            <div className="theme">
              {contentTypes.map((type) => (
                <SelectType
                  type={type}
                  key={type.code}
                  onClick={onClickType}
                  contentTypeId={contentTypeId}
                />
              ))}
            </div>
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
