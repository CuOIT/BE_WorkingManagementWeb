'use strict';
const {faker} = require('@faker-js/faker');
/**
 * Creates an array of n Number of user objects to be inserted into
 * the database.
 * @param numUsers Integer The number of users to generate
 */

const createUsers = (numUsers = 50) => {
  const arr = [];
  for(let i = 0; i < numUsers; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const avt=faker.image.avatar();
    const email = `${first_name}.${last_name}@gmail.com`;
    const password="123"
    const user_name=faker.internet.userName();
    const birthday=faker.date.birthdate();
    const gender=faker.person.sexType();
    const phone=faker.phone.number();
    arr.push({
      first_name,
      last_name,
      avt,
      password,
      user_name,
      email,
      birthday,
      gender,
      phone
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', createUsers(), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
} 
