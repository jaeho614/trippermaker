import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCalendarDays,
  faUser,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SideMenuBox = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background: #333;
  height: 400px;
  width: 100px;
  top: 200px;
  right: 0;
  z-index: 10000;

  .tri-box {
    position: absolute;
    cursor: pointer;
    background: #333;
    border: none;
    height: 70px;
    width: 40px;
    top: 50%;
    left: -40px;
    transform: translate(0, -50%);
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid ${props => props.theme.white};
    height: 25%;
    width: 100%;
  }

  div:last-child {
    border: none;
  }
  span {
    color: ${props => props.theme.white};
    padding: 5px 0;
  }
  p {
  }
`;

const SideMenuComp = () => {
  return (
    <>
      <SideMenuBox>
        <div class="tri-box">
          <FontAwesomeIcon icon={faCaretRight} size="xl" />
        </div>
        <div>
          <p>
            <FontAwesomeIcon
              icon={faHeart}
              size="2xl"
              style={{ color: "#ffffff" }}
            />
          </p>
          <span>찜목록</span>
        </div>
        <div>
          <p>
            <FontAwesomeIcon
              className="icon"
              icon={faEye}
              size="2xl"
              style={{ color: "#000000" }}
            />
          </p>
          <span>최근 본 글</span>{" "}
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faUser} size="2xl" />
          </p>
          <span>마이페이지</span>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} size="2xl" />
          </p>
          <span>일정관리</span>
        </div>
      </SideMenuBox>
    </>
  );
};

export default SideMenuComp;
