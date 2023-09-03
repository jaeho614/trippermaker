import React from "react";

import { styled } from "styled-components";

import PageNavComp3 from "../common/PageNavComp3";
import WrapperComp from "../common/WrapperComp";

const TrafficContainer = styled.div`
  text-align: center;
  margin: 30px auto;
`;

const TrafficHeader = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
  width: 90%;
  span {
    display: inline-block;
    text-align: center;
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.text};
    width: 20%;
  }

  td,
  th {
    text-align: center;
    border: 1px solid ${props => props.theme.border};
    border-collapse: collapse;
    margin: 0 auto;
    padding: 15px;
    width: 20%;
  }

  th {
    background: ${props => props.theme.mainColor};
    color: ${props => props.theme.text};
  }
`;

const TrafficItem = ({ item, onTicketing }) => {
  const depPlandTime = (item.depplandtime || item.depPlandTime).toString();
  const arrPlandTime = (item.arrplandtime || item.arrPlandTime).toString();
  const startTime = `${depPlandTime.substr(8, 2)}시 ${depPlandTime.substr(
    10,
    2
  )}분`;
  const endTime = `${arrPlandTime.substr(8, 2)}시 ${arrPlandTime.substr(
    10,
    2
  )}분`;
  const jsonItem = JSON.stringify(item);
  return (
    <TrafficHeader>
      <tbody>
        <tr onClick={onTicketing} data-item={jsonItem}>
          <td>{item.depplacename || item.depPlaceNm}</td>
          <td>{startTime}</td>
          <td>{item.arrplacename || item.arrPlaceNm}</td>
          <td>{endTime}</td>
          <td>{item.traingradename || item.gradeNm}</td>
        </tr>
      </tbody>
    </TrafficHeader>
  );
};

const TrafficListComp = ({
  resultTrains,
  resultBuses,
  loading,
  onTicketing,
}) => {
  const result =
    resultTrains?.response.body.items?.item ||
    resultBuses?.response.body.items?.item;
  const result2 = resultTrains?.response.body || resultBuses?.response.body;

  if (!resultTrains && !resultBuses) {
    console.log("내용 없음");
    return <div></div>;
  }

  return (
    <WrapperComp>
      <TrafficContainer>
        {result && (
          <TrafficHeader>
            <thead>
              <tr>
                <th>출발장소</th>
                <th>시간</th>
                <th>도착장소</th>
                <th>시간</th>
                <th>종류</th>
              </tr>
            </thead>
          </TrafficHeader>
        )}
        {result &&
          result.map((item, index) => (
            <TrafficItem item={item} key={index} onTicketing={onTicketing} />
          ))}
        {result && (
          <PageNavComp3
            pageNo={result2?.pageNo}
            totalCount={result2?.totalCount}
            numOfRows={result2?.numOfRows}
          />
        )}
      </TrafficContainer>
    </WrapperComp>
  );
};

export default React.memo(TrafficListComp);
