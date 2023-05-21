'use strict';
const {faker} = require('@faker-js/faker');

const createWorkspaces = (num) => {
  const arr = [];
  let time1 = new Date();
  time1.setHours(0,0,0,0);
  let time2 = new Date();
  time2.setHours(23,59,0,0);
  for(let i = 0; i < num; i++) {
    const name=faker.helpers.arrayElement([
        "HUST",
        "Club",
        "Home",
        "School",
        "Future",
        "Next Week"
    ]);
    const user_id=faker.number.int()%4+1;
    arr.push({
      name,
      user_id
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Workspaces', createWorkspaces(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Workspaces', null, {});
  }
} 
