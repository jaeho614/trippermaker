import React from "react";
import { styled } from "styled-components";

const SelectButtonBox = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const SelectButton = styled.button`
  cursor: pointer;
  border: 1px solid ${props => props.theme.border};
  font-size: 15px;
  margin: 5px 10px;
  padding: 10px 20px;
  transition: 0.3s;

  &:focus,
  &:hover,
  &:active {
    background: ${props => props.theme.button};
    color: ${props => props.theme.buttonText};
  }

  @media (max-width: 1200px) {
    width: 40%;
  }
`;

const SelectButtonBoxComp = ({
  totalBoard,
  totalReply,
  totalLike,
  totalWish,
  onGetBoardList,
  onGetReplyList,
  onGetLikeList,
  onGetWishList,
}) => {
  return (
    <SelectButtonBox>
      <SelectButton onClick={onGetBoardList}>
        게시물 ({totalBoard})
      </SelectButton>
      <SelectButton onClick={onGetReplyList}>댓글 ({totalReply})</SelectButton>
      <SelectButton onClick={onGetLikeList}>좋아요 ({totalLike})</SelectButton>
      <SelectButton onClick={onGetWishList}>
        wishList ({totalWish})
      </SelectButton>
    </SelectButtonBox>
  );
};

export default React.memo(SelectButtonBoxComp);
