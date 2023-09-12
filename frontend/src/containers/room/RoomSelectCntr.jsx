import RoomSelectComp from "../../components/room/RoomSelectComp";
import { showAreaCode, showContentTypeId, showPageNo } from "../../modules/room/LodgingMod"
import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

const areas = [
  { "name": "서울", "code": 1 }, { "name": "인천", "code": 2 }, { "name": "대전", "code": 3 }, { "name": "대구", "code": 4 },
  { "name": "광주", "code": 5 }, { "name": "부산", "code": 6 }, { "name": "울산", "code": 7 }, { "name": "세종", "code": 8 },
  { "name": "경기도", "code": 31 }, { "name": "강원도", "code": 32 }, { "name": "충청북도", "code": 33 },
  { "name": "충청남도", "code": 34 }, { "name": "경상북도", "code": 35 }, { "name": "경상남도", "code": 36 },
  { "name": "전라북도", "code": 37 }, { "name": "전라남도", "code": 38 }, { "name": "제주특별자치도", "code": 39 }
];

useEffect(() => {
  Swal.fire({
    icon: 'info',
    text: '지도에서 지역을 눌러주세요!'
  })
}, [])

const RoomSelectCntr = () => {
  const dispatch = useDispatch();
  const { areaCode, loading } = useSelector(({ LodgingMod, LoadingMod }) => ({
    areaCode: LodgingMod.areaCode,
    loading: LoadingMod
  }));

  const onClickArea = (e) => {
    console.log('value : ', e.target.dataset.value);
    const areaCode = e.target.dataset.value;
    const page = 1;
    dispatch(showAreaCode(areaCode));
    dispatch(showPageNo(page));
    dispatch(showContentTypeId(32));
  };

  return <RoomSelectComp onClickArea={onClickArea} areas={areas} areaCode={areaCode} loading={loading} />;
};

export default RoomSelectCntr;
