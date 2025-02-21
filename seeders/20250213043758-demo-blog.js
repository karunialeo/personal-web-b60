"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Blogs", [
      {
        authorId: 1,
        title: "Postgres Is Cool!",
        image: "/img/coding.jpg",
        content:
          "Vestibulum rhoncus, quam et pretium iaculis, nibh neque convallis nisl, ac faucibus nunc est elementum quam. Sed sed turpis quam.",
      },
      {
        authorId: 1,
        title: "Javascript Is Awesome",
        image: "/img/my-img.jpg",
        content:
          "Curabitur vehicula laoreet hendrerit. Duis eget ultricies turpis, sit amet pretium lectus.",
      },
      {
        authorId: 2,
        title: "Bootstrap As CSS Tools",
        image: "/img/blog-img.jpg",
        content:
          "Quisque non ante at metus viverra pulvinar non quis eros. Praesent scelerisque nulla convallis dui placerat interdum. Nulla facilisi. Nunc sodales massa ut ligula lacinia, sit amet congue nisi fringilla.",
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
    return queryInterface.bulkDelete("Blogs", null, {});
  },
};
