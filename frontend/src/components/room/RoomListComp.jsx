import React from 'react';
import styled from 'styled-components';
import PageNavComp2 from '../common/PageNavComp2';

const AreaItemBlock = styled.div`img{width: 100px;height: 100px;}`;

const AreaItem = ({ area, itemKey, onClick }) => {
  // console.log('area : ', area);
  return (
    <AreaItemBlock key={itemKey || area.contentid}>
      <p><img src={area.firstimage !== "" ? area.firstimage : area.firstimge2} alt="이미지없음" /></p>
      <p onClick={onClick} data-mapx={area.mapx} data-mapy={area.mapy} data-title={area.title}>{area.title} / {area.addr1}</p>
      <hr />
    </AreaItemBlock>
  );
}

const RoomListComp = ({ areas, error, onClick, onClickTest }) => {
  const result = areas.response.body;
  let target;
  if (areas) target = result.items.item;

  return (
    <div>
      {areas && target && target.map((area) => (
        <AreaItem area={area} onClick={onClick} itemKey={area.contentid} />
      ))}
      <PageNavComp2
        pageNo={result.pageNo}
        totalCount={result.totalCount}
        numOfRows={result.numOfRows}
      />
    </div>
  );
};

export default React.memo(RoomListComp);