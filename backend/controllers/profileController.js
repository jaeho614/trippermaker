const { user, board, reply, like, wishlist } = require("../models/mysql");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./authController");
const axios = require("axios");
const { KNTO_TOUR_KEY } = process.env;

exports.getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const User = await user.findOne({
      where: {
        id,
      },
    });

    if (User) {
      return res.status(200).json({ user: User });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ userError: true });
  }
};

exports.changeProfile = async (req, res) => {
  const { id, nick } = req.body;

  try {
    await user.update(
      {
        nick,
      },
      {
        where: {
          id,
        },
      }
    );
    const exUser = await user.findOne({
      where: {
        id,
      },
    });

    //토큰 재발행하여 layoutcntr의 닉네임도 갱신해야한다.
    const token = generateToken(
      id,
      nick,
      exUser.gender,
      exUser.grade,
      exUser.style,
      exUser.no
    ); //jwt token 발행
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(200).json({ nick });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ nickError: true });
  }
};

exports.nickChk = async (req, res) => {
  const { nick } = req.body;

  try {
    const exUser = await user.findOne({
      where: {
        nick,
      },
    });

    if (!exUser) {
      return res.status(200).json({ nickAuth: true });
    }
    return res.status(400).json({ nickError: "이미 존재하는 닉네임입니다." });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ nickError: true });
  }
};

exports.withdraw = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const exUser = await user.findOne({
      where: {
        id,
      },
    });
    if (exUser) {
      exUser.destroy();
      res.clearCookie("access_token");
      return res.status(200).json({ withdrawAuth: true });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ withdrawError: true });
  }
};

exports.getBoardList = async (req, res) => {
  const { id } = req.params;

  try {
    const boardList = await board.findAll({
      where: {
        id,
      },
    });
    const totalBoard = boardList.length;

    if (boardList) {
      return res.status(200).json({ boardList, totalBoard });
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ boardListError: true });
  }
};

exports.deleteBoard = async (req, res) => {
  const { no } = req.params;

  try {
    const Board = await board.findOne({
      where: {
        no,
      },
    });

    if (Board) {
      await Board.destroy();
      return res.status(200).json({ deleteBoardError: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ deleteBoardError: true });
  }
};

exports.getReplyList = async (req, res) => {
  const { uno } = req.params;
  try {
    const replyList = await reply.findAll({
      where: {
        uno,
      },
      include: [
        {
          model: user,
          as: "uno_user",
        },
      ],
    });
    const totalReply = replyList.length;
    if (replyList) {
      return res.status(200).json({ replyList, totalReply });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ boardListError: true });
  }
};

exports.deleteReply = async (req, res) => {
  const { no } = req.params;

  try {
    const Reply = await reply.findOne({
      where: {
        no,
      },
    });

    if (Reply) {
      await Reply.destroy();
      return res.status(200).json({ deleteReplyError: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ deleteReplyError: true });
  }
};

exports.getLikeList = async (req, res) => {
  const { id } = req.params;

  try {
    const likeList = await like.findAll({
      where: {
        id,
      },
      include: {
        model: board,
        required: true,
        as: "bno_board",
      },
    });
    const totalLike = likeList.length;

    if (likeList) {
      return res.status(200).json({ likeList, totalLike });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ likeListError: true });
  }
};

exports.deleteLike = async (req, res) => {
  const { no } = req.params;

  try {
    const Like = await like.findOne({
      where: {
        no,
      },
    });

    if (Like) {
      await Like.destroy();
      return res.status(200).json({ deleteLikeError: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ deleteLikeError: true });
  }
};

exports.getWishList = async (req, res) => {
  const { id } = req.params;

  try {
    const WishList = await wishlist.findAll({
      where: {
        id,
      },
    });
    const totalWish = WishList.length;

    if (WishList) {
      return res.status(200).json({ wishList: WishList, totalWish });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ wishListError: true });
  }
};

exports.getWishDetail = async (req, res) => {
  const { title, contentId, contentTypeId } = req.params;

  try {
    if (!contentId || !contentTypeId) {
      return res.status(200).json({ wish: null });
    }

    const exWish = await axios.get(
      `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${KNTO_TOUR_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=${contentTypeId}`
    );
    const detail = exWish.data.response.body.items.item[0];

    return res.status(200).json({ wish: { title, data: detail } });
  } catch (e) {
    console.error(e);
    res.status(400).json({ wishError: true });
  }
};

exports.deleteWish = async (req, res) => {
  const { no } = req.params;

  try {
    const Wish = await wishlist.findOne({
      where: {
        no,
      },
    });

    if (Wish) {
      await Wish.destroy();
      return res.status(200).json({ deleteWishError: false });
    }
  } catch (e) {
    console.error(e);
    return res.status(400).json({ deleteWishError: true });
  }
};
