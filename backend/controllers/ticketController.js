const { Sequelize } = require("sequelize");
const { ticket, user, board } = require("../models/mysql");

exports.findVacancy = async (req, res) => {
  try {
    const { category, type, startPlace, endPlace, startDate, endDate } =
      req.query;
    const formatStartDate = dateFormatting(startDate.toString());
    const formatEndDate = dateFormatting(endDate.toString());
    const tickets = await ticket.findAll({
      where: {
        category,
        type,
        startplace: startPlace,
        startDate: formatStartDate,
        endplace: endPlace,
        endDate: formatEndDate,
      },
    });
    return res.json({ tickets });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

exports.createTicket = async (req, res) => {
  try {
    const {
      category,
      uno,
      type,
      price,
      startPlace,
      startDate,
      endPlace,
      endDate,
      seats,
    } = req.body;

    const formatStartDate = dateFormatting(startDate.toString());
    const formatEndDate = dateFormatting(endDate.toString());
    const jsonSeats = JSON.parse(seats);
    await Promise.all(
      jsonSeats.map(async seat => {
        const tickets = await ticket.create({
          category,
          price,
          type,
          uno,
          startDate: formatStartDate,
          startplace: startPlace,
          endDate: formatEndDate,
          endplace: endPlace,
          seat: seat.name,
          createAt: Sequelize.fn("NOW"),
        });
      })
    );
    return res.json({ message: "SUCESS" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}
const dateFormatting = (originDate) => {
  console.log('originDate : ', typeof originDate);

  const year = parseInt(originDate.slice(0, 4));
  const month = parseInt(originDate.slice(4, 6)) - 1;
  const day = parseInt(originDate.slice(6, 8));
  const hour = parseInt(originDate.slice(8, 10));
  const min = parseInt(originDate.slice(10, 12));
  const sec = parseInt(originDate.slice(12, 14));
  const wantDate = new Date(year, month, day, hour, min, sec);
  return wantDate;
}

