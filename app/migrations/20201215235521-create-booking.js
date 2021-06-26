"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      total_person: {
        type: Sequelize.INTEGER,
      },
      booking_time: {
        type: Sequelize.DATE,
      },
      noted: {
        type: Sequelize.TEXT,
      },
      check_in_time: {
        type: Sequelize.DATE,
      },
      check_out_time: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      RoomId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Rooms",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
