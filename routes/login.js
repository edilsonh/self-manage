const express = require("express");
const router = express.Router();
const passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;

router.get('/login', function(req, res) {
    res.render("login", {
        messages: res.locals.getMessages()
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


module.exports = router;
