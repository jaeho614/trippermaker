import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import Swal from "sweetalert2";
import { getWishDetail } from "../../modules/profile/ProfileMod";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";

import WrapperComp from "../common/WrapperComp";

const MainContentWrapper = styled.div`
  display: block;
  padding: 50px 0 100px 0;
  width: 100%;
`;

const TravelList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;

  .bg {
    position: relative;
    width: 500px;
    height: 500px;
    background: #333;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 100px 100px inset;
    .title {
      position: absolute;
      color: ${props => props.theme.white};
      border-bottom: 5px solid ${props => props.theme.red};
      font-family: "SUITE-Regular";
      font-size: 40px;
      font-weight: 600;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      padding: 10px 0;
      bottom: 120px;
      left: 30px;
    }

    .place {
      position: absolute;
      color: ${props => props.theme.white};
      font-family: "SUITE-Regular";
      font-size: 30px;
      bottom: 66px;
      left: 30px;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    }
  }

  .bg1 {
    background: url("/assets/main-content1.jpg");
    background-size: cover;
  }
  .bg2 {
    background: url("/assets/main-content2.jpg");
    background-size: cover;
  }
  .bg3 {
    background: url("/assets/main-content3.jpeg");
    background-size: cover;
  }
  .bg4 {
    background: url("/assets/main-content4.jpg");
    background-size: cover;
  }
  .bg5 {
    background: url("/assets/main-content5.jpeg");
    background-size: cover;
  }
  .bg6 {
    background: url("/assets/main-content6.jpg");
    background-size: cover;
  }
  .bg7 {
    background: url("/assets/main-content7.jpg");
    background-size: cover;
  }
  @media (max-width: 1200px) {
    margin: 20px auto;
    width: 90%;
  }
`;

const TravelListTitle = styled.div`
  margin-top: 20px;
  h2 {
    font-family: "SUITE-Regular";
    font-size: 30px;
    color: ${props => props.theme.text};
    span {
      color: ${props => props.theme.mainColor};
      font-size: 36px;
      font-family: "OAGothic-ExtraBold";
      font-weight: 600;
    }
  }

  @media (max-width: 1200px) {
    h2 {
      margin-left: 40px;
    }
  }
`;

const MaincontentComp = () => {
  const dispatch = useDispatch();
  const { wish, wishError } = useSelector(({ ProfileMod }) => ({
    wish: ProfileMod?.wish,
    wishError: ProfileMod?.wishError,
  }));

  const onSwal = () => {
    Swal.fire({
      icon: "error",
      title: "구현 중...",
    });
  };

  const onDetail = e => {
    const { id, type, title } = e.target.dataset;
    dispatch(getWishDetail({ title, contentId: id, contentTypeId: type }));
    Swal.fire({
      text: "볼까요",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(result => {
      if (result.isConfirmed && !wishError) {
        Swal.fire({
          html: `<p>${wish.title}</p>
          <p>
          <전화번호 : ${wish.data.infocenter}</p>
          <p>휴일 : ${wish.data.restdate}</p>
          <p>컨텐츠 : ${wish.data.expguide}</p>
          <p>이용시간 : ${wish.data.usetime}</p>
          <p>주차가능여부 : ${wish.data.parking}</p>
          <p>반려동물 동반여부 : ${wish.data.chkpet}</p>
          <p>신용카드 이용 : ${wish.data.chkcreditcard}</p>`,
        });
      }
    });
  };

  return (
    <MainContentWrapper>
      <WrapperComp>
        <TravelListTitle>
          <h2>
            <span>7월</span>에 떠나기 좋은 여행지는?
          </h2>
        </TravelListTitle>

        <TravelList>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            autoplay={{ delay: 3000 }}
            loop={true}
            loopadditionalslides={5}
            navigation={true}
            breakpoints={{
              1200: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 2,
              },
              300: {
                slidesPerView: 1,
              },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide className="bg bg1" onClick={onSwal}>
              <p className="title">제주도</p>
              <p className="place">무지개 해안도로</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg2">
              <p className="title">부산</p>
              <p
                className="place"
                onClick={onDetail}
                data-id="2668973"
                data-type="12"
                data-title="엑스더스카이 전망대"
              >
                엑스더스카이 전망대
              </p>
            </SwiperSlide>
            <SwiperSlide className="bg bg3">
              <p className="title">울산</p>
              <p
                className="place"
                onClick={onDetail}
                data-id="2723688"
                data-type="12"
                data-title="간월재"
              >
                간월재
              </p>
            </SwiperSlide>
            <SwiperSlide className="bg bg4">
              <p className="title">충북</p>
              <p
                className="place"
                onClick={onDetail}
                data-id="753397"
                data-type="12"
                data-title="갈론계곡"
              >
                갈론계곡
              </p>
            </SwiperSlide>
            <SwiperSlide className="bg bg5" onClick={onSwal}>
              <p className="title">경주</p>
              <p className="place">안압지</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg6">
              <p className="title">남해</p>
              <p
                className="place"
                onClick={onDetail}
                data-id="2536599"
                data-type="12"
                data-title="상상양떼목장"
              >
                상상양떼목장&편백숲
              </p>
            </SwiperSlide>
            <SwiperSlide className="bg bg7">
              <p className="title">전주</p>
              <p
                className="place"
                onClick={onDetail}
                data-id="264284"
                data-type="12"
                data-title="전주한옥마을"
              >
                전주 한옥 마을
              </p>
            </SwiperSlide>
          </Swiper>
        </TravelList>
      </WrapperComp>
    </MainContentWrapper>
  );
};

export default MaincontentComp;
