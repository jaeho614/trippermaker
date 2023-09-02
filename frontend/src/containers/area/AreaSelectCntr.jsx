import AreaSelectComp from "../../components/area/AreaSelectComp";
import {
  showAreaCode,
  showContentTypeId,
  showPageNo,
  unloadPage,
} from "../../modules/area/AreaMod";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const areas = [
  { name: "서울", code: 1 },
  { name: "인천", code: 2 },
  { name: "대전", code: 3 },
  { name: "대구", code: 4 },
  { name: "광주", code: 5 },
  { name: "부산", code: 6 },
  { name: "울산", code: 7 },
  { name: "세종", code: 8 },
  { name: "경기도", code: 31 },
  { name: "강원도", code: 32 },
  { name: "충청북도", code: 33 },
  { name: "충청남도", code: 34 },
  { name: "경상북도", code: 35 },
  { name: "경상남도", code: 36 },
  { name: "전라북도", code: 37 },
  { name: "전라남도", code: 38 },
  { name: "제주특별자치도", code: 39 },
];

const contentTypes = [
  { name: "관광지", code: 12 },
  { name: "문화시설", code: 14 },
  { name: "축제공연행사", code: 15 },
  { name: "레포츠", code: 28 },
  { name: "쇼핑", code: 38 },
  { name: "음식점", code: 39 },
];

const AreaSelectCntr = () => {
  const dispatch = useDispatch();

  const { areaCode, contentTypeId, loading } = useSelector(
    ({ AreaMod, LoadingMod }) => ({
      areaCode: AreaMod.areaCode,
      contentTypeId: AreaMod.contentTypeId,
      loading: LoadingMod,
    })
  );

  const onClickArea = e => {
    const areaCode = e.target.dataset.value;
    const page = 1;
    dispatch(unloadPage());
    dispatch(showAreaCode(areaCode));
    dispatch(showPageNo(page));
    dispatch(showContentTypeId(null));
  };

  const onClickType = e => {
    const contentTypeId = e.target.value;
    const page = 1;
    dispatch(showContentTypeId(contentTypeId));
    dispatch(showPageNo(page));
  };

  return (
    <AreaSelectComp
      onClickArea={onClickArea}
      onClickType={onClickType}
      areas={areas}
      contentTypes={contentTypes}
      areaCode={areaCode}
      contentTypeId={contentTypeId}
      loading={loading}
    />
  );
};

export default AreaSelectCntr;
