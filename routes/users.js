const express = require('express');
const router = express.Router();
const User = require('../models/data');

router.post('/delete/:id', function (req, res) {
  console.log('/delete');
  User.findOneAndRemove({ _id: req.params.id })
  .then((data) => {
    console.log(data);
    res.redirect('/')
  })
})

router.get('/:id', function(req, res){
  User.findOne({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.render('profile', { user: data });
    })
    .catch((err) => {
      console.log(err);
    });
})

router.get("/edit/:id", function(req, res) {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      res.render("edit", { user: data });
    })
    .catch((err) => {
      console.log(err);
    })
})


module.exports = router;
