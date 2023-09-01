// import React from 'react';
// import styled, { keyframes } from 'styled-components';

// const spin = keyframes`
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const LoaderContainer = styled.div`
//   width: 600px;
//   height: 600px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   margin: auto;
//   /* position: absolute; */
//   z-index: 100;
//   /* background: #324D5B; */
// `;

// const Loader = styled.div`
//   animation: ${spin} 1s ease-in-out infinite alternate both;
//   height: 200px;
//   width: 100%; /* 컨테이너를 가득 채우기 위해 너비를 100%로 설정 */
//   position: relative;
// `;

// const Circle = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform-origin: bottom center;
// `;

// const CircleMiddle = styled(Circle)`
//   width: 3.6%; /* Loader 컴포넌트에 대해 백분율 사용하여 크기 조정 */
//   padding-top: 3.6%; /* 가로 세로 비율 유지 */
//   background-color: #7e3f3f;
//   border-radius: 50%;
//   transform: translate(-50%, -50%);
// `;

// const CircleSmall = styled(Circle)`
//   width: 2.7%; /* Loader 컴포넌트에 대해 백분율 사용하여 크기 조정 */
//   padding-top: 2.7%; /* 가로 세로 비율 유지 */
//   background-color: #26A6D1;
//   border-radius: 50%;
// `;

// const LoadingComp = () => {
//   const circleCount = 13;

//   return (
//     <LoaderContainer>
//       <Loader>
//         <CircleMiddle />
//         {[...Array(circleCount)].map((_, index) => (
//           <CircleSmall key={index} style={{ transform: `rotate(${(index * (360 / (circleCount - 1)))}deg)` }} />
//         ))}
//       </Loader>
//     </LoaderContainer>
//   );
// };

// export default LoadingComp;
import React from "react";

import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  height: 600px;
  width: 600px;
  z-index: 100;
`;

const Loader = styled.div`
  position: relative;
  animation: ${spin} 1s ease-in-out infinite alternate both;
  height: 200px;
  width: 100%; /* 컨테이너를 가득 채우기 위해 너비를 100%로 설정 */
`;

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: bottom center;
`;

const CircleMiddle = styled(Circle)`
  background-color: #7e3f3f;
  border-radius: 50%;
  padding-top: 3.6%;
  width: 3.6%;
  transform: translate(-50%, -50%); /* 아이콘을 수직, 수평 정중앙으로 이동 */
`;

const CircleSmall = styled(Circle)`
  background-color: #26a6d1;
  border-radius: 50%;
  padding-top: 2.7%;
  width: 2.7%;
  transform: translate(-50%, -50%); /* 아이콘을 수직, 수평 정중앙으로 이동 */
`;

const LoadingComp = () => {
  const circleCount = 13;

  return (
    <LoaderContainer>
      <Loader>
        <CircleMiddle />
        {[...Array(circleCount)].map((_, index) => (
          <CircleSmall
            key={index}
            style={{
              transform: `rotate(${index * (360 / (circleCount - 1))}deg)`,
            }}
          />
        ))}
      </Loader>
    </LoaderContainer>
  );
};

export default LoadingComp;
