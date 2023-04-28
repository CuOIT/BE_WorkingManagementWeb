var express = require('express');
var router = express.Router();
const { user } = require('../models');
const db=require("./../models/index")
console.log(user);
// GET /users
router.get('/', (req, res, next) => {
  db.User.findAll().then(users => res.json(users));
});

module.exports = router;
