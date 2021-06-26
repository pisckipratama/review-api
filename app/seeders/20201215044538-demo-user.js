"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@testing.com",
          password: "$2b$10$mmPI/wY1u.v4YffQJ/YPAeFMJf2RJFGas51vJwVyQ8pv741n9HLKy", // nopassword
          fullname: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'admin',
        },
        {
          email: "user@testing.com",
          password: "$2b$10$mmPI/wY1u.v4YffQJ/YPAeFMJf2RJFGas51vJwVyQ8pv741n9HLKy", // nopassword
          fullname: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user',
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
