const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('busTerminal', {
    no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cityCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cityName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    terminalId: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: "terminalId"
    },
    terminalName: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'busTerminal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "no" },
        ]
      },
      {
        name: "terminalId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "terminalId" },
        ]
      },
    ]
  });
};
