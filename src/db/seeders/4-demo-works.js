'use strict';
const {faker} = require('@faker-js/faker');

const createWorks = (num) => {
  const arr = [];
  let time = new Date();
  for(let i = 0; i < num; i++) {
    const name=faker.helpers.arrayElement([
        "Drink Water",
        "Study EngLish",
        "Do housechore",
        "Walking",
        "Play Badminton",
        "Sleep",
        "Meet girlfriend",
        "Yoga",
        "Gym",
        "Cook",
        "Play game"
    ]);
    const due_date=faker.date.soon();
    const completed=false;
    const workspace_id=faker.number.int()%4+1;
    arr.push({
      name,
      due_date,
      completed,
      workspace_id
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Works', createWorks(100), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Works', null, {});
  }
} 
