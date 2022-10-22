
const passportLocalMongoose = require("passport-local-mongoose")
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     id: String,
    email: String,
    password: String,
})


userSchema.plugin(passportLocalMongoose);
 
const User = new mongoose.model("User", userSchema);


module.exports = {User};
