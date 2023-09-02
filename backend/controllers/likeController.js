const axios = require("axios");
const { like } = require("../models/mysql");

exports.isLike = async (req, res) => {
  const { bno } = req.params;
  const { id } = req.query;
  try {
    await like
      .findOne({
        where: {
          bno,
          id,
        },
      })
      .then(res => {
        let isLike;
        if (res.data) {
          isLike = true;
        } else {
          isLike = false;
        }
        return res.json(isLike);
      })
      .catch(err => {
        return res.json(err);
      });
  } catch (e) {
    return res.status(400).json(e);
  }
};
