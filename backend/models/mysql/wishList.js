const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "wishList",
    {
      no: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING(35),
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      contentId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      routeId: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      contentTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "wishList",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "no" }],
        },
        {
          name: "wishList_ibfk_1",
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
