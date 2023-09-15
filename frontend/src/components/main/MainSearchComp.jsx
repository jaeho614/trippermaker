import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import KeywordComp from "../common/KeywordComp";
import styled from "styled-components";

const SearchForm = styled.div`
  text-align: center;
  background: ${props => props.theme.mainColor};
  margin: 0 auto;
  margin-top: -200px;
  padding: 30px 0;
  width: 100%;

  span {
    font-size: 30px;
    color: ${props => props.theme.text};
    margin-right: 20px;
  }

  .searchForm {
    display: inline-block;
    position: relative;
  }

  input {
    font-size: 16px;
    border-radius: 50px;
    padding: 20px 20px;
    width: 500px;
    @media (max-width: 600px) {
      margin-top: 20px;
    }
  }

  .search-icon {
    position: absolute;
    top: 16px;
    right: 4%;
    @media (max-width: 600px) {
      top: 80px;
      right: 8%;
    }
  }
`;

const MainSearchComp = ({ onSearchArea }) => {
  return (
    <SearchForm>
      <div className="searchForm">
        <span>검색</span>
        <input
          placeholder="장소,지역,테마 등을 입력하세요"
          onKeyUp={onSearchArea}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="2xl"
          className="search-icon"
        />
      </div>
      <div>
        <KeywordComp keyword="바다" onClick={onSearchArea} />
        <KeywordComp keyword="반려동물" onClick={onSearchArea} />
        <KeywordComp keyword="스파" onClick={onSearchArea} />
        <KeywordComp keyword="산림욕" onClick={onSearchArea} />
        <KeywordComp keyword="액티비티" onClick={onSearchArea} />
      </div>
    </SearchForm>
  );
};

export default MainSearchComp;
