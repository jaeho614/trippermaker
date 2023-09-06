const wishListArray = require("../models/mongoDB/wishListArray");

exports.addSchedule = async (req, res) => {
  const { id, contentId, title, contentTypeId } = req.body;

  try {
    const exScheduleList = await wishListArray
      .find({
        "items.id": id,
        "items.contentId": contentId,
      })
      .exec();

    if (exScheduleList.length !== 0) {
      return res.status(200).json({ addScheduleError: "DUPLICATE" });
    }

    await wishListArray.create(
      {
        items: { id, contentId, title, contentTypeId },
      },
      { where: { _id: id } }
    );

    return res.status(200).json({ addScheduleError: false });
  } catch (e) {
    console.error(e);
    res.status(400).json({ addScheduleError: true });
  }
};

exports.getScheduleList = async (req, res) => {
  const { id } = req.params;

  try {
    const scheduleList = await wishListArray
      .find({
        "items.id": id,
      })
      .exec();

    res.status(200).json({ scheduleList });
  } catch (e) {
    console.error(e);
    res.status(400).json({ scheduleListError: true });
  }
};

exports.saveList = async (req, res) => {
  const { id, subject, scheduleList } = req.body;

  try {
    await wishListArray.deleteMany({
      "items.id": id,
    });

    await wishListArray.create(
      {
        name: { subject, id, scheduleList },
      },
      { where: { _id: id } }
    );

    res.status(200).json({ saveScheduleListError: false });
  } catch (e) {
    console.error(e);
    res.status(400).json({ saveScheduleListError: true });
  }
};

exports.getSavedList = async (req, res) => {
  const { id } = req.params;

  try {
    const savedList = await wishListArray
      .find({
        "name.id": id,
      })
      .exec();

    res.status(200).json({ savedList });
  } catch (e) {
    console.error(e);
    res.status(400).json({ savedListError: true });
  }
};

exports.deleteSavedList = async (req, res) => {
  const { id, _id } = req.params;

  try {
    const exSavedList = await wishListArray.find({
      _id: _id,
      "name.id": id,
    });

    if (exSavedList) {
      await wishListArray.deleteOne({ "_id": _id, "name.id": id, });
      res.status(200).json({ savedListDeleteError: false });
    }
  } catch (e) {
    console.error(e);
    res.status(200).json({ savedListDeleteError: true });
  }
}

exports.getSavedListDetail = async (req, res) => {
  const { id, subject } = req.params;

  try {
    const savedListDetail = await wishListArray.findOne({
      "name.id": id,
      "name.subject": subject,
    });

    res.status(200).json({ savedListDetail });
  } catch (e) {
    console.error(e);
    res.status(400).json({ savedListDetailError: true });
  }
};

exports.getDuplicateCheck = async (req, res) => {
  const { id, subject } = req.params;

  try {
    const exSubject = await wishListArray.findOne({ "name.id": id, "name.subject": subject });

    if (exSubject) {
      return res.status(200).json({ duplicateCheck: false });
    }
    return res.status(200).json({ duplicateCheck: true });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ duplicateCheck: false });
  }
}