"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init(
    {
      room_name: DataTypes.STRING,
      room_capacity: DataTypes.STRING,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Room",
    }
  );
  return Room;
};
