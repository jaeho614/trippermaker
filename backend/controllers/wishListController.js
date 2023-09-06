const { wishlist } = require("../models/mysql/index");

exports.addWishList = async (req, res) => {
  const { contentid, id, title, contenttypeid } = req.body;

  try {
    const exScheduleList = await wishlist.findOne({
      where: {
        id,
        contentId: contentid,
      },
    });

    if (exScheduleList) {
      return res.status(200).json({ wishList: "DUPLICATE" });
    }

    const newWishList = await wishlist.create({
      id,
      title,
      contentId: contentid,
      contentTypeId: parseInt(contenttypeid),
    });

    return res.status(200).json({ wishList: newWishList });
  } catch (e) {
    console.log("wishList Failure!");
    return res.status(400).json(e);
  }
};
