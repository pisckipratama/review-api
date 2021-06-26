"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@testing.com",
          password: "$2b$10$mmPI/wY1u.v4YffQJ/YPAeFMJf2RJFGas51vJwVyQ8pv741n9HLKy", // nopassword
          photo:
            "https://res.cloudinary.com/dtx75b7pa/image/upload/v1608084525/gjbqhpjujhvrmsmii0vu.png",
          createdAt: new Date(),
          updatedAt: new Date(),
          is_admin: true,
        },
        {
          email: "guest@testing.com",
          password: "$2b$10$mmPI/wY1u.v4YffQJ/YPAeFMJf2RJFGas51vJwVyQ8pv741n9HLKy", // nopassword
          photo:
            "https://res.cloudinary.com/dtx75b7pa/image/upload/v1608084525/gjbqhpjujhvrmsmii0vu.png",
          createdAt: new Date(),
          updatedAt: new Date(),
          is_admin: false,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
