const Room = require("../models/mongoDB/room");
const Chat = require("../models/mongoDB/chat");
const Participate = require("../models/mongoDB/participate");
const Temporary = require('../models/mongoDB/temporary');
const { user } = require("../models/mysql");
const Joi = require("joi");
const { appendFile } = require("fs");
const { connectToRoom } = require("../mqtt");

let mqttClient;

// 채팅방 리스트 출력
exports.renderMain = async (req, res, next) => {
  try {
    const roomList = await Room.find();
    return res.json(roomList);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

// 채팅방 생성
exports.createRoom = async (req, res) => {
  try {
    const roomSchema = Joi.object().keys({
      title: Joi.string().trim().allow("").required(),
      max: Joi.number().required(),
      owner: Joi.string().trim().allow("").required(),
      password: Joi.string().trim().allow(""),
    });
    const result = roomSchema.validate(req.body);
    const { title, max, owner, password } = req.body;
    if (result.error) return res.status(400).json(result.error);
    let newRoom;
    if (password === "") {
      newRoom = await Room.create({ title, max, owner });
    } else {
      newRoom = await Room.create({ title, max, owner, password });
    }
    return res.json(newRoom);
  } catch (error) {
    console.error(error);
    return res.json(error);
  }
};

// 특정 채팅방 출력
exports.enterRoom = async (req, res) => {
  const { roomId } = req.params;
  if (!mqttClient) {
    mqttClient = connectToRoom(roomId);
  }
  mqttClient.publish(`/room/${roomId}`, JSON.stringify(`user님 입장`));
  try {
    const room = await Room.findById({ _id: roomId });
    return res.json(room);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.removeRoom = async (req, res, next) => { };

exports.insertChat = async (req, res) => {
  try {
    const { room, user, content } = req.body;
    const chat = await Chat.create({ room, user, content });
    if (!mqttClient) {
      mqttClient = connectToRoom(room);
    }
    mqttClient.publish(`/room/${room}`, JSON.stringify(chat));
    return res.json(chat);
  } catch (error) {
    console.error("error : ", error);
    return res.status(400).json(error);
  }
};

exports.listChats = async (req, res) => {
  const { roomId } = req.params;
  try {
    const chats = await Chat.find({ room: roomId });
    if (!mqttClient) {
      mqttClient = connectToRoom(roomId);
    }
    return res.json(chats);
  } catch (e) {
    console.error(e);
    return res.status(400).json(e);
  }
};

exports.sendGif = async (req, res, next) => { };

exports.temporary = async (req, res) => {
  const { authNum } = req.body;
  try {
    const now = new Date();
    const testTemporary = await Temporary.create({
      authNum,
      expire: now // 데이터 들어간 시간 
    });
    return res.json(testTemporary);
  } catch (error) {
    return res.status(400).json(error);
  }
};
