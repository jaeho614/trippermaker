import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { showKeyword } from "../modules/search/SearchMod";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";
import { Reveal, Tween } from "react-gsap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import MainSearchComp from "../components/main/MainSearchComp";
import MaincontentComp from "../components/main/MainContentComp";
import MainChatComp from "../components/main/MainChatComp";
import { useDispatch } from "react-redux";
import MainBoardCntr from "../containers/main/MainBoardCntr";

const MainContainer = styled.div`
  background: ${props => props.theme.mainColor};
`;

const SlideWarraper = styled.div`
  position: relative;
  top: -200px;
  height: 850px;

  img {
    width: 100%;
    background-position: center;
    background-size: auto;
    object-fit: cover;
    height: 850px;
  }

  .slide-text {
    position: absolute;
    bottom: 140px;
    left: 140px;
  }

  h3 {
    font-size: 70px;
    font-family: "PyeongChangPeace-Bold";
    line-height: 74px;
    color: ${props => props.theme.white};
    -webkit-text-stroke: 1px ${props => props.theme.black};
    text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  }
  p {
    display: inline-block;
    cursor: pointer;
    font-size: 20px;
    background: ${props => props.theme.yellow};
    color: #fff;
    border: 2px solid #000;
    border-radius: 50px;
    margin-top: 10px;
    padding: 10px 40px;

    span {
      margin-right: 10px;
      color: ${props => props.theme.black};
    }
  }
  p:hover {
    background: rgba(255, 255, 255, 0.7);
  }

  @media (max-width: 1200px) {
    .slide-text {
      position: absolute;
      bottom: 100px;
      left: 40px;
    }

    h3 {
      font-size: 55px;
      line-height: 50px;
    }
    p {
      font-size: 20px;
    }
  }
  @media (max-width: 1200px) {
    .slide-text {
      position: absolute;
      bottom: 100px;
      left: 40px;
    }

    h3 {
      font-size: 55px;
      line-height: 50px;
    }
    p {
      font-size: 20px;
    }
  }
  @media (max-width: 600px) {
    height: 600px;
    img {
      height: 600px;
    }
    .slide-text {
      position: absolute;
      bottom: 50px;
      left: 40px;
    }

    h3 {
      font-size: 55px;
      line-height: 50px;
    }
    p {
      font-size: 20px;
    }
  }
`;

const MainBoardListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: ${props => props.theme.mainColor};
  margin: 0 auto;
  padding: 20px 0 60px;
  width: 100%;
`;

const FadeInLeft = ({ children }) => (
  <Tween
    from={{ opacity: 0, transform: "translate3d(-100vw, 0, 0)" }}
    ease="back.out(1.4)"
  >
    {children}
  </Tween>
);

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearchArea = e => {
    if (e.key === "Enter") {
      const keyword = `${e.target.value}`;
      dispatch(showKeyword(keyword));
      navigate("/search");
    } else if (e.button === 0) {
      const keyword = `${e.target.dataset.keyword}`;
      dispatch(showKeyword(keyword));
      navigate("/search");
    }
  };

  return (
    <MainContainer>
      <SlideWarraper>
        <Swiper
          cssMode={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/assets/mainslide.jpeg" alt="슬라이드1" />
            <div className="slide-text">
              <Reveal repeat trigger={<div />}>
                <FadeInLeft>
                  <h3>바다로 떠나는 여행</h3>
                  <p>
                    <span onClick={onSearchArea} data-keyword="바다">
                      전국 곳곳 바다여행 알아보기
                    </span>
                    <FontAwesomeIcon icon={faRightLong} />
                  </p>
                </FadeInLeft>
              </Reveal>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/mainslide2.jpeg" alt="슬라이드1" />
            <div className="slide-text">
              <Reveal repeat trigger={<div />}>
                <FadeInLeft>
                  <h3>
                    하늘에서 즐기는 <br /> 액티비티한 여행
                  </h3>
                  <p>
                    <span onClick={onSearchArea} data-keyword="액티비티">
                      액티비티 여행 찾아보기
                    </span>
                    <FontAwesomeIcon icon={faRightLong} />
                  </p>
                </FadeInLeft>
              </Reveal>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/mainslide3.jpg" alt="슬라이드1" />
            <div className="slide-text">
              <Reveal repeat trigger={<div />}>
                <FadeInLeft>
                  <h3>아름다운 풍경과 마주하는 여행</h3>
                  <p>
                    <span onClick={onSearchArea} data-keyword="풍경명소">
                      전국 풍경 명소 찾아보기
                    </span>
                    <FontAwesomeIcon icon={faRightLong} />
                  </p>
                </FadeInLeft>
              </Reveal>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/mainslide4.jpeg" alt="슬라이드1" />
            <div className="slide-text">
              <Reveal repeat trigger={<div />}>
                <FadeInLeft>
                  <h3>
                    고즈넉한 <br />
                    한옥을 즐기고 싶다면
                  </h3>
                  <p>
                    <span onClick={onSearchArea} data-keyword="한옥펜션">
                      아름다운 한옥펜션 알아보기
                    </span>
                    <FontAwesomeIcon icon={faRightLong} />
                  </p>
                </FadeInLeft>
              </Reveal>
            </div>
          </SwiperSlide>
        </Swiper>
      </SlideWarraper>
      <MainSearchComp onSearchArea={onSearchArea} />
      <MaincontentComp />
      <MainBoardListContainer>
        <MainChatComp />
        <MainBoardCntr />
      </MainBoardListContainer>
    </MainContainer>
  );
};

export default Main;
