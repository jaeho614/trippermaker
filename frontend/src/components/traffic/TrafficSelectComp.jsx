import React from "react";
import styled from "styled-components";
import ThemeComp from "../common/ThemeComp";

const TrafficContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .traffic-btn {
    display: flex;
    justify-content: space-around;
    width: 20%;
  }
  button {
    background: none;
    padding: 10px 30px;
    text-align: center;
    border-radius: 10px;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
  }
  .icon {
    width: 30px;
    display: block;
    margin-top: 10px;
  }
`;

const SelectCheckList = styled.div`
  display: flex;
  text-align: center;

  .check-list {
    border: 1px solid #333;
  }
`;

const SelectListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin: 0 auto;

  .list {
    display: flex;
    justify-content: space-around;
  }
`;

const SelectListBlock = styled.div`
  width: 200px;
  height: auto;
  border: 1px solid #333;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-left: 10px;
  .title {
    background: ${ThemeComp.lightblack};
    color: ${ThemeComp.white};
    padding: 10px 0;
  }

  li {
    border-bottom: 1px solid #333;
    padding: 10px 0;
  }
  li:hover {
    background: gray;
  }
`;

const StartItem = ({ station, onClick }) => {
  return (
    <li value={station.cityCode} onClick={onClick} data-type="start">
      {station.cityName}
    </li>
  );
};

const StartDetailItem = ({ station, onClick }) => {
  return (
    <li data-value={station.stationId} onClick={onClick} data-type="start">
      {station.stationName}
    </li>
  );
};
const EndItem = ({ station, onClick }) => {
  return (
    <li value={station.cityCode} onClick={onClick} data-type="end">
      {station.cityName}
    </li>
  );
};
const EndDetailItem = ({ station, onClick }) => {
  return (
    <li data-value={station.stationId} onClick={onClick} data-type="end">
      {station.stationName}
    </li>
  );
};

const TrafficSelectComp = ({ stations, terminals, stationStartDetails, onClick2, stationEndDetails, onClickArea, onClickPlace, onClickCategory, onChangeDate }) => {
  console.log("stations : ", stations);
  return (
    <div>
      <TrafficContainer>
        <div className="traffic-btn">
          <button onClick={onClickCategory} value="train">
            <img src="/assets/train.png" alt="train" className="icon" />
            기차
          </button>
          <button onClick={onClickCategory} value="bus">
            <img src="/assets/bus.png" alt="bus" className="icon" />
            버스
          </button>
        </div>
        <div className="select-option">
          <div>출발지</div>
          <div>도착지</div>

          <input type="date" onChange={onChangeDate} />
          <select>
            <option>종류</option>
          </select>
        </div>
      </TrafficContainer>
      <SelectCheckList>
        <div className="check-list">
          <div>출발지</div>
          <p>선택출발지</p>
        </div>
        <div className="check-list">
          <div>도착지</div>
          <p>선택도착지</p>
        </div>
      </SelectCheckList>

      <SelectListContainer>
        <div className="list">
          <SelectListBlock>
            <p className="title">출발지</p>
            {stations && stations.map((station) => <StartItem station={station} key={station.cityCode} onClick={onClickArea} className="test" />)}
            {terminals && terminals.map((station) => <StartItem station={station} key={station.cityCode} onClick={onClickArea} className="test" />)}
          </SelectListBlock>
          <SelectListBlock>{stationStartDetails && stationStartDetails.map((station) => <StartDetailItem station={station} onClick={onClickPlace} />)}</SelectListBlock>
        </div>

        <div className="list">
          <SelectListBlock>
            <p className="title">도착지</p>
            {stations && stations.map((station) => <EndItem station={station} key={station.cityCode} onClick={onClickArea} className="test" />)}
          </SelectListBlock>
          <SelectListBlock>{stationEndDetails && stationEndDetails.map((station) => <EndDetailItem station={station} onClick={onClickPlace} />)}</SelectListBlock>
        </div>
      </SelectListContainer>
      <div></div>
    </div>
  );
};
export default TrafficSelectComp;
