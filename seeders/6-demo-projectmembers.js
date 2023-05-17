'use strict';
const {faker} = require('@faker-js/faker');

const createProjectMembers = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    const member_id=faker.number.int()%5+1;
    const project_id=faker.number.int()%1+1;
    const role=faker.helpers.arrayElement([
        "Leader",
        "Member"
    ])
    arr.push({
      project_id,
      member_id,
      role
    });
  }
  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProjectMembers', createProjectMembers(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProjectMembers', null, {});
  }
} 
