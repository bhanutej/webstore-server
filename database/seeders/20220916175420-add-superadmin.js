'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
    name: "Bhanutej",
    email: "bhanutej4u@gmail.com",
    password: await bcrypt.hash("developer", 10),
    role: "superadmin",
    createdAt: new Date(),
    updatedAt: new Date(),
   }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', {[Op.or]: [{email: 'bhanutej4u@gmail.com'}]});
  }
};
