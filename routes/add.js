const express = require('express');
const router = express.Router();
const User = require('../models/data');

router.get("/add", (req, res) => {
  res.render("add", {});
})

router.post('/adding', function(req, res){
console.log('HEEERRRRREEEE!!');
  console.log(req.body);
  new User(req.body).save().
  then(() => {
    res.redirect(`/`)

  })
  console.log();
})

module.exports = router;
