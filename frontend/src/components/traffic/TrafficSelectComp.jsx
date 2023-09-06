import React from "react";
import styled from "styled-components";

const TrafficContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .traffic-btn {
    display: flex;
    justify-content: center;
  }
  button {
    cursor: pointer;
    text-align: center;
    background: none;
    font-size: 18px;
    border-radius: 10px;
    margin-left: 10px;
    padding: 10px 30px;
    line-height: 30px;
    &.select-btn {
      background: ${props => props.theme.button};
      color: ${props => props.theme.buttonText};
      border: none;
      border-radius: 30px;
    }
    &.traffic-category {
      background-color: ${props => props.theme.yellow};
    }
  }
  .icon {
    display: block;
    margin-top: 10px;
    width: 30px;
  }

  .select-option {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 20px;

    .select-area {
      cursor: pointer;
      background: ${props => props.theme.mainColor};
      border: 1px solid ${props => props.theme.border};
      border-radius: 30px;
      margin-right: 20px;
      padding: 15px 10px;
      width: 200px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

      &:hover {
        opacity: 0.7;
      }

      span {
        font-size: 18px;
        font-weight: 600;
        margin-left: 30px;
        line-height: 18px;
      }

      input {
        background: ${props => props.theme.smoke};
        border-radius: 30px;
        padding: 0 30px;
      }

      select {
        cursor: pointer;
        background: ${props => props.theme.smoke};
        height: 40px;
        width: 100px;
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      margin: 10px 0;
      div {
        margin-top: 10px;
        margin-right: 0;
      }
      input {
        background: ${props => props.theme.smoke};
        border-radius: 30px;
        margin-top: 10px;
        padding: 13px;
        width: 200px;
      }
    }
  }
`;

const SelectListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 60%;

  .list {
    display: flex;
    justify-content: space-around;
  }
  div {
    &.flag {
      display: none;
    }
  }
`;

const SelectListBlock = styled.div`
  overflow: auto;
  text-align: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-left: 10px;
  max-height: 810px;
  width: 200px;
  .title {
    background: ${props => props.theme.lightblack};
    color: ${props => props.theme.white};
    padding: 10px 0;
  }

  li {
    border-bottom: 1px solid #333;
    padding: 10px 0;
    &.clicked {
      background-color: ${props => props.theme.lightblack};
      color: ${props => props.theme.smoke};
    }
  }
  li:hover {
    background: gray;
  }
`;

const StartItem = ({ item, onClick }) => {
  return (
    <li
      value={item.cityCode}
      onClick={onClick}
      data-type="start"
      className="start-area"
      key={`Start_${item.cityCode}`}
    >
      {item.cityName}
    </li>
  );
};

const StartDetailItem = ({ item, onClick }) => {
  return (
    <li
      onClick={onClick}
      data-type="start"
      data-value={item.stationId || item.terminalId}
      data-name={item.stationName || item.terminalName}
      className="start-detail"
      key={`startDetail_${item.stationId || item.terminalId}`}
    >
      {item.stationName || item.terminalName}
    </li>
  );
};
const EndItem = ({ item, onClick }) => {
  return (
    <li
      value={item.cityCode}
      onClick={onClick}
      data-type="end"
      className="end-area"
      key={'end' + item.cityCode}
    >
      {item.cityName}
    </li>
  );
};
const EndDetailItem = ({ item, onClick }) => {
  return (
    <li
      onClick={onClick}
      data-type="end"
      data-value={item.stationId || item.terminalId}
      data-name={item.stationName || item.terminalName}
      className="end-detail"
      key={`endDetail_${item.stationId || item.terminalId}`}
    >
      {item.stationName || item.terminalName}
    </li>
  );
};

const TrafficSelectComp = ({
  target,
  stations,
  terminals,
  stationStartDetails,
  terminalStartDetails,
  stationEndDetails,
  terminalEndDetails,
  onClickArea,
  onClickPlace,
  onClickCategory,
  onChangeDate,
  onToggle,
  start,
  end,
  date,
  loading,
}) => {
  return (
    <div>
      <TrafficContainer>
        <div className="traffic-btn">
          <button onClick={onClickCategory} value="train" className="category">
            <img src="/assets/train.png" alt="train" className="icon" />
            기차
          </button>
          <button onClick={onClickCategory} value="bus" className="category">
            <img src="/assets/bus.png" alt="bus" className="icon" />
            버스
          </button>
        </div>
        <div className="select-option">
          <div className="select-area" onClick={onToggle} data-id="start">
            <span>출발지</span>
            <span>{start}</span>
          </div>
          <div className="select-area" onClick={onToggle} data-id="end">
            <span>도착지</span>
            <span>{end}</span>
          </div>
          <input
            type="date"
            onChange={onChangeDate}
            value={date}
            className="date"
          />
          {/* <button>검색</button> */}
        </div>
      </TrafficContainer>
      <SelectListContainer>
        <div className="list flag" id="start-container">
          {target ? (
            <SelectListBlock>
              <p className="title">출발지</p>
              {stations &&
                stations.map((item, index) => (
                  <StartItem
                    item={item}
                    // key={item.cityCode}
                    key={'StartItem' + index}
                    onClick={onClickArea}
                  />
                ))}
              {terminals &&
                terminals.map((item, index) => (
                  <StartItem
                    item={item}
                    // key={item.cityCode}
                    key={'StartItem_Terminal' + index}
                    onClick={onClickArea}
                  />
                ))}
            </SelectListBlock>
          ) : null}
          <SelectListBlock>
            {stationStartDetails &&
              stationStartDetails.map(station => (
                <StartDetailItem
                  item={station}
                  onClick={onClickPlace}
                  key={'StartDetailItem' + station.stationId}
                />
              ))}
            {terminalStartDetails &&
              terminalStartDetails.map(terminal => (
                <StartDetailItem
                  item={terminal}
                  onClick={onClickPlace}
                  key={'StartDetailItem2' + terminal.terminalId}
                />
              ))}
          </SelectListBlock>
        </div>

        <div className="list flag" id="end-container">
          {target ? (
            <SelectListBlock>
              <p className="title">도착지</p>
              {stations &&
                stations.map(item => (
                  <EndItem
                    item={item}
                    key={'station' + item.cityCode}
                    onClick={onClickArea}
                  />
                ))}
              {terminals &&
                terminals.map((item, index) => (
                  <EndItem
                    item={item}
                    key={index}
                    onClick={onClickArea}
                  />
                ))}
            </SelectListBlock>
          ) : null}
          <SelectListBlock>
            {stationEndDetails &&
              stationEndDetails.map(station => (
                <EndDetailItem
                  item={station}
                  onClick={onClickPlace}
                  key={station.stationId}
                />
              ))}
            {terminalEndDetails &&
              terminalEndDetails.map(terminal => (
                <EndDetailItem
                  item={terminal}
                  onClick={onClickPlace}
                  key={terminal.terminalId}
                />
              ))}
          </SelectListBlock>
        </div>
      </SelectListContainer>
      <div></div>
    </div>
  );
};
export default TrafficSelectComp;
