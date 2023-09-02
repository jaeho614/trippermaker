const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainStation', {
    no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cityName: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    cityCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stationId: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "stationId"
    },
    stationName: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'trainStation',
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
        name: "stationId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "stationId" },
        ]
      },
    ]
  });
};
