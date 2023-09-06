const { Sequelize } = require("sequelize");
const { user, board } = require("../models/mysql");
const { Op } = require("sequelize");

exports.mainBoardList = async (req, res) => {
  try {
    const boards = await board.findAll({
      order: [["no", "DESC"]],
      where: { grade: 1, done: 1 },
    });
    return res.json(boards);
  } catch (error) {
    return res.json(error);
  }
};

exports.getMainStyle = async (req, res) => {
  try {
    const adminStyle = await user.findOne({
      raw: true,
      where: { id: { [Op.like]: "testAdmin@" + "%" }, grade: 2 },
    });
    const mainStyle = adminStyle.style;

    return res.status(200).json({ mainStyle });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ styleError: true });
  }
};

exports.getMainTerms = async (req, res) => {
  const { type } = req.params;

  try {
    const mainTerms = await board.findOne({ raw: true, where: { type } });

    return res.status(200).json({ mainTerms });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ mainTermsError: true });
  }
};

exports.getMainInform = async (req, res) => {
  try {
    const inform = await user.findOne({
      raw: true,
      where: { id: { [Op.like]: "testAdmin@" + "%" }, grade: 2 },
    });
    const mainInform = {
      name: inform.id.slice(
        inform?.id?.indexOf("@") + 1,
        inform?.id?.lastIndexOf(".")
      ),
      addr: inform.addr1 + " " + inform.addr2,
      phone: inform.phone,
      nick: inform.nick,
    };

    return res.status(200).json({ mainInform });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ mainInformError: true });
  }
};
