
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const PORT= process.env.PORT;
const app = express();
const {connectToDB} = require("./src/server/dbConnect");
const passport = require("passport");
const session = require("express-session");
const store = new session.MemoryStore()
const ejs = require("ejs");
const {User} = require("./src/model/User")
const router = require("./src/C n R/router/routes")

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json())
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
  secret: "Things happening sha",
  resave: false,
  saveUninitialized: true,
  store
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
// passport.deserializeUser((id, done) =>{
//   User.findById(id, (err, user) => {
//     done(err, user)
//   });
// });

connectToDB();

app.use("/", router);


app.get("/", (req, res) => {
  res.send("HELLO Passport");
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


module.exports = app