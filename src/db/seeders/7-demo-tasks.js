'use strict';
const {faker} = require('@faker-js/faker');

const createTasks = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    const name=faker.helpers.arrayElement([
        "Making diagram",
        "BE",
        "FE",
        "Learn new tech",
        "Build model",
        "Run command"
    ]);
    const description=faker.lorem.paragraph();
    const due_date=faker.date.soon();
    const status=faker.helpers.arrayElement([
        'Start',
        'Cancelled',
        'Working',
        'Done'
    ]);
    const project_id=faker.number.int()%2+1;
    const assigned_to=faker.number.int()%4+1;
    arr.push({
      name,
      due_date,
      description,
      status,
      project_id,
      assigned_to
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', createTasks(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
} 
