'use strict';
const {faker} = require('@faker-js/faker');

const createComments = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    const comment=faker.lorem.paragraph();
    const member_id=faker.number.int()%5+1;
    const task_id=faker.number.int()%5+1;

    arr.push({
        comment,
      member_id,
      task_id,

    });
  }
  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Comments', createComments(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Comments', null, {});
  }
} 
