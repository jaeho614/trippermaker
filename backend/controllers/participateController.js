const Joi = require("joi");
const Room = require("../models/mongoDB/room");
const Participate = require("../models/mongoDB/participate");

exports.createParticipates = async (req, res) => {
  try {
    const { title, owner, max, password } = req.body;
    const roomInfo = await Room.find({ title, owner });
    const roomId = roomInfo[0]._id.toString();
    const current = 1;
    const users = [roomInfo[0].owner];
    const validateRoom = {
      roomId: roomId,
      max,
      current: 1,
      users: [roomInfo[0].owner],
    };
    const participateSchema = Joi.object().keys({
      roomId: Joi.string().required(),
      max: Joi.number().required(),
      current: Joi.number().required(),
      users: Joi.array().required(),
    });
    const result = participateSchema.validate(validateRoom);
    if (result.error) return res.status(400).json(result.error);
    const newParticipate = await Participate.create({
      roomId,
      max,
      current,
      users,
    });
    const room = await Room.findById(newParticipate.roomId);

    return res.json(room);
  } catch (error) {
    return res.json(error);
  }
};
