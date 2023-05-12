'use strict';
const {faker} = require('@faker-js/faker');

const createProjects = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    const name=faker.helpers.arrayElement([
        "HUST",
        "ATT",
        "Home",
        "School",
        "Future",
        "Next Week"
    ]);
    const start_date=faker.date.soon();
    const end_date=faker.date.soon();
    const description=faker.lorem.paragraph();
    const status=faker.helpers.arrayElement([
        'Start',
        'Cancelled',
        'Working',
        'Done'
    ]);

    arr.push({
      name,
      start_date,
      end_date,
      description,
      status
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Projects', createProjects(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
  }
} 
