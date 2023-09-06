var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _busterminal = require("./busterminal");
var _bustype = require("./bustype");
var _like = require("./like");
var _reply = require("./reply");
var _theme = require("./theme");
var _ticket = require("./ticket");
var _trainstation = require("./trainstation");
var _traintype = require("./traintype");
var _user = require("./user");
var _wishlist = require("./wishlist");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var busterminal = _busterminal(sequelize, DataTypes);
  var bustype = _bustype(sequelize, DataTypes);
  var like = _like(sequelize, DataTypes);
  var reply = _reply(sequelize, DataTypes);
  var theme = _theme(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var trainstation = _trainstation(sequelize, DataTypes);
  var traintype = _traintype(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var wishlist = _wishlist(sequelize, DataTypes);

  like.belongsTo(board, { as: "bno_board", foreignKey: "bno"});
  board.hasMany(like, { as: "likes", foreignKey: "bno"});
  reply.belongsTo(board, { as: "bno_board", foreignKey: "bno"});
  board.hasMany(reply, { as: "replies", foreignKey: "bno"});
  board.belongsTo(user, { as: "id_user", foreignKey: "id"});
  user.hasMany(board, { as: "boards", foreignKey: "id"});
  like.belongsTo(user, { as: "id_user", foreignKey: "id"});
  user.hasMany(like, { as: "likes", foreignKey: "id"});
  reply.belongsTo(user, { as: "uno_user", foreignKey: "uno"});
  user.hasMany(reply, { as: "replies", foreignKey: "uno"});
  ticket.belongsTo(user, { as: "uno_user", foreignKey: "uno"});
  user.hasMany(ticket, { as: "tickets", foreignKey: "uno"});
  wishlist.belongsTo(user, { as: "id_user", foreignKey: "id"});
  user.hasMany(wishlist, { as: "wishlists", foreignKey: "id"});

  return {
    board,
    busterminal,
    bustype,
    like,
    reply,
    theme,
    ticket,
    trainstation,
    traintype,
    user,
    wishlist,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
