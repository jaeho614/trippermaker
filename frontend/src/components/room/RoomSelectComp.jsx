import React from "react";
import styled from "styled-components";
import KoreaMap from "../area/KoreaMap";

const RoomListItem = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  background: ${props => props.theme.mainColor};
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-top: 14px;
  margin-left: 10px;
  padding: 10px 20px;
  transition: 0.3s;
  &:hover {
    background: ${props => props.theme.subColor};
    color: ${props => props.theme.text};
  }
  &.selectItem {
    background-color: ${props => props.theme.subColor};
    color: ${props => props.theme.text};
    font-weight: 600;
  }
`;

const RoomList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  min-height: 100vh;
  width: 90%;
`;

// const SelectArea = ({ onClick, area, areaCode, loading }) => {
//   console.log('selectItem : ', areaCode);
//   return (</RoomList>
//     <>
//       <RoomListItem onClick={onClick} value={area.code} className={areaCode === `${area.code}` ? "selectItem" : null}>
//         {area.name}
//       </RoomListItem>
//     </>
//   );
// };

const AreaSelectComp = ({ onClickArea, areas, areaCode, loading }) => {
  // console.log('codes : ', areas);
  return (
    <>
      {/* <RoomList>
        {areas.map((area) => (
          <SelectArea area={area} key={area.code} onClick={onClickArea} areaCode={areaCode} />
        ))}
      </RoomList> */}
      <KoreaMap areas={areas} onClick={onClickArea} areaCode={areaCode} />
      <RoomList />
    </>
  );
};

export default React.memo(AreaSelectComp);
