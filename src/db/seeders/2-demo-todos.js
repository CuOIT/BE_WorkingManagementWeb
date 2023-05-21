'use strict';
const {faker} = require('@faker-js/faker');

const createToDos = (num) => {
  const arr = [];
  let time1 = new Date();
  time1.setHours(0,0,0,0);
  let time2 = new Date();
  time2.setHours(23,59,0,0);
  let date=new Date();
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
    const start_time=time1;
    const end_time=time2;
    const level=faker.number.int()%4+1;
    const completed=false;
    const user_id=faker.number.int()%4+1;
    arr.push({
      name,
      start_time,
      end_time,
      level,
      completed,
      date,
      user_id
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ToDos', createToDos(100), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ToDos', null, {});
  }
} 
