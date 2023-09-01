import React, { useEffect } from "react";

import styled from "styled-components";

const { kakao } = window;
const KakaomapWrapper = styled.div`
  #map {
    border: 2px solid ${props => props.theme.border};
    border-radius: 20px;
    margin: 30px 20px;
  }
`;

const KakaoMapComp = ({ mapx, mapy }) => {
  useEffect(() => {
    const xdata = parseFloat(mapx || 37.5663);
    const ydata = parseFloat(mapy || 126.79581);
    const mapContainer = document.getElementById("map");
    const mapOptions = {
      center: new window.kakao.maps.LatLng(ydata, xdata),
      level: 3,
    };
    const map = new kakao.maps.Map(mapContainer, mapOptions);
    const markerPosition = new kakao.maps.LatLng(ydata, xdata);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [mapx, mapy]);

  return (
    <KakaomapWrapper>
      <div id="map" style={{ width: "650px", height: "400px" }} />
    </KakaomapWrapper>
  );
};

export default KakaoMapComp;
