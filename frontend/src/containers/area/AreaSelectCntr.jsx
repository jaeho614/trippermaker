import React, { useState } from "react";
import AreaSelectComp from "../../components/area/AreaSelectComp";

const areaCodes = [
  { "name": "서울", "code": 1 }, { "name": "인천", "code": 2 }, { "name": "대전", "code": 3 }, { "name": "대구", "code": 4 },
  { "name": "광주", "code": 5 }, { "name": "부산", "code": 6 }, { "name": "울산", "code": 7 }, { "name": "세종", "code": 8 },
  { "name": "경기도", "code": 31 }, { "name": "강원도", "code": 32 }, { "name": "충청북도", "code": 33 },
  { "name": "충청남도", "code": 34 }, { "name": "경상북도", "code": 35 }, { "name": "경상남도", "code": 36 },
  { "name": "전라북도", "code": 37 }, { "name": "전라남도", "code": 38 }, { "name": "제주특별자치도", "code": 39 }
];

const AreaSelectCntr = () => {
  const { areaCode, setAreaCode } = useState('');
  const onClick = (e) => {
    setAreaCode(e.target.value);
  };
  return (
    <AreaSelectComp
      areaCode={areaCode}
      onClick={onClick}
      areaCodes={areaCodes}
    />
  );
};

export default AreaSelectCntr;
