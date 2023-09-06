import React from "react";
import KoreaMap from "../area/KoreaMap";
import styled from "styled-components";

const SearchWrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const SelectContainer = styled.div`
  position: fixed;
  top: 119px;
  z-index: 900;

  select {
    background: ${props => props.theme.subColor};
    margin-left: 30px;
    padding: 10px 20px;
  }
  input {
    padding: 10px 40px;
  }
  div {
    position: fixed;
    background: ${props => props.theme.mainColor};
    padding: 34px 10px 20px 176px;
    width: 600px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const SearchComp = ({
  searchKeyword,
  areaCode,
  onClickArea,
  contentTypes,
  onSelectedContentType,
  onSearchArea,
  onChange,
}) => {
  return (
    <SearchWrapper>
      <SelectContainer>
        <div>
          <select onChange={onSelectedContentType}>
            <option>컨텐츠타입</option>
            {contentTypes &&
              contentTypes.map(item => (
                <option name="contentType" value={item.code} key={item.code}>
                  {item.name}
                </option>
              ))}
          </select>
          <input
            placeholder="검색해주세요"
            onKeyUp={onSearchArea}
            value={searchKeyword}
            onChange={onChange}
          />
        </div>
      </SelectContainer>
      <KoreaMap
        className="korea-map"
        onClick={onClickArea}
        areaCode={areaCode}
      />
    </SearchWrapper>
  );
};

export default SearchComp;
