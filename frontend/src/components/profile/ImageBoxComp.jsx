import React from "react";
import { styled } from "styled-components";

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ImageBox = styled.img`
  cursor: pointer;
  border-radius: 25px;
  border: 2px solid white;
  height: 200px;
  width: 200px;
`;

const ImgInput = styled.input`
  display: none;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 14px;
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 10px;
  margin-top: 20px;
  padding: 7px 15px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.buttonText};
  }
`;

const ImageBoxComp = ({ user, onUploadPhoto, onChangePhoto }) => {
  return (
    <form encType="multipart/form-data">
      <Label>
        {user?.img ? (
          <ImageBox src={`/assets/${user.img}`} alt="img" />
        ) : (
          <ImageBox src={"/assets/triplogo.png"} alt="img" />
        )}
        <ImgInput type="file" onChange={onUploadPhoto} name="img" />
        <Button onClick={onChangePhoto}>사진변경</Button>
      </Label>
    </form>
  );
};

export default React.memo(ImageBoxComp);
