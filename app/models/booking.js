"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Room);
    }
  }
  Booking.init(
    {
      total_person: DataTypes.INTEGER,
      booking_time: DataTypes.DATE,
      noted: DataTypes.TEXT,
      check_in_time: DataTypes.DATE,
      check_out_time: DataTypes.DATE,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Booking",
    }
  );
  return Booking;
};
