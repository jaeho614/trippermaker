import { useRef, useEffect } from "react";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const EditorBlock = styled.div`
  margin-top: 30px;
`;
const TitleInput = styled.input`
  display: block;
  outline: none;
  font-size: 24px;
  border: none;
  border-bottom: 2px solid ${props => props.theme.border};
  margin: 0 auto;
  padding: 10px 20px;
  width: 80%;
`;
const QuillWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  height: 500px;
  min-height: 500px;

  .ql-editor.ql-blank::before {
    left: 0px;
    padding: 20px;
  }
`;

const EditorComp = ({ title, content, onChangeField }) => {
  const quillElement = useRef(null); //Quill적용할 divelement 설정
  const quillInstance = useRef(null); // Quill 인스턴스 설정
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "snow",
      placeholder: "내용 입력",
      modules: {
        toolbar: [
          [{ font: [] }],
          [{ align: [] }],
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "oredered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source === "user") {
        onChangeField({ key: "content", value: quill.root.innerHTML });
      }
    });
  }, [onChangeField]);

  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    quillInstance.current.root.innerHTML = content;
  }, [content]);

  const onChangeTitle = e => {
    onChangeField({ key: "title", value: e.target.value });
  };

  return (
    <EditorBlock>
      <TitleInput
        placeholder="제목입력"
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default EditorComp;
