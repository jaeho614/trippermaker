const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
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
    img: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cnt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updateAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    done: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "여행후기"
    }
  }, {
    sequelize,
    tableName: 'board',
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
        name: "board_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
