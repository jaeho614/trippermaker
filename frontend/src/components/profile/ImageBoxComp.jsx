import React from "react";
import { styled } from "styled-components";

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.img`
  cursor: pointer;
  height: 200px;
  width: 200px;
  border-radius: 25px;
  border: 1px solid black;
`;

const ImgInput = styled.input`
  display: none;
`;

const Button = styled.button`
  border: none;
  background: white;
  cursor: pointer;
  font-size: 14px;
  padding: 7px 15px;
  margin-top: 20px;
  background: ${props => props.theme.bgcolor};
  border: none;
  border-radius: 10px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.theme.subcolor};
    color: #fff;
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
