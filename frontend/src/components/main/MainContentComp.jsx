import styled from "styled-components";
import WrapperComp from "../common/WrapperComp";
import ThemeComp from "../common/ThemeComp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import Swal from "sweetalert2";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MainContentWrapper = styled.div`
  width: 100%;
  background: ${ThemeComp.softblue};
  display: block;
  padding: 50px 0 100px 0;
  margin-top: 100px;
`;

const TravelList = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;

  .bg {
    width: 500px;
    height: 500px;
    background: #333;
    border-radius: 20px;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 100px 100px inset;
    .title {
      position: absolute;
      bottom: 120px;
      left: 30px;
      font-size: 40px;
      color: ${ThemeComp.white};
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      padding: 10px 0;
      border-bottom: 5px solid ${ThemeComp.red};
      font-family: "SUITE-Regular";
      font-weight: 600;
    }

    .place {
      position: absolute;
      bottom: 66px;
      left: 30px;
      font-size: 30px;
      color: ${ThemeComp.white};
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
      font-family: "SUITE-Regular";
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

  @media (max-width: 1260px) {
    .bg {
      height: 400px;
      .title {
        font-size: 30px;
        bottom: 80px;
      }
      .place {
        font-size: 20px;
        bottom: 40px;
      }
    }
  }
`;

const TravelListTitle = styled.div`
  margin-top: 20px;
  h2 {
    font-size: 30px;
    font-family: "SUITE-Regular";
    span {
      color: ${ThemeComp.subcolor};
      font-size: 36px;
      font-family: "OAGothic-ExtraBold";
      font-weight: 600;
    }
  }
`;
const TravelListItem = styled.div`
  width: 300px;
  height: 400px;
  background: #dff6b3;
`;

const MaincontentComp = () => {
  const onSwal = () => {
    Swal.fire({
      icon: "error",
      title: "구현 중...",
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
          <Swiper slidesPerView={4} spaceBetween={30} autoplay={{ delay: 3000 }} loop={true} loopadditionalslides={5} navigation={true} modules={[Navigation, Pagination, Autoplay]} className="mySwiper">
            <SwiperSlide className="bg bg1" onClick={onSwal}>
              <p className="title">제주도</p>
              <p className="place">무지개 해안도로</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg2" onClick={onSwal}>
              <p className="title">부산</p>
              <p className="place">엑스더스카이 전망대</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg3" onClick={onSwal}>
              <p className="title">울산</p>
              <p className="place">간월재</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg4" onClick={onSwal}>
              <p className="title">충북</p>
              <p className="place">갈론계곡</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg5" onClick={onSwal}>
              <p className="title">경주</p>
              <p className="place">안압지</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg6" onClick={onSwal}>
              <p className="title">남해</p>
              <p className="place">상상양떼목장&편백숲</p>
            </SwiperSlide>
            <SwiperSlide className="bg bg7" onClick={onSwal}>
              <p className="title">전주</p>
              <p className="place">전주 한옥 마을</p>
            </SwiperSlide>
          </Swiper>
        </TravelList>
      </WrapperComp>
    </MainContentWrapper>
  );
};

export default MaincontentComp;
