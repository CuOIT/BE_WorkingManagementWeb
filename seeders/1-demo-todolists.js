'use strict';
const {faker} = require('@faker-js/faker');

const createToDoLists = (num) => {
  const arr = [];
  for(let i = 0; i < num; i++) {
    const date=new Date();
    const isDone=false;
    const user_id=1;
    arr.push({
      date,
      isDone,
      user_id
    });
  }

  return arr;
}

module.exports ={

   up:function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ToDoLists', createToDoLists(10), {});
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ToDoLists', null, {});
  }
} 
