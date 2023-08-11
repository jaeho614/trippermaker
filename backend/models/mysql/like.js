const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('like', {
    no: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.STRING(35),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    bno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'board',
        key: 'no'
      }
    }
  }, {
    sequelize,
    tableName: 'like',
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
        name: "like_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "like_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "bno" },
        ]
      },
    ]
  });
};
