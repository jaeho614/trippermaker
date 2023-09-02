import { styled } from "styled-components";

const Fullscreen = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  z-index: 3000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const ModalBlock = styled.div`
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  padding: 2%;
  height: 120px;
  width: 420px;
  h2 {
    margin-bottom: 20px;
  }
`;

const ModalComp = ({
  visible,
  title,
  description,
  confirmText = "삭제",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;
  return (
    <Fullscreen>
      <ModalBlock>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="buttons">
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </ModalBlock>
    </Fullscreen>
  );
};

export default ModalComp;
