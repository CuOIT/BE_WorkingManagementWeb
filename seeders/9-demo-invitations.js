'use strict';
const {faker} = require('@faker-js/faker');

const createInvitations = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {

    const inviter=faker.number.int()%5+1;
    const receiver=faker.number.int()%5+1;
    const project_id=faker.number.int()%5+1;
    const created_at=faker.date.soon();
    arr.push({
    inviter,
    receiver,
    project_id,
    created_at
    });
  }
  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Invitations', createInvitations(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Invitations', null, {});
  }
} 
