import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

const TagBoxBlock = styled.div`
  margin-top: 60px;
`;
const TagForm = styled.form`
  margin-top: 10px;

  input {
    border-radius: 20px;
    padding: 10px 20px;
    margin-right: 10px;
  }

  button {
    background-color: red;
    color: #fff;
    padding: 5px 10px;
  }
`;
const Tag = styled.div`
  margin: 0 auto;
`;
const TagListBlock = styled.div`
  display: flex;
  margin-top: 10px;
  width: 200px;
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>
));
// react.memo로 tag 값이 바뀔때만 리렌더링

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map(tag => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBoxComp = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState("");
  const [localTags, setLocalTags] = useState([]);

  const insertTag = useCallback(
    tag => {
      if (!tag) return; // 공백이면 추가 X
      if (localTags.includes(tag)) return; // 이미 존재하는 태그는 추가 X
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onRemove = useCallback(
    tag => {
      const nextTags = localTags.filter(t => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags]
  );

  const onChange = useCallback(e => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      insertTag(input.trim()); //공백제거
      setInput(""); // 초기화
    },
    [input, insertTag]
  );

  //tag값 바뀔시
  useEffect(() => {
    setLocalTags(localTags);
  }, [localTags]);

  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onSubmit}>
        <input placeholder="태그 입력" value={input} onChange={onChange} />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBoxComp;
