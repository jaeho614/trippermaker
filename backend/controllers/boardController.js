const { Sequelize } = require("sequelize");
const { board, like, reply, user } = require("../models/mysql");
const sanitizeHtml = require("sanitize-html");
const removeHtml = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 1000 ? filtered : `${filtered.slice(0, 1000)}...`;
};

const sanitizeOption = {
  allowedTags: [
    "address",
    "article",
    "aside",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hgroup",
    "main",
    "nav",
    "section",
    "blockquote",
    "dd",
    "div",
    "dl",
    "dt",
    "figcaption",
    "figure",
    "hr",
    "li",
    "main",
    "ol",
    "p",
    "pre",
    "ul",
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "code",
    "data",
    "dfn",
    "em",
    "i",
    "kbd",
    "mark",
    "q",
    "rb",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "samp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "var",
    "wbr",
    "caption",
    "col",
    "colgroup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
  },
  allowedSchemes: ["http", "https", "ftp", "mailto", "tel"],
};

exports.boardListPage = async (req, res, next) => {
  try {
    const boards = await board.findAll({
      order: [["no", "DESC"]],
      where: {
        done: 1,
        grade: 1,
      },
    });
    return res.json(boards);
  } catch (error) {
    return res.json(error);
  }
};

exports.boardDetailPage = async (req, res) => {
  try {
    const no = req.params.boardNo;
    const boards = await board.findOne({
      where: {
        no,
      },
    });
    if (req.cookies["f" + no] == undefined) {
      const addr =
        req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      res.cookie("f" + no, addr, {
        maxAge: 30000,
      });
      await board.update(
        {
          cnt: boards.cnt + 1,
        },
        {
          where: {
            no,
          },
        }
      );
    }

    const detailPage = await board.findOne({
      where: { no },
      include: [
        {
          model: like,
          as: "likes",
        },
      ],
    });

    return res.json(detailPage);
  } catch (error) {
    return res.json(error);
  }
};

exports.boardAdd = async (req, res) => {
  try {
    const { no, img, id, title, content, like, cnt } = req.body;

    const Addboard = await board.create({
      no,
      id,
      img,
      title,
      content,
      like,
      cnt,
    });

    return res.json(Addboard);
  } catch (error) {
    res.json(error);
  }
};

exports.boardModify = async (req, res) => {
  try {
    const { title, content, no } = req.body;

    const updateBoard = await board.update(
      {
        title,
        content: req.body.content,
        updateAt: Sequelize.Sequelize.literal("now()"),
      },
      {
        where: { no },
      }
    );
    return res.json({ board: updateBoard });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.boardRemove = async (req, res) => {
  try {
    const no = req.params.boardNo;
    await board.destroy({
      where: { no },
    });
    return res.send("삭제");
  } catch (error) {
    console.error(error);
  }
};

exports.boardLike = async (req, res) => {
  const { no, id } = req.body;

  try {
    const originLike = await like.findOne({ where: { bno: no, id } });
    const originBoard = await board.findOne({ no });
    const post = await board.findOne({ where: { no } });

    if (!originLike) {
      await like.create({ bno: no, id });
      await board.update({ like: originBoard.like + 1 }, { where: { no } });
    } else {
      await like.destroy({ where: { bno: no, id } });
      await board.update({ like: originBoard.like - 1 }, { where: { no } });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

exports.replyAdd = async (req, res) => {
  try {
    const no = req.params.bno;
    const { bno, uno, content } = req.body;
    const commentAdd = await reply.create(
      {
        bno,
        uno,
        content,
      },
      {
        where: {
          bno,
        },
      }
    );

    return res.json(commentAdd);
  } catch (error) {
    res.json(error);
  }
};

exports.replyRead = async (req, res) => {
  const bno = req.params.bno;
  try {
    const replys = await reply.findAll({
      where: { bno },
      include: [
        {
          model: user,
          as: "uno_user",
          required: false,
        },
      ],
    });

    return res.json(replys);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

exports.replyModify = async (req, res, next) => {
  try {
    const { content, no } = req.body;

    const updateReply = await reply.update(
      {
        content,
        updateAt: Sequelize.Sequelize.literal("now()"),
      },
      {
        where: { no },
      }
    );

    return res.json({ reply: updateReply });
  } catch (error) {
    return res.json(error);
  }
};

exports.replyRemove = async (req, res, next) => {
  const { bno, no } = req.body;

  try {
    await reply.destroy({
      where: { no },
    });

    const replys = await reply.findAll({
      where: { bno },
    });

    return res.json(replys);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

exports.isLike = async (req, res) => {
  const { bno } = req.params;
  const { id } = req.query;

  try {
    const findLike = await like.findOne({
      where: {
        id,
        bno,
      },
    });

    if (!findLike || findLike === null) {
      await like.create({
        bno,
        id,
      });

      return res.status(200).json({ myLike: true });
    }

    await like.destroy({ where: { bno, id } });

    return res.status(200).json({ myLike: false });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.getLike = async (req, res) => {
  const { bno, id } = req.params;
  let getLike;

  try {
    const Like = await like.findOne({
      where: {
        id,
        bno,
      },
    });

    if (Like) {
      getLike = true;
    } else {
      getLike = false;
    }
    return res.status(200).json({ myLike: getLike });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ myLikeError: true });
  }
};

exports.headerListNotices = async (req, res) => {
  try {
    const notices = await board.findAll({
      where: {
        done: 1,
        grade: 2,
      },
    });
    return res.json({ notices });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
