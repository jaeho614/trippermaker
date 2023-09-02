const { Sequelize, DATE } = require('sequelize');
const axios = require('axios');
const dotenv = require('dotenv');
const { busTerminal, trainStation } = require('../models/mysql');
dotenv.config();
const { TAGO_BUS_KEY, TAGO_TRAIN_KEY } = process.env;

exports.listStations = async (req, res) => {
  try {
    const stations = await trainStation.findAll({
      attributes: ['cityCode', 'cityName'],
      group: ['cityCode', 'cityName']
    });
    return res.json(stations);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.detailStations = async (req, res) => {
  const { cityCode } = req.params;
  try {
    const stations = await trainStation.findAll({
      where: {
        cityCode
      }
    });
    return res.json(stations);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.listTrains = async (req, res) => {
  const { startStation, endStation, date, pageNo } = req.query;
  try {
    const originData = await axios.get(`https://apis.data.go.kr/1613000/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=${TAGO_TRAIN_KEY}&pageNo=${pageNo}&numOfRows=10&_type=json&depPlaceId=${startStation}&arrPlaceId=${endStation}&depPlandTime=${date}`);
    const resultTrains = originData.data;
    return res.json(resultTrains);
  } catch (e) {
    console.log('error : ', e);
    return res.status(400).json(e);
  }
}

exports.listTerminals = async (req, res) => {
  try {
    const terminals = await busTerminal.findAll();
    return res.json(terminals);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.detailTerminals = async (req, res) => {
  const { cityCode } = req.params;
  try {
    const terminals = await busTerminal.findAll({
      where: {
        cityCode
      }
    });
    return res.json(terminals);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.listBuses = async (req, res) => {
  const { startTerminal, endTerminal, date, pageNo } = req.query;
  try {
    const originData = await axios.get(`https://apis.data.go.kr/1613000/SuburbsBusInfoService/getStrtpntAlocFndSuberbsBusInfo?serviceKey=${TAGO_BUS_KEY}&pageNo=${pageNo}&numOfRows=10&_type=json&depTerminalId=${startTerminal}&arrTerminalId=${endTerminal}&depPlandTime=${date}`);
    const resultBuses = originData.data;
    return res.json(resultBuses);
  } catch (e) {
    console.log('error : ', e);
    return res.status(400).json(e);
  }
}

