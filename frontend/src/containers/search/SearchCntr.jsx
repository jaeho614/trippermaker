import React, { useState } from "react";
import SearchComp from "../../components/search/SearchComp";
import { useDispatch, useSelector } from "react-redux";
import {
  unloadPage,
  showAreaCode,
  showPageNo,
  showContentTypeId,
  showKeyword,
} from "../../modules/search/SearchMod";

const contentTypes = [
  { name: "관광지", code: 12 },
  { name: "문화시설", code: 14 },
  { name: "축제공연행사", code: 15 },
  { name: "레포츠", code: 28 },
  { name: "쇼핑", code: 38 },
  { name: "숙소", code: 32 },
  { name: "음식점", code: 39 },
];

const SearchCntr = () => {
  const { areaCode, keyword, loading, searchType } = useSelector(
    ({ SearchMod, LoadingMod }) => ({
      areaCode: SearchMod.areaCode,
      keyword: SearchMod.keyword,
      searchType: SearchMod.searchType,
      loading: LoadingMod,
    })
  );

  const [searchKeyword, setSearchKeyword] = useState(keyword || "");

  const dispatch = useDispatch();

  const onClickArea = e => {
    const areaCode = e.target.dataset.value;
    const page = 1;
    dispatch(showAreaCode(areaCode));
    dispatch(showPageNo(page));
    dispatch(showContentTypeId(null));
  };

  const onSelectedContentType = e => {
    const contentTypeId = e.target.value;
    dispatch(showContentTypeId(contentTypeId));
  };

  const onSearchArea = e => {
    if (e.key === "Enter") {
      dispatch(unloadPage());
      const keyword = `${e.target.value}`;
      dispatch(showKeyword(keyword));
    }
  };

  const onChange = e => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <SearchComp
        onClickArea={onClickArea}
        areaCode={areaCode}
        contentTypes={contentTypes}
        onSelectedContentType={onSelectedContentType}
        onSearchArea={onSearchArea}
        searchKeyword={searchKeyword}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchCntr;
