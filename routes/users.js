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


    router.post('/update/:id', function(req, res){
      User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        city: req.body.city,
        country: req.body.country,
        company: req.body.company,
        email: req.body.email,
        job: req.body.job,
        phone: req.body.phone,
        skills: req.body.skills,
        university: req.body.university,
        username: req.body.username
      })
      .then((data) => {
        res.redirect(`/`)

      })
    })
module.exports = router;
