import React from "react";
import LazyLoad from "react-lazyload";

import styled from "styled-components";

import PageNavComp from "../common/PageNavComp";

const AreaItemBlock = styled.div`
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  padding: 0 0 50px 0;
  width: 100%;

  div {
    display: flex;
  }
  img {
    background: ${props => props.theme.smoke};
    border: 1px solid ${props => props.theme.border};
    border-radius: 10px;
    height: 200px;
    width: 230px;
  }
  .des {
    display: flex;
    flex-direction: column;
    margin-left: 30px;

    .title {
      font-size: 20px;
      font-weight: 600;
      border-bottom: 2px solid ${props => props.theme.border};
      padding: 10px 0;
    }

    .addr {
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

const StyledP = styled.p`
  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
`;

const AreaItem = ({ area, onClick, addWish }) => {
  return (
    <AreaItemBlock>
      <div>
        <div>
          <LazyLoad>
            <img
              src={
                area.firstimage !== ""
                  ? area.firstimage
                  : area.firstimge2
                  ? area.firstimge2
                  : "/assets/triplogo.png"
              }
              alt="이미지없음"
              loading="lazy"
            />
          </LazyLoad>
        </div>
        <div className="des">
          <p className="title">{area.title}</p>
          <StyledP
            className="addr"
            onClick={onClick}
            data-mapx={area.mapx}
            data-mapy={area.mapy}
            data-title={area.title}
            data-addr={area.addr1 || area.addr2}
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
      </div>
    </AreaItemBlock>
  );
};

const AreaListComp = ({ areas, error, onClick, addWish, loading }) => {
  if (!areas.response.body) return null;
  const result = areas.response?.body;
  let target;
  if (areas) target = result.items.item;
  return (
    <div>
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
      <PageNavComp
        pageNo={result.pageNo}
        totalCount={result.totalCount}
        numOfRows={result.numOfRows}
      />
    </div>
  );
};

export default React.memo(AreaListComp);
