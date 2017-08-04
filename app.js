const express = require("express")
const mustacheExpress = require("mustache-express")
const path = require("path")
const data = require("./models/data")
const app = express()
const indexRoute = require("./routes/index")
const userRoute = require("./routes/users")
const addRoute = require("./routes/add")
const loginRoute = require("./routes/login")
const bodyParser = require("body-parser")
const passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy;
const session = require("express-session")
const flash = require("express-flash-messages")

app.use(session ({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.authenticate(username, password, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: "There is no user with that username and password."
                })
            }
        })
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")
app.set("port", 3000)

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({extended: false}))

app.use(indexRoute)
app.use(loginRoute)
app.use(addRoute)
app.use(userRoute)

// Start a db connect and list after it's connected.
require("./dbConnection")

app.listen(app.get("port"), err => {
  if (err) {
    throw err
    exit(1)
  }
  console.log(
    `Node running in ${app.get("env")} mode @ http://localhost:${app.get("port")}`
  )
})
