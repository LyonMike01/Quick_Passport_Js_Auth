
const {User} = require ("../../model/User")
const {loginCheck} = require("../../services/login/login")
const passport = require("passport")

exports.seeLogin = async (req, res, next) => {
  try {
        const email = req.body.email;
        const password = req.body.password;
        const see = await loginCheck(email, password)

      if(see) {
        res.render("secrets")
      } else {
        res.render("login")
      }
} catch (err) {
    console.log(err.message);
  }
};


exports.regUser = async (req, res) => {
	const newUser = new User({ username: req.body.email });
    const sameUser = await User.findOne({username: req.body.username})
    if (sameUser) {
        console.log("Username already Exist")
            res.redirect("/register")
        } else {
      User.register(newUser, req.body.password, (err, user) => {
        if (err) {
          console.log(err.message)
          return res.redirect("/register");
        }

        // logs the user in
        passport.authenticate("local")(req, res, () => {
          res.render("secrets");
        });
      })};
};
  exports.secrets = async (req, res, next) => {
    try {
      
    }
    catch (err) {
      console.log(err.message)
}
  };


  exports.login = async (req, res, next) => {
    await res.render("login")
  };


  
  exports.register = async (req, res, next) => {
    await res.render("register")
  };
