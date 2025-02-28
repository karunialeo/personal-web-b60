"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * seeder berguna untuk membuat data dummy/bohongan supaya tabel tidak kosong
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        name: "Rafli Kurniawan",
        email: "rafli@gmail.com",
        password: "asdf",
      },
      {
        name: "Asa Marsal",
        email: "asamarsal@gmail.com",
        password: "1234",
      },
      {
        name: "Rizal Khudori",
        email: "rizalk@gmail.com",
        password: "1111",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
